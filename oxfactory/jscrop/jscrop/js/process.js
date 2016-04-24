(function () {
    var video = document.querySelector('video');

    var pictureWidth = 640;
    var pictureHeight = 360;

    var fxCanvas = null;
    var texture = null;

//    var el = document.getElementById('c');
//    var ctx = el.getContext('2d');
//    var isDrawing;
//
//    el.onmousedown = function(e) {
//      isDrawing = true;
//      ctx.moveTo(e.clientX, e.clientY);
//    };
//    el.onmousemove = function(e) {
//      if (isDrawing) {
//        ctx.lineTo(e.clientX, e.clientY);
//        ctx.stroke();
//      }
//    };
//    el.onmouseup = function() {
//      isDrawing = false;
//    };
	
    
    function checkRequirements() {
        var deferred = new $.Deferred();

        //Check if getUserMedia is available
        if (!Modernizr.getusermedia) {
            deferred.reject('Your browser doesn\'t support getUserMedia (according to Modernizr).');
        }

        //Check if WebGL is available
        if (Modernizr.webgl) {
            try {
                //setup glfx.js
                fxCanvas = fx.canvas();
            } catch (e) {
                deferred.reject('Sorry, glfx.js failed to initialize. WebGL issues?');
            }
        } else {
            deferred.reject('Your browser doesn\'t support WebGL (according to Modernizr).');
        }

        deferred.resolve();

        return deferred.promise();
    }

    function searchForRearCamera() {
        var deferred = new $.Deferred();

        //MediaStreamTrack.getSources seams to be supported only by Chrome
        if (MediaStreamTrack && MediaStreamTrack.getSources) {
            MediaStreamTrack.getSources(function (sources) {
                var rearCameraIds = sources.filter(function (source) {
                    return (source.kind === 'video' && source.facing === 'environment');
                }).map(function (source) {
                    return source.id;
                });

                if (rearCameraIds.length) {
                    deferred.resolve(rearCameraIds[0]);
                } else {
                    deferred.resolve(null);
                }
            });
        } else {
            deferred.resolve(null);
        }

        return deferred.promise();
    }

    function setupVideo(rearCameraId) {
    	
    	
    		
        var deferred = new $.Deferred();
        var getUserMedia = Modernizr.prefixed('getUserMedia', navigator);
        var videoSettings = {
            video: {
                optional: [
                    {
                        width: {min: pictureWidth}
                    },
                    {
                        height: {min: pictureHeight}
                    }
                ]
            }
        };

        //if rear camera is available - use it
        if (rearCameraId) {
            videoSettings.video.optional.push({
                sourceId: rearCameraId
            });
        }

        getUserMedia(videoSettings, function (stream) {
            //Setup the video stream
            video.src = window.URL.createObjectURL(stream);

            window.stream = stream;

            video.addEventListener("loadedmetadata", function (e) {
                //get video width and height as it might be different than we requested
                pictureWidth = this.videoWidth;
                pictureHeight = this.videoHeight;

                if (!pictureWidth && !pictureHeight) {
                    //firefox fails to deliver info about video size on time (issue #926753), we have to wait
                    var waitingForSize = setInterval(function () {
                        if (video.videoWidth && video.videoHeight) {
                            pictureWidth = video.videoWidth;
                            pictureHeight = video.videoHeight;

                            clearInterval(waitingForSize);
                            deferred.resolve();
                        }
                    }, 100);
                } else {
                    deferred.resolve();
                }
            }, false);
        }, function () {
            deferred.reject('There is no access to your camera, have you denied it?');
        });

        return deferred.promise();
    }

  
    function step1() {
        checkRequirements()
            .then(searchForRearCamera)
            .then(setupVideo)
            .done(function () {
                //Enable the 'take picture' button
                $('#takePicture').removeAttr('disabled');
                //Hide the 'enable the camera' info
                $('#step1 figure').removeClass('not-ready');
            })
            .fail(function (error) {
                showError(error);
            });
    }
    function getCookie(c_name)
    {
    	var i,x,y,ARRcookies=document.cookie.split(";");
    	for (i=0;i<ARRcookies.length;i++)
    	{
    	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    	  x=x.replace(/^\s+|\s+$/g,"");
    	  if (x==c_name)
    		{
    		return unescape(y);
    		}
    	  }
    }
    function step2() {
        var canvas = document.querySelector('#step2 canvas');
        var img = document.querySelector('#step2 img');

        //setup canvas
        canvas.width = pictureWidth;
        canvas.height = pictureHeight;

        var ctx = canvas.getContext('2d');

        //draw picture from video on canvas
        ctx.drawImage(video, 0, 0);

        var brightness = getCookie('brightness');
        var contrast = getCookie('contrast');
        if(brightness == null){
        	brightness = 0.2;
        }
        if(contrast == null){
        	contrast = 0.2;
        }
        
        
        $('#brightness').attr('value',brightness*100);
        $('#contrast').attr('value',contrast*100);
        
        //modify the picture using glfx.js filters
        texture = fxCanvas.texture(canvas);
        fxCanvas.draw(texture)
//            .hueSaturation(-1, -1)//grayscale
//            .unsharpMask(20, 2)
            .brightnessContrast(brightness, contrast)
            .update();

        window.texture = texture;
        window.fxCanvas = fxCanvas;

        $(img)
            //setup the crop utility
            .one('load', function () {
                if (!$(img).data().Jcrop) {
                    $(img).Jcrop({
                        onSelect: function () {
                            //Enable the 'done' button
                            $('#adjust').removeAttr('disabled');
                            $('button').removeAttr('disabled');                            
                        }
                    });
                   
                } else {
                    //update crop tool (it creates copies of <img> that we have to update manually)
                    $('.jcrop-holder img').attr('src', fxCanvas.toDataURL());
                }
            })
            //show output from glfx.js
            .attr('src', fxCanvas.toDataURL());
    }

    function step3() {
        var canvas = document.querySelector('#step3 canvas');
      
        var step2Image = document.querySelector('#step2 img');
        var cropData = $(step2Image).data().Jcrop.tellSelect();

        var scale = step2Image.width / $(step2Image).width();

        //draw cropped image on the canvas
        canvas.width = cropData.w * scale;
        canvas.height = cropData.h * scale;

       
//        	alert('false');
        	 var ctx = canvas.getContext('2d');
             ctx.drawImage(
                 step2Image,
                 cropData.x * scale,
                 cropData.y * scale,
                 cropData.w * scale,
                 cropData.h * scale,
                 0,
                 0,
                 cropData.w * scale,
                 cropData.h * scale);
        
        
//        alert("step3");
        //use ocrad.js to extract text from the canvas
//        var resultText = OCRAD(ctx);
//        resultText = resultText.trim();

        //show the result
//        $('blockquote p').html('&bdquo;' + resultText + '&ldquo;');
//        $('blockquote footer').text('(' + resultText.length + ' characters)')
    }

   
	
	
    /*********************************
     * UI Stuff
     *********************************/

    //start step1 immediately
    step1();
    $('.help').popover();

     
    
    function changeStep(step) {
        if (step === 1) {
            video.play();
        } else {
            video.pause();          
        }

        $('body').attr('class', 'step' + step);
        $('.nav li.active').removeClass('active');
        $('.nav li:eq(' + (step - 1) + ')').removeClass('disabled').addClass('active');
    }

    function showError(text) {
        $('.alert').show().find('span').text(text);
    }

    //handle brightness/contrast change
    $('#brightness, #contrast').on('change', function () {
        var brightness = $('#brightness').val() / 100;
        var contrast = $('#contrast').val() / 100;
        var img = document.querySelector('#step2 img');

        fxCanvas.draw(texture)
//            .hueSaturation(-1, -1)
//            .unsharpMask(20, 2)
            .brightnessContrast(brightness, contrast)            
            .update();

        img.src = fxCanvas.toDataURL();

        document.cookie = "brightness="+brightness;
        document.cookie = "contrast="+contrast;
//        alert(getCookie("brightness"));
        //update crop tool (it creates copies of <img> that we have to update manually)
        $('.jcrop-holder img').attr('src', fxCanvas.toDataURL());
    });

    $('#takePicture').click(function () {
        step2();
        changeStep(2);
       

    });

    $(".not-ready").find('video').click(function(){
    	step2();
        changeStep(2);
    });
    $('#adjust').click(function () {
        step3();
        changeStep(3);
    });

    $('#go-back').click(function () {
//    	alert('go-back clicked');
        changeStep(2);
        
    });
    $('#go-step1').click(function () {
//    	alert('go-back clicked');
        changeStep(1);
        
    });
    $('#start-over').click(function () {
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0, 
						"<br/><img style='width:90%;'src='"+ temp +"' /><br/><br/>"
						
				);
				
				document.activeElement.blur();
				$("input").blur();
//				alert("image uploaded");
				changeStep(1);
				window.parent.tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    
    function save(){
    	
    	changeStep(1);
    	
    	var ed = window.parent.tinyMCE.get('tiny_content');
		  
//		 var $iframe = $("#tx_canvas_wysiwyg").contents();	
		 var q_idx_null_cnt = 0;					 			
		 
		 $iframe = $("#tiny_content_ifr", window.parent.document).contents();
		 $iframe.find(".quiz").each(function(index, item){
			
			if($(this).attr('q_idx')==null){
//				alert(index + ' q_idx null');
				q_idx_null_cnt++;
			}else{
//				alert(index + ' q_idx not null');
			}
		});			
		$("#qForm_q_idx_null", window.parent.document).val(q_idx_null_cnt);
		var qformData = $("#qForm", window.parent.document).serialize();
//		alert(qformData);
		$.ajax({			
			type:"post",
			url:"https://www.oxfactory.net:41996/oxfactory/models/add_question.php",	
			cache : false,
			data : qformData,
			dataType:"xml",
			success:function(xml){
				var data_idx = 0;
				 $iframe.find(".quiz").each(function(index, item){
						
						if($(this).attr('q_idx')==null || $(this).attr('q_idx') == ""){
							var temp = $(xml).find('data').eq(data_idx).find('nextId').text();
							$(this).attr('q_idx',temp);
							data_idx++;
						}else{
//							alert(index + ' q_idx not null');
						}
					});								 
				 

				   $("#myForm_article_title", window.parent.document).val($("#mq_article_title", window.parent.document).val());
				   $("#myForm_content", window.parent.document).val(ed.getContent());
				   $("#myForm_note_idx", window.parent.document).val($("#mq_note_idx", window.parent.document).val());
				  
					var formData = $("#myForm", window.parent.document).serialize();
//					alert(formData);
					 $.ajax({			
							type:"post",
							url:"https://www.oxfactory.net:41996/oxfactory/models/register.php",	
							cache : false,
							data : formData,
							dataType:"xml",
							success:function(xml){	
								
								
//								alert('1111');
//								windinw.parent.trans_dir(dir,title,seq);
//								
//								alert('22222');
								
//								 document.activeElement.blur();
//								 $("input", window.parent.document).blur();
								 
//								 alert("저장 성공");
								 
							 },	// success end   			
					            error: function(e){
					                alert(e.responseText) ;
					         }			
						});	 
					 
					 
					 
			 },	// success end   			
	            error: function(e){
	                alert(e.responseText) ;
	         }			
		});	
    	
    	
    }
       
    $("#upload-image").on('click',function(){
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				  
				 toastr.success('Complete', 'Add Image', {timeOut: 1000}); 
				  
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0,					
						
				"<img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;' src='"+ temp +"' /><p><br></p>"
				
				);
				
//				window.parent.tinyMCE.execCommand('mceBlur',false, 'tiny_content');
//				window.parent.tinyMCE.activeEditor.blur();
//				alert("image uploaded");
//				parent.document.activeElement.blur();
				
//				window.opener.activeElement.blur();
				
//				save();
				changeStep(1);
//				changeStep(1);
//				parent.tinyMCE.activeEditor.windowManager.close(window);
				
			  }
			};
		ajax.send(canvasData );			
    });  
    $('#upload-question-o').click(function () {
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				  
				  toastr.success('Complete', 'Add Question', {timeOut: 1000}); 
				  
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0,
					
						
						"<table class='txc-table quiz template_qtype_ox' style='font-family: 바탕; font-size: 24px; opacity: 1; left: 0px; border:1px solid rgb(204, 204, 204); border-collapse:collapse;'>"+
				"<tbody>"+
				"<tr>"+
				"<td unselectable='on' style='width: 37px; height: 48px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); text-align: center;font-size: 24px;' colspan='1'><p>문제<br></p></td>"+
				"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);font-size: 24px;' colspan='2' rowspan='1'><img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;' src='"+ temp +"' /><p><br></p></td>"+
				"</tr>"+
				"<tr>"+
				"<td  style='width: 27px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255); text-align: center;font-size: 24px;' colspan='1' rowspan='1'><p>보기</p></td>"+
				"<td class='txc-table-option-number answer' style='color:red; width: 50%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align: center;font-size: 24px;'>O<br></p></td>"+
				"<td class='txc-table-option-number' style='width: 50%; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;font-size: 24px;'>X<br></p></td>"+
				"</tr>	"+
				"<tr>"+ 
				"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); font-size: 24px; text-align:center; background-color: rgb(255, 255, 255);' colspan='1' rowspan='1'><p>해설</p></td>"+ 
				"<td class='txc-table-description' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; font-size: 24px;' colspan='5'></td> "+
				"</tr>"+ 		
				"</tbody>"+
				"</table><p><br></p><p><br></p>"
				
				);
				
//				window.parent.tinyMCE.execCommand('mceBlur',false, 'tiny_content');
//				window.parent.tinyMCE.activeEditor.blur();
//				alert("image uploaded");
				document.activeElement.blur();
				
				$("input").blur();
				
//				save();
				changeStep(1);
//				changeStep(1);
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });  
    $('#upload-question-x').click(function () {
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0,
					
						
						"<table class='txc-table quiz template_qtype_ox' style='font-family: 바탕; font-size: 24px; opacity: 1; left: 0px; border:1px solid rgb(204, 204, 204); border-collapse:collapse;'>"+
				"<tbody>"+
				"<tr>"+
				"<td unselectable='on' style='width: 37px; height: 48px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); text-align: center;font-size: 24px;' colspan='1'><p>문제<br></p></td>"+
				"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);font-size: 24px;' colspan='2' rowspan='1'><img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;'src='"+ temp +"' /><p><br></p></td>"+
				"</tr>"+
				"<tr>"+
				"<td  style='width: 27px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255); text-align: center;font-size: 24px;' colspan='1' rowspan='1'><p>보기</p></td>"+
				"<td class='txc-table-option-number' style='width: 50%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align: center;font-size: 24px;'>O<br></p></td>"+
				"<td class='txc-table-option-number answer' style='color:red; width: 50%; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;font-size: 24px;'>X<br></p></td>"+
				"</tr>	"+
				"<tr>"+ 
				"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); font-size: 24px; text-align:center; background-color: rgb(255, 255, 255);' colspan='1' rowspan='1'><p>해설</p></td>"+ 
				"<td class='txc-table-description' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; font-size: 24px;' colspan='5'></td> "+
				"</tr>"+ 		
				"</tbody>"+
				"</table><p><br></p><p><br></p>"
				
				);
//				alert("image uploaded");
				document.activeElement.blur();
				$("input").blur();
				toastr.success('Complete', 'Add Question', {timeOut: 1000});
				
//				save();
				changeStep(1);
				
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    $('#upload-question-1').click(function () {
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0, 
						
						
						"<table class='txc-table quiz template_qtype_multi image' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:24px'> "+ 
				"<tbody> "+ 
				"<tr> "+ 
				"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td> "+ 
				"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='5' rowspan='1'><img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;'src='"+ temp +"' /><p><br></p></td>"+  
				"</tr> "+ 
				"<tr> "+ 
				"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1' rowspan='1'><p>보기</p></td> "+ 
				"<td class='txc-table-option-number answer' style='color:red; width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align: center;'>1<br></p></td> "+ 
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>2<br></p></td> "+ 
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>3<br></p></td> "+ 
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>4<br></p></td>"+  
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>5<br></p></td>"+  
				
				"</tr>"+  
				"<tr>"+  
				"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1' rowspan='1'><p>해설</p></td> "+ 
				"<td class='txc-table-description' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid;' colspan='5'></td> "+ 
				"</tr>"+ 
							
				"</tbody>"+ 
				"</table><p><br></p><p><br></p>"
				
				);
//				alert("image uploaded");
				document.activeElement.blur();
				$("input").blur();
				toastr.success('Complete', 'Add Question', {timeOut: 1000});
				
//				save();
				changeStep(1);
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    $('#upload-question-2').click(function () {
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0, 
						
						
						"<table class='txc-table quiz template_qtype_multi image' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:24px'> "+ 
				"<tbody> "+ 
				"<tr> "+ 
				"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1'><p>문제<br></p></td> "+ 
				"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='5' rowspan='1'><img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;'src='"+ temp +"' /><p><br></p></td>"+  
				"</tr> "+ 
				"<tr> "+ 
				"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>보기</p></td> "+ 
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>1<br></p></td> "+ 
				"<td class='txc-table-option-number answer' style='color:red; width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>2<br></p></td> "+ 
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>3<br></p></td> "+ 
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>4<br></p></td>"+  
				"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>5<br></p></td>"+  
				
				"</tr>"+  
				"<tr>"+  
				"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>해설</p></td> "+ 
				"<td class='txc-table-description' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid;' colspan='5'></td> "+ 
				"</tr>"+ 
							
				"</tbody>"+ 
				"</table><p><br></p><p><br></p>"
				
				);
//				alert("image uploaded");
				document.activeElement.blur();
				$("input").blur();
				toastr.success('Complete', 'Add Question', {timeOut: 1000});
				
//				save();
				changeStep(1);
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    $('#upload-question-3').click(function () {
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0, 
						
						
						"<table class='txc-table quiz template_qtype_multi image' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:24px'> "+ 
						"<tbody> "+ 
						"<tr> "+ 
						"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1'><p>문제<br></p></td> "+ 
						"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='5' rowspan='1'><img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;'src='"+ temp +"' /><p><br></p></td>"+  
						"</tr> "+ 
						"<tr> "+ 
						"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>보기</p></td> "+ 
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>1<br></p></td> "+ 
						"<td class='txc-table-option-number ' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>2<br></p></td> "+ 
						"<td class='txc-table-option-number answer' style='color:red; width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>3<br></p></td> "+ 
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>4<br></p></td>"+  
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>5<br></p></td>"+  
						
						"</tr>"+  
						"<tr>"+  
						"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>해설</p></td> "+ 
						"<td class='txc-table-description' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid;' colspan='5'></td> "+ 
						"</tr>"+ 
									
						"</tbody>"+ 
						"</table><p><br></p><p><br></p>"
				
				);
//				alert("image uploaded");
				document.activeElement.blur();
				$("input").blur();
				toastr.success('Complete', 'Add Question', {timeOut: 1000});
				
//				save();
				changeStep(1);
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    $('#upload-question-4').click(function () {
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0, 
						
						
						"<table class='txc-table quiz template_qtype_multi image' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:24px'> "+ 
						"<tbody> "+ 
						"<tr> "+ 
						"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1'><p>문제<br></p></td> "+ 
						"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='5' rowspan='1'><img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;'src='"+ temp +"' /><p><br></p></td>"+  
						"</tr> "+ 
						"<tr> "+ 
						"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>보기</p></td> "+ 
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>1<br></p></td> "+ 
						"<td class='txc-table-option-number ' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>2<br></p></td> "+ 
						"<td class='txc-table-option-number ' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>3<br></p></td> "+ 
						"<td class='txc-table-option-number answer' style='color:red; width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>4<br></p></td>"+  
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>5<br></p></td>"+  
						
						"</tr>"+  
						"<tr>"+  
						"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>해설</p></td> "+ 
						"<td class='txc-table-description' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid;' colspan='5'></td> "+ 
						"</tr>"+ 
									
						"</tbody>"+ 
						"</table><p><br></p><p><br></p>"
				
				);
//				alert("image uploaded");
				document.activeElement.blur();
				$("input").blur();
				toastr.success('Complete', 'Add Question', {timeOut: 1000});
				
//				save();
				changeStep(1);
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    $('#upload-question-5').click(function () {
    	$("#adjust").click();
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0, 
						
						
						"<table class='txc-table quiz template_qtype_multi image' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:24px'> "+ 
						"<tbody> "+ 
						"<tr> "+ 
						"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1'><p>문제<br></p></td> "+ 
						"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='5' rowspan='1'><img style='border-radius:5px; display:block; margin:0 auto; max-width: 100%;'src='"+ temp +"' /><p><br></p></td>"+  
						"</tr> "+ 
						"<tr> "+ 
						"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>보기</p></td> "+ 
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>1<br></p></td> "+ 
						"<td class='txc-table-option-number ' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>2<br></p></td> "+ 
						"<td class='txc-table-option-number ' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>3<br></p></td> "+ 
						"<td class='txc-table-option-number ' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>4<br></p></td>"+  
						"<td class='txc-table-option-number answer' style='color:red; width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align:center; font-size:24px;'>5<br></p></td>"+  
						
						"</tr>"+  
						"<tr>"+  
						"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);text-align:center; font-size:24px;' colspan='1' rowspan='1'><p>해설</p></td> "+ 
						"<td class='txc-table-description' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid;' colspan='5'></td> "+ 
						"</tr>"+ 
									
						"</tbody>"+ 
						"</table><p><br></p><p><br></p>"
				
				);
//				alert("image uploaded");
				document.activeElement.blur();
				$("input").blur();
				toastr.success('Complete', 'Add Question', {timeOut: 1000});
				
//				save();
				changeStep(1);
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    
  
    
    $('#upload-question-essay').click(function () {
//    	alert('start-over');
        // changeStep(1);
		// var testCanvas = document.querySelector('#step3 canvas');
		var testCanvas = document.getElementById("testCanvas");
		
		var canvasData = testCanvas.toDataURL("image/png");
//		alert(canvasData);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'https://www.oxfactory.net:41996/oxfactory/models/testsave.php',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.onreadystatechange = function() {
			  if (ajax.readyState == 4 && ajax.status == 200) {
				var response = ajax.responseXML;
				var x = response.getElementsByTagName("image_path")[0];
				var y = x.childNodes[0];
				var temp = y.nodeValue;
				temp = temp.substr(30);
//				alert(temp);
				
				window.parent.tinyMCE.execCommand( 'mceInsertContent', 0, 
						"<table class='txc-table quiz template_qtype_ox' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:24px'>" +
						"<tbody>" +
						"<tr>" +
						"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td>" +
						"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='5' rowspan='1'><img style='border-radius:5px; width:90%;'src='"+ temp +"' /><p><br></p></td>" +
						"</tr>" +
						"<tr>" +
						"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1' rowspan='4'><p>보기</p></td>" +
						"<td class='txc-table-option-number answer' style='color:red; width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align: center;'>1<br></p></td>" +
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>2<br></p></td>" +
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>3<br></p></td>" +
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>4<br></p></td>" +
						"<td class='txc-table-option-number' style='width: 20%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>5<br></p></td>" +
						
						"</tr>" +			
						"</tbody>" +
						"</table><p><br></p>"
				);
//				alert("image uploaded");
				document.activeElement.blur();
				$("input").blur();
				toastr.success('Complete', 'Add Question', {timeOut: 1000});
				changeStep(1);
//				tinyMCEPopup.close();
				
			  }
			};
		ajax.send(canvasData );			
    });
    
   
    $(".jcrop-tacker")
    $('.nav').on('click', 'a', function () {
        if (!$(this).parent().is('.disabled')) {
            var step = $(this).data('step');
            changeStep(step);
        }

        return false;
    });
})();