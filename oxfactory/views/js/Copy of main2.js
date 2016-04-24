/**
 * 
 */
//document.write("<script type='text/javascript' src='utils.js'><"+"/script>");

		var note_idx;	    
	    var path = "/";  // 임시경로
	    var sub_dir = 1; // 경로깊이
	     
	    
	    var dir = [];    // 노트별 전체경로	    
		var title = [];  // 노트제목
		var seq = [];    // 노트번호	

		var SelectRangeNode = "";	  
	    var SelectOX = true;
	    var question_num = "" ;
	    
	    var x = null;
		var y = null;
	    
		var mq_flag = false; 
		
	$(document).ready(function($){ 		
		
	
		 setTimeout(function(){
	            $('#body').fadeIn('slow', function () {
//	            	Editor.getCanvas().focus();
	            });
	        },0);
		 
		
		
		
		 
//		 CKEDITOR.replace( 'editor1' );
		 
//		$("#body").click(function(){
////			Editor.getCanvas().focus();
//		}); 
		 
		$("#cell").click(function(){
			alert('hello workd');
		});
		
//		$("#tx_canvas_wysiwyg").css({"width":"700px","height":"700px"});

		document.addEventListener('mousemove', onMouseUpdate, false);
		document.addEventListener('mouseenter', onMouseUpdate, false);

		function onMouseUpdate(e) {
		    x = e.pageX;
		    y = e.pageY;
		}

		function getMouseX() {
		    return x;
		}

		function getMouseY() {
		    return y;
		}
		
		js_oxfac_init();
		
		$(document).on("mousemove",function(e){
			
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var status = mouseX + " - " + mouseY;
//			$("#mouse_status").html(status);
		});
		
		

		(function(d, s, id) {
		   var js, fjs = d.getElementsByTagName(s)[0];
		   if (d.getElementById(id)) return;
		   js = d.createElement(s); js.id = id;
		   js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.5&appId=774378769375487";
		   fjs.parentNode.insertBefore(js, fjs);
		 }(document, 'script', 'facebook-jssdk'));
		
//			    alert(path);
	   // 시작과 동시에 노트 추가 
//		$.ajax({			
//			type:"post",
//			url:"/oxfactory/models/add.php?directory="+path.trim(),	
//			dataType:"xml",
//			success:function(xml){	
//				
//// 				note_idx = data.note_idx; // 새로 추가되는 글번호로 초기화시킨다.		
//					
//				 $(xml).find('response').each(function(){
//	                    var note_num = $(this).find("note_idx").text();
//	                    note_idx = note_num;
//	                    var username = $(this).find("username").text();	                    
//	                    $('#profile').html(username);
//	                });
//				 
//				 $("#tx_note_idx").val(note_idx);
//
//				 oxfac_getQuestions(note_idx);
//				 
//				 Editor.getCanvas().focus();
//				 
//			 },	// success end   			
//	            error: function(e){
//	                alert(e.responseText) ;
//	         }			
//		});
		var mq = window.matchMedia( "(min-width: 700px)" );
		
		 if (mq.matches) {
				// window width is at least 500px
//			 alert("pc");
			 $('#body').css({"position":"fixed"});
			 $('#hamberg').css({"display":"none"});
			 $('#logo').find('img').css({"width":"200px","height":"20px","margin-top":"15px"});
			 $('#header').css({"height":"70px"});
			 $('#tiny_content').css({"display":"none"});
			 $('#menu_controller').css({"width":"300px"});
			 
			 /* 사이드 아이콘 보이기 */			   
				$( document ).on( "mousemove", function( event ) {
					
					var mouseX = event.pageX;
					var mouseY = event.pageY;
					
					if(mouseX < 100 && mouseY > 100 && side_nav_flag==true){					
							$("#side_nav").animate({'left':'0px'},500);						
						    side_nav_flag = false;
					}else if(mouseX >=100 && side_nav_flag==false){					
							$("#side_nav").animate({'left':'-100px'},200);		
							side_nav_flag = true;
					}  		
		        });	
			 
			}
			else {
				// window width is less than 500px
				mq_flag = true;
//				alert("mobile");
				$('#header').css({"height":"40px"});
				$('#content_container').css({"display":"none"});
				$('#menu_controller').css({"left":"0px","width":"100%"});
//				$('#mobile_note').css({"display":"block"});
				$('#menu_controller').css({"display":"none"});
				$(".modal-content").css({"top":"70px"});
				
				$('#hamberg').on("click",function(){
					if(side_nav_flag==true){
						$("#mceu_18-body").hide();
						$('#menu_controller').css({"display":"block"});
						$("#side_search").css({'left':'-410px','display':'block'});
				    	$("#side_search").animate({'left':'0px','opacity':'1'},500);
						    side_nav_flag = false;
					}else{
						$("#mceu_18-body").hide();
						$("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
				    	$("#side_search").css('display','none');
				    	$('#menu_controller').css({"display":"none"});
						});	
							side_nav_flag = true;
					}
				});	
				
			}
		
		 if(mq_flag == true){
			 
			 tinymce.init({
				 selector:'textarea',			
				 theme: "modern",
				 skin: 'light',
				 menubar: false,
				 width: 'auto',
				 statusbar: false,
				 plugins: [
							"autolink lists link imagetools charmap print preview anchor",
							"searchreplace visualblocks code fullscreen",
							"insertdatetime media table paste jbimages",
							"autoresize save code"
				],
				toolbar: "newdocument | save | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | jbimages",
		
				template_cdate_classes: "cdate creationdate",
				template_mdate_classes: "mdate modifieddate",
				template_selected_content_classes: "selcontent",
//				template_cdate_format: "%m/%d/%Y : %H:%M:%S",
//				template_mdate_format: "%m/%d/%Y : %H:%M:%S",
//				templates: [
//				  {
//					  title : "4지선다",
//					  url : "/oxfactory/views/templates/4_selection.htm",
//					  description : "4지선다 테이블 템플릿"				  
//				  }  		            
//				],			
				toolbar_items_size : 'small',
				relative_urls: false,
				save_enablewhendirty: false,
				save_onsavecallback: function(ed) {
//					alert("save");
					
					  var ed = tinyMCE.get('tiny_content');
					  
//					  var my_form=document.createElement('FORM');					 
//						my_form.id='myForm';
//						my_form.method='POST';
////						my_form.action='http://www.oxfactory.net/oxfactory/models/register.php';
//						
//						var my_tb1=document.createElement('INPUT');
//						my_tb1.type='HIDDEN';
//						my_tb1.name='tx_article_title';
//						my_tb1.value=$("#mq_article_title").val();
//						my_form.appendChild(my_tb1);
//						
//						var my_tb2=document.createElement('INPUT');
//						my_tb2.type='HIDDEN';
//						my_tb2.name='content';
//						my_tb2.value=ed.getContent();
//						my_form.appendChild(my_tb2);
//						
//						
//						note_idx = $("#mq_note_idx").val();
////						alert(note_idx);
//						var my_tb3=document.createElement('INPUT');
//						my_tb3.type='HIDDEN';
//						my_tb3.name='note_idx';
//						my_tb3.value=note_idx;
//						my_form.appendChild(my_tb3);
//
////						var my_tb3=document.createElement('INPUT');
////						my_tb3.type='HIDDEN';
////						my_tb3.name='pf_img';
////						my_tb3.value=pf_img;
////						my_form.appendChild(my_tb3);
//						
//						document.body.appendChild(my_form);
//						my_form.submit();
					  
					   $("#myForm_article_title").val($("#mq_article_title").val());
					   $("#myForm_content").val(ed.getContent());
					   $("#myForm_note_idx").val($("#mq_note_idx").val());
					  
						var formData = $("#myForm").serialize();
//						alert(formData);
						 $.ajax({			
								type:"post",
								url:"/oxfactory/models/register.php",	
								cache : false,
								data : formData,
								dataType:"xml",
								success:function(xml){	
									
									trans_dir(dir,title,seq);
									
									alert("저장 성공");
																		    
									 
								 },	// success end   			
						            error: function(e){
						                alert(e.responseText) ;
						         }			
							});	 
					  
					
					},	
					
				setup : function(ed) {
					
					 ed.on('click',function(ed, e) {
//				        alert('click');
						 $("#mceu_18-body").show();
						 
				      });
					
					 ed.on('ExecCommand',function(e){
//				           alert(e.command, e.ui, e.value);  
						   if(e.command == 'mceNewDocument'){
							   
							   $.ajax({			
									type:"post",
									url:"/oxfactory/models/add.php?directory="+path.trim(),	
									dataType:"xml",
									success:function(xml){	
										
//										alert("add success");
										 $(xml).find('response').each(function(){
							                    var note_num = $(this).find("note_idx").text();
							                    note_idx = note_num;
							                    $("#mq_note_idx").val(note_idx);
							                    
							                });
										 trans_dir(dir,title,seq);
										 
										 tinyMCE.get('tiny_content').setContent("");
										 $("#mq_article_title").val("제목없음");
																			    
										 
									 },	// success end   			
							            error: function(e){
							                alert(e.responseText) ;
							         }			
								});	  	
							   
							   
						   }
				        })
					
				    ed.on("init", function() {
//				    	alert("hello");
				    	$("#mceu_18-body").hide();
//				    	$("#mceu_28").css({"position":"relative","top":"50px"});
//				    	var title_input = "";
//				    	title_input += "  <input id='tx_article_title' type='text' name='tx_article_title' value='' />";
//				    	$("#mcue_28").append("<input id='tx_article_title' type='text' name='tx_article_title' value='' />");
				    	if(isEmpty($("#mceu_18").find('input'))){
//				    		alert('init');
				    		$("#mceu_18").append("<input id='mq_article_title' type='text' name='tx_article_title' value='' />");
				    		$("#mceu_18").append("<input id='mq_note_idx' type='hidden' name='note_idx' value='' />");
					    	$("#mq_article_title").css({"position":"relative","z-index":"15","top":"5px","outline":"none",
					    								"border-top":"1px solid red","border":"none","color":"#12345","width":"100%","height":"40px"});
					    	
				    	}
				    	
//				    		 $("#mceu_21").off().on("touchstart tap" , function (e) {
//				    			 e.preventDefault();
//				    			 setTimeout(function(){
////				    			 
//				    		        $("#mceu_93").css({"width":"300px","height":"200px","background-color":"yellow"});
//					    			var iframe = $("#mceu_93").contents();
//					    			iframe.css({"width":"300px","height":"300px","background-color":"yellow"});
//					    			iframe.find("html").css({"width":"300px","height":"300px","background-color":"yellow"});
//					    			iframe.find("body").css({"width":"300px","height":"300px","background-color":"yellow"});
//					    			
//					    			$("#mceu_104").css({"width":"300px","height":"300px","background-color":"yellow"});
//					    			
//					    			$("#mceu_88").css({"width":"300px","height":"300px","background-color":"yellow"});
//					    			$("#mceu_88-body").css({"width":"300px","height":"300px"});
//					    			$("#mceu_94").css({"width":"300px","height":"300px","background-color":"yellow"});
//					    			
//				    			 }, 1000);
//				    		    });		
				    
				         ed.getBody().style.fontSize = '15px';
				         
				      // 시작과 동시에 지난 노트 불러오기
				         $.ajax({
				 			type:"post",
				 			url:"/oxfactory/models/lately_note.php" ,	
				 			dataType:"xml",
				 			success:function(xml){	
//				 					alert('note');
//				 				alert($(xml).find('response').find('data').find('content').text());
				 			
//				 					alert($(xml).find('response').find('data').find('content').text());
				 					 $('#content_container').css({"display":"none"});
				 					 $('#mobile_note').html( $(xml).find('response').find('data').find('content').text());
				 					 tinyMCE.get('tiny_content').setContent($(xml).find('response').find('data').find('content').text());										 
				 					 
				 					 $iframe = $("#tiny_content_ifr").contents();
				 					 $iframe.find('#tinymce').find(".txc-table").css({"width":"100%"});
				 								
				 					$("#mq_article_title").val($(xml).find('response').find('data').find('title').text());
				 					
				 					$("#mq_note_idx").val($(xml).find('response').find('data').find('note_idx').text());				 					
				 					
				 					note_idx = $(xml).find('response').find('data').find('note_idx').text();
				 			},	// success end   			
				             error: function(e){
				                 alert(e.responseText) ;
				             }						
				 		});
				    });
				}			
			 }); 
		 }
		// 시작과 동시에 지난 노트 불러오기
		 if(!mq_flag){
		 $.ajax({
				type:"post",
				url:"/oxfactory/models/lately_note.php" ,	
				dataType:"xml",
				success:function(xml){												
//							alert('성공');
						Editor.modify({content: $(xml).find('response').find('data').find('content').text(), attachments:[]});
						$("#tx_article_title").val($(xml).find('response').find('data').find('title').text());
//						alert($(xml).find('response').find('data').find('title').text());
						 oxfac_getQuestions(note_idx);
						 refreshQuizTable();
						 
						 var $iframe = $("#tx_canvas_wysiwyg").contents();
						 $iframe.find("body").css({"opacity":"0"});
						 $iframe.find("body").animate({"opacity":"1"},200);
						 $iframe.find("body").css({"height":"1000px"});
//						 Editor.getCanvas().focus();						
						
						 $("#tx_note_idx").val($(xml).find('response').find('data').find('note_idx').text());
						 
						 	
				},	// success end   			
	            error: function(e){
	                alert(e.responseText) ;
	            }						
			});
		 }
		
			

	
		
//		 tinymce.activeEditor.on('GetContent', function(e) {
//			    alert(e.content);
//			});
		 
		Editor.getCanvas().observeKey({ 
	        ctrlKey: true,
	        altKey: false,
	        shiftKey: false,
	        keyCode: 32
		}, function(ev){
			
//			alert(Editor.getEmbeddedData());
//			alert($tom);
			
			
			
			var innerHTML = template_qtype();
			
	    	$("#oxfac_option_menu").html(innerHTML);	    	
	    	$("#oxfac_option_menu").css({"left":"500px","top":"300px"}).stop().show();
			
//	    	$("#qtype").menu().focus();
	    		    	
	    	$("#qtype").menu({
	            select: function(event, ui) {
//	                alert(ui.item.text());
//	                Editor.getCanvas().pasteContent(ui.item.text());
	            	
	            	
	                if(ui.item.text() == '주관식'){
	                	$("#oxfac_option_menu").hide();
//	                	alert('객관식');
	                	var temp = template_qtype_short();
//	                	alert(temp);
	                	$("#oxfac_option_menu").html(temp);	    	
	        	    	$("#oxfac_option_menu").css({"left":"500px","top":"300px"}).stop().show();
	                	
	        	    	$("#qtype").menu({
	        	            select: function(event, ui) {
	        	            	
//	        	            	alert(ui.item.text());
	        	            	$("#oxfac_option_menu").hide();
//	        	            	Editor.getCanvas().focus();
	        	            	
	        	            	if(ui.item.text() == 'OX형'){
	        	            		
	        	            		var text = template_qtype_ox();

	        	            		Editor.getCanvas().pasteContent(text);
	        	            		
	        	            		var $iframe = $("#tx_canvas_wysiwyg").contents();
	        	            		
	        	            		    	            		
	        	            		$iframe.find(".quiz").each(function(index,item){
	        	            			
	        	            			$(this).attr("id",index).find("tr:first-child td:first-child").html("<span style='word-break: keep-all;'>문제 "+(index+1)+"</span>");
	        	            			
	        	            			$(this).find(".txc-table-option-number").on("click",function(){
	        	            				
//	        	            				alert("answer");
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").css({"background-color":"white"});	        	            				
	        	            				$(this).css({"background-color":"lightblue"});	
	        	            				
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").attr("class","txc-table-option-number");	        	            				
	        	            				$(this).attr("class","txc-table-option-number answer");	        	            				
	        	            				
	        	            				
	        	            			});   	        	            				
	        	            		});     
	        	            		
	        	            		
	        	            		
	        	            		var content = Editor.getCanvas().getContent();			
	        	            		if(content.indexOf("<") == 0){
//    	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
    	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
    	        					    
    	        					    $("#"+note_idx+" .gulTitle").html(title);
    	        						title[note_idx] = title;		
    	        					}						
    	        					
    	        					trans_dir(dir, title, seq);
    	        					
//	        	        		    $.ajax({
//	        	        				type:"post",
////	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
//	        	        				dataType:"xml",
//	        	        				success:function(xml){	
//	        	        					
//	        	        					
//	        	        					
//	        	        				 },	// success end   			
//	        	        		            error: function(e){
//	        	        		                alert(e.responseText) ;
//	        	        		            }
//	        	        			});	
	        	            		
	        	            		
	        	            		
	        	            	}else if(ui.item.text() == '단답형'){

	        	            		var text = template_qtype_write();

	        	            		Editor.getCanvas().pasteContent(text);
	        	            		
	        	            		var $iframe = $("#tx_canvas_wysiwyg").contents();
	        	            		
	        	            		    	            		
//	        	            		$iframe.find(".quiz").each(function(index,item){
//	        	            			
//	        	            			$(this).attr("id",index).find("tr:first-child td:first-child").html("<span style='word-break: keep-all;'>문제 "+(index+1)+"</span>");
//	        	            			
//	        	            			$(this).find(".txc-table-option-number").on("click",function(){
//	        	            				
////	        	            				alert("answer");
//	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").css({"background-color":"white"});	        	            				
//	        	            				$(this).css({"background-color":"lightblue"});	
//	        	            				
//	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").attr("class","txc-table-option-number");	        	            				
//	        	            				$(this).attr("class","txc-table-option-number answer");	        	            				
//	        	            				
//	        	            				
//	        	            			});   	        	            				
//	        	            		});     
	        	            		
	        	            		
	        	            		
	        	            		var content = Editor.getCanvas().getContent();			
	        						
//	        	        		    $.ajax({
//	        	        				type:"post",
////	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
//	        	        				dataType:"xml",
//	        	        				success:function(xml){	
//	        	        					
//	        	        					if(content.indexOf("<") == 0){
////	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
//	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
//	        	        					   
//	        	        					    $("#"+note_idx+" .gulTitle").html(title);
//	        	        						title[note_idx] = title;		
//	        	        					}						
//	        	        					
//	        	        					trans_dir(dir, title, seq);
//	        	        					
//	        	        				 },	// success end   			
//	        	        		            error: function(e){
//	        	        		                alert(e.responseText) ;
//	        	        		            }
//	        	        			});	
	        	            		
	        	            		
	        	            	}else if(ui.item.text() == '4지선다'){

	        	            		var text = template_qtype_multi_4();

	        	            		Editor.getCanvas().pasteContent(text);
	        	            		
	        	            		var $iframe = $("#tx_canvas_wysiwyg").contents();
	        	            		
	        	            		    	            		
	        	            		$iframe.find(".quiz").each(function(index,item){
	        	            			
	        	            			
//	        	            			$(this).animate({"opacity":"1","left":"0px"},400);
	        	            			
	        	            			$(this).attr("id",index).find("tr:first-child td:first-child").html("<span style='word-break: keep-all;'>문제 "+(index+1)+"</span>");
	        	            			
	        	            			$(this).find(".txc-table-option-number").on("click",function(){
	        	            				
//	        	            				alert("answer");
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").css({"background-color":"white"});	        	            				
	        	            				$(this).css({"background-color":"lightblue"});	
	        	            				
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").attr("class","txc-table-option-number");	        	            				
	        	            				$(this).attr("class","txc-table-option-number answer");	        	            				
	        	            				
	        	            				
	        	            			});   	  
	        	            			
	        	            			
	        	            		});     
	        	            		
	        	            		
	        	            		
	        	            		var content = Editor.getCanvas().getContent();			
	        						
//	        	        		    $.ajax({
//	        	        				type:"post",
////	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
//	        	        				dataType:"xml",
//	        	        				success:function(xml){	
//	        	        					
//	        	        					if(content.indexOf("<") == 0){
////	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
//	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
//	        	        					   
//	        	        					    $("#"+note_idx+" .gulTitle").html(title);
//	        	        						title[note_idx] = title;		
//	        	        					}						
//	        	        					
//	        	        					trans_dir(dir, title, seq);
//	        	        					
//	        	        				 },	// success end   			
//	        	        		            error: function(e){
//	        	        		                alert(e.responseText) ;
//	        	        		            }
//	        	        			});	
	        	            		
	        	            		
	        	            	}
	        	            	
	        	            	
	        	            }
	        	    	}).focus();
	                	
	                }else if(ui.item.text() == '객관식'){
	                	$("#oxfac_option_menu").hide();
//	                	alert('객관식');
	                	var temp = template_qtype_multi();
//	                	alert(temp);
	                	$("#oxfac_option_menu").html(temp);	    	
	        	    	$("#oxfac_option_menu").css({"left":"500px","top":"300px"}).stop().show();
	        	    	
	        	    	
	        	    	$("#qtype").menu({
	        	            select: function(event, ui) {
	        	            	
//	        	            	alert(ui.item.text());
	        	            	$("#oxfac_option_menu").hide();
//	        	            	Editor.getCanvas().focus();
	        	            	
	        	            	if(ui.item.text() == '2지선다'){
	        	            		
	        	            		var text = template_qtype_multi_2();

	        	            		Editor.getCanvas().pasteContent(text);
	        	            		
	        	            		var $iframe = $("#tx_canvas_wysiwyg").contents();
	        	            		
	        	            		    	            		
	        	            		$iframe.find(".quiz").each(function(index,item){
	        	            			
	        	            			$(this).attr("id",index).find("tr:first-child td:first-child").html("<span style='word-break: keep-all;'>문제 "+(index+1)+"</span>");
	        	            			
	        	            			$(this).find(".txc-table-option-number").on("click",function(){
	        	            				
//	        	            				alert("answer");
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").css({"background-color":"white"});	        	            				
	        	            				$(this).css({"background-color":"lightblue"});	
	        	            				
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").attr("class","txc-table-option-number");	        	            				
	        	            				$(this).attr("class","txc-table-option-number answer");	        	            				
	        	            				
	        	            				
	        	            			});   	        	            				
	        	            		});     
	        	            		
	        	            		
	        	            		
	        	            		var content = Editor.getCanvas().getContent();			
	        						
//	        	        		    $.ajax({
//	        	        				type:"post",
////	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
//	        	        				dataType:"xml",
//	        	        				success:function(xml){	
//	        	        					
//	        	        					if(content.indexOf("<") == 0){
////	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
//	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
//	        	        					    
//	        	        					    $("#"+note_idx+" .gulTitle").html(title);
//	        	        						title[note_idx] = title;		
//	        	        					}						
//	        	        					
//	        	        					trans_dir(dir, title, seq);
//	        	        					
//	        	        				 },	// success end   			
//	        	        		            error: function(e){
//	        	        		                alert(e.responseText) ;
//	        	        		            }
//	        	        			});	
	        	            		
	        	            		
	        	            		Editor.getCanvas().past
	        	            		
	        	            	}else if(ui.item.text() == '3지선다'){

	        	            		var text = template_qtype_multi_3();

	        	            		Editor.getCanvas().pasteContent(text);
	        	            		
	        	            		var $iframe = $("#tx_canvas_wysiwyg").contents();
	        	            		
	        	            		    	            		
	        	            		$iframe.find(".quiz").each(function(index,item){
	        	            			
	        	            			$(this).attr("id",index).find("tr:first-child td:first-child").html("<span style='word-break: keep-all;'>문제 "+(index+1)+"</span>");
	        	            			
	        	            			$(this).find(".txc-table-option-number").on("click",function(){
	        	            				
//	        	            				alert("answer");
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").css({"background-color":"white"});	        	            				
	        	            				$(this).css({"background-color":"lightblue"});	
	        	            				
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").attr("class","txc-table-option-number");	        	            				
	        	            				$(this).attr("class","txc-table-option-number answer");	        	            				
	        	            				
	        	            				
	        	            			});   	        	            				
	        	            		});     
	        	            		
	        	            		
	        	            		
	        	            		var content = Editor.getCanvas().getContent();			
	        						
//	        	        		    $.ajax({
//	        	        				type:"post",
////	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
//	        	        				dataType:"xml",
//	        	        				success:function(xml){	
//	        	        					
//	        	        					if(content.indexOf("<") == 0){
////	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
//	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
//	        	        					   
//	        	        					    $("#"+note_idx+" .gulTitle").html(title);
//	        	        						title[note_idx] = title;		
//	        	        					}						
//	        	        					
//	        	        					trans_dir(dir, title, seq);
//	        	        					
//	        	        				 },	// success end   			
//	        	        		            error: function(e){
//	        	        		                alert(e.responseText) ;
//	        	        		            }
//	        	        			});	
	        	            		
	        	            		
	        	            	}else if(ui.item.text() == '4지선다'){

	        	            		var text = template_qtype_multi_4();	        	            		
	        	            		
	        	            		Editor.getCanvas().pasteContent(text);
	        	            		
	        	            		var $iframe = $("#tx_canvas_wysiwyg").contents();
	        	            		
	        	            		var last_idx = 0; 	            		
	        	            		$iframe.find(".quiz").each(function(index,item){	        	            			
	        	            			
	        	            			last_idx++;
	        	            			$(this).attr("id",index).find("tr:first-child td:first-child").html("<span style='word-break: keep-all;'>문제 "+(index+1)+"</span>");
	        	            			
	        	            			$(this).find(".txc-table-option-number").on("click",function(){
	        	            				
//	        	            				alert("answer");
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").css({"background-color":"white"});	        	            				
	        	            				$(this).css({"background-color":"lightblue"});	
	        	            				
	        	            				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").attr("class","txc-table-option-number");	        	            				
	        	            				$(this).attr("class","txc-table-option-number answer");	        	            				
	        	            				
	        	            				
	        	            			});   	        	            				
	        	            		});     
	        	            		
	        	            		$iframe.find(".quiz").eq(last_idx - 1).css({"opacity":"0","position":"relative","left":"-100px"});
	        	            		$iframe.find(".quiz").eq(last_idx - 1).animate({"opacity":"1","left":"0px"},200);
	        	            	
	        	            		
	        	            		var content = Editor.getCanvas().getContent();			
	        						
//	        	        		    $.ajax({
//	        	        				type:"post",
////	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
//	        	        				dataType:"xml",
//	        	        				success:function(xml){	
//	        	        					
//	        	        					if(content.indexOf("<") == 0){
////	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
//	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
//	        	        					   
//	        	        					    $("#"+note_idx+" .gulTitle").html(title);
//	        	        						title[note_idx] = title;		
//	        	        					}						
//	        	        					
//	        	        					trans_dir(dir, title, seq);
//	        	        					
//	        	        				 },	// success end   			
//	        	        		            error: function(e){
//	        	        		                alert(e.responseText) ;
//	        	        		            }
//	        	        			});	
	        	            		
	        	            		
	        	            	}
	        	            	
	        	            	
	        	            }
	        	    	}).focus();
	        	    	
	                }
	                
	               
//	            	Editor.getCanvas().focus();
	            	
	            	
	            }
	        }).focus();
	    	
//	    	$("#oxfac_option_menu").focus();

	    	
//			Editor.getCanvas().pasteContent();
			
//			var timeout = setTimeout(call,50);
//			
//			function call(){
//				var content = Editor.getContent();					
//				var content_split = content.split("▼"); 
//				/* alert(content_split[0]); */
//				var content_split2 = content_split[0].split(" ");
//				alert(content_split2[content_split2.length-1]);
//				Editor.getCanvas().setContent(Editor.getCanvas().getContent().replaceAll(content_split2[content_split2.length-1]+"▼",content_split2[content_split2.length-1])) ;
//								
			
//		    	
//		    	
//		    	
////				Editor.getCanvase().pasteContent("");
//				clearTimeout(timeout);
		
				
		throw $propagate;
		});
	    
		

		Editor.getCanvas().observeKey({ 
	        ctrlKey: true,
	        altKey: false,
	        shiftKey: false,
	        keyCode: 13
		}, function(ev){
			
//			alert("enter");
			
			
				
		throw $propagate;
		});

//		$(document).on("mousemove",function(e){
//			
//			var mouseX = e.pageX;
//			var mouseY = e.pageY;
//			var status = mouseX + " - " + mouseY;
//			$("#mouse_status_iframe").html(status);
//			
//		});

	    
	   Editor.getCanvas().observeJob(Trex.Ev.__CANVAS_PANEL_CLICK, function(ev) {
//		SelectRangeNode = Editor.getCanvas().getProcessor().createGoogRange().getHtmlFragment();
//	   
//		//<br>이 없으면 무조건 오케이 또는 <br>이 있고 길이가 4이상이고 <br>의 위치값이 4인경우
//	    if(   oxfac_flag && 
//	    	 (SelectRangeNode.indexOf("<br>") != 4 && 
//	    	(SelectRangeNode.indexOf("<br>") != -1 && SelectRangeNode.trim().length > 4) ||
//	       ((SelectRangeNode.indexOf("<br>") == -1) && SelectRangeNode.trim().length >0 ))	       	
//	    ){
//	    		    		    		    	
//	    	getMouseXY(ev);
//	    	var innerHTML = oxfac_question(SelectRangeNode.trim());
//	    	$("#oxfac_option_menu").html(innerHTML);	    	
//	    	$("#oxfac_option_menu").css({"left":ev.clientX+320,"top":ev.clientY+220}).stop().show();
//	    		   
//	    	
//	    	
//	    	
//	    	if(oxfac_qtype == 'b1'){
//	    		
//	    	if(SelectOX == true ){
//	    		
//	    	SelectOX = false;	    	
//	    	$.ajax({
//	    		type:"post",
//				url:"/oxfactory/models/oxq.php?note_idx="+note_idx+
//								"&question_content="+escape(encodeURIComponent(SelectRangeNode.trim()))+
//								"&qtype="+oxfac_qtype+
//								"&optCnt="+get_optionCnt(),	
//				dataType:"xml",
//				success:function(xml){	
//					
//					question_num = $(xml).find("question_num").text();	
//					
//					oxfac_setQuestionNum(question_num);
//					
//					var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
//					
//					if(isEmpty(rownum)) {
//						rownum = 1;
//					}else{
//						rownum = parseInt(rownum) + 1;
//					}					
//					var oxfacHTML = "";
//					oxfacHTML += "<tr id='"+ question_num +"'>";
//					oxfacHTML += "	<td class='oxfac-tab-rownum'>"+ rownum +"</td>";
//					oxfacHTML += "	<td class='oxfac-tab-content'>"+ SelectRangeNode.trim() +"</td>";
//					oxfacHTML += "	<td class='oxfac-tab-answer'></td>";
//					oxfacHTML += "	<td class='oxfac-tab-del'><i class='fa fa-times-circle-o fa-2x'></i></td>";
//					oxfacHTML += "</tr>";
//					
//					$("#oxfac-status-tab").append(oxfacHTML);
//					
//				 },	// success end   			
//		            error: function(e){
//		                alert(e.responseText) ;
//		         }	
//	    	});
//	    	
//	    	}else if(SelectOX == false){
//	    		
//		    SelectOX = true;
////		    alert(question_num);
//		    $.ajax({
//	    		type:"post",
//				url:"/oxfactory/models/oxa.php?question_num="+question_num+"&answer="+escape(encodeURIComponent(SelectRangeNode.trim())),	
//				dataType:"xml",
//				success:function(){				
//					
//					var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
//					
//					if(isEmpty(rownum)) {
//						rownum = 1;
//					}else{
//						rownum = parseInt(rownum);
//					}
//					$("#"+question_num).children(".oxfac-tab-answer").html(SelectRangeNode.trim());
//					$("#"+note_idx+" .exam").html("문제"+rownum);
//					
//				 },	// success end   			
//		            error: function(e){
//		                alert(e.responseText) ;
//		         }	
//	    	});
//		    
//	    	}	   
//	    	
//	    	}else
//	    	
//	    	if(oxfac_qtype == 'c1'){
//	    		
////	    		if(get_optionCnt() == )
//	    		
//	    		
//	    		
//	    		$.ajax({
//		    		type:"post",
//					url:"/oxfactory/models/oxq.php?note_idx="+note_idx+
//									"&question_content="+escape(encodeURIComponent(SelectRangeNode.trim()))+
//									"&qtype="+oxfac_qtype+
//									"&optCnt="+get_optionCnt(),	
//					dataType:"xml",
//					success:function(xml){	
//						
//						question_num = $(xml).find("question_num").text();	
//						
//						oxfac_setQuestionNum(question_num);
//						
//						var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
//						
//						if(isEmpty(rownum)) {
//							rownum = 1;
//						}else{
//							rownum = parseInt(rownum) + 1;
//						}					
//						var oxfacHTML = "";
//						oxfacHTML += "<tr id='"+ question_num +"'>";
//						oxfacHTML += "	<td class='oxfac-tab-rownum'>"+ rownum +"</td>";
//						oxfacHTML += "	<td class='oxfac-tab-content'>"+ SelectRangeNode.trim() +"</td>";
//						oxfacHTML += "	<td class='oxfac-tab-answer'></td>";
//						oxfacHTML += "	<td class='oxfac-tab-del'><i class='fa fa-times-circle-o fa-2x'></i></td>";
//						oxfacHTML += "</tr>";
//						
//						$("#oxfac-status-tab").append(oxfacHTML);
//						
//					 },	// success end   			
//			            error: function(e){
//			                alert(e.responseText) ;
//			         }	
//		    	});
//	    		
//	    		if(get_status() == "question"){
//	    			addQuestion();
//	    		}else if(get_status() == "option"){
//	    			addOption();
//	    		}else if(get_status() == "reset"){
//	    			
//	    		}
//	    		
//	    		
//	    		
//	    		
//	    		
//	    		
//	    		
//	    	}
//	    	
//	    	
//	    	
//	    } 

		   $("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
	    		$("#side_search").css('display','none');
	    	});		
		   
	   }); 
	    
	   
	   var side_nav_flag = true;
	   var toolbar_nav_flag = true;
	   
	   
		
	   
	    // 키 입력시 자동 업데이트
		Editor.getCanvas().observeJob(Trex.Ev.__CANVAS_PANEL_KEYUP, function(ev) {
//			var content = this.getContent();			
//				
//			if(content.indexOf("<") == 0){
////					alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
//			    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
////			    alert(title.length);
//			    $("#"+note_idx+" .gulTitle").html(title);
//				title[note_idx] = title;		
//			}	
//			
//		    $.ajax({
//				type:"post",
//// 				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
//				dataType:"xml",
//				success:function(xml){	
//					
//										
//					
//				 },	// success end   			
//		            error: function(e){
//		                alert(e.responseText) ;
//		            }
//			});			
		});
		
			/* $("#side_nav").animate({'left':'-100px'},200);	 */   		
			
	    /* 하나의 이미지에서 이동하며 애니메이션 효과를 주기 
	       opacity를 낮게 주며 시작해야 이미지 통째로 움직이는 티가 안남
	    */
	    $(".nav_icon img").on('mouseover',function(){
	    	
	    	$(this).css(
	    		{'top':'-50px','opacity':'0.2'}
	    	);
	    	$(this).animate(
	    	{'opacity':'1'}		
	    	,100)	    	
	    });
	    
	    /* 하나의 이미지에서 이동하며 애니메이션 효과를 주기 
 	       opacity 값을 낮게 시작해야 이미지 통째로 움직이는 티가 안남
 		*/
	    $(".nav_icon img").on('mouseout',function(){	    	
	    	$(this).css({'top':'0px',});	    	    	
	    });	    

		$("#side_nav img").eq(0).on('click',function(){	 
	    	
	    	add_note();
	    	
	    	
		  });
		  
	    $("#side_nav img").eq(1).on('click',function(){	 
	    		    	
	    	if($("#side_search").css('display') == 'none'){
	    	$("#side_search").css({'left':'-410px','display':'block'});
	    	$("#side_search").animate({'left':'0px','opacity':'1'},500);
	    	}else {	    	
		    	$("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
		    		$("#side_search").css('display','none');
		    	});		    	
	    	}
	    	
		  });	   
		  
	    $("#side_nav img").eq(2).on('click',function(){	 
	    	
//	    	 var url = "/oxfactory/views/oxfactory.php";										 
//			 window.location.href = url;
	    	 alert('준비중입니다!');
	    	
		  });	
	    
	    
	    
	    function getNote_idx(){
			 return note_idx;
		 }
		 
	    trans_dir(dir,title,seq);
		
	    // 폴더 이동
	    function trans_dir(dir,title,seq){    	
			
	    	var dir = [];    // 노트별 전체경로	    
			var title = [];  // 노트제목
			var seq = [];    // 노트번호	
			var reg_date = []; 
			var exam = [];
			var quiz_count = [];
			
			var title_ = "";

			// 디렉토리, 제목, 글번호 리프레쉬		
			$.ajax({
						type:"post",
						url:"/oxfactory/models/list.php" ,
						dataType:"xml",
						success:function(xml){	
//							alert($(xml).find('response').find('data').find("quiz_cnt").text());
							
							 $(xml).find('response').find('data').each(function(){
				                   				                    
				                    dir.push($(this).find("directory").text()); 
							   		title.push($(this).find("title").text());
							   		seq.push($(this).find("note_idx").text());	
									reg_date.push($(this).find("reg_date").text());
//									exam.push($(this).find("exam").text());
									quiz_count.push($(this).find("quiz_cnt").text());
//									alert($(this).find("quiz_cnt").text());
						            });
				                
							 
// 						    for (var int = 0; int < data.length; int++) {
// 						    	 dir.push(data[int].directory); 
// 						   		 title.push(data[int].title);
// 						   		 seq.push(data[int].note_idx);				   		 
// 						    }
							
							
							var reDate = new reform_date();							


							(function(d, s, id) {
								  var js, fjs = d.getElementsByTagName(s)[0];
								  if (d.getElementById(id)) return;
								  js = d.createElement(s); js.id = id;
								  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.5&appId=774378769375487";
								  fjs.parentNode.insertBefore(js, fjs);
								}(document, 'script', 'facebook-jssdk'));
							
						    var dup = [];
							var innerHTML = "";											
							innerHTML += " <ul style='overflow-x:hidden;'>";//alert("첫번째 클릭");
							for (var int = 0; int < dir.length; int++) {	  
							    /* path == dir[int]   is meant arrival of note's path */
								if(path == dir[int]){												  
									 innerHTML += " <li class='note' style='border-bottom:1px solid lightblue; background-color:tranparent; ' id='"+ seq[int] +"' >";							
									 innerHTML += "  <div class='create_time' style='float:right; font-size:10pt'>" + reDate.reformed_date(reg_date[int]) +"</div>";
									 innerHTML += "  <div class='gulTitle' ><span class='title_span'>"+ title[int] + "</span></div>";									 
									 innerHTML += "  <ul class='note_icons' style='top:-10px;'>";																				 									 
									 if(quiz_count[int]>0){									 
									 innerHTML += " <a href='#' class='exam glyphicon glyphicon-edit ' style='opacity:0.8;'>"+ quiz_count[int] +" </a> ";
									 innerHTML += " <a class='kakao-link-btn'  style='display:none; width:30px;height:30px;' href='#'>카카오톡 링크</a>"; //									 
									 innerHTML += "  <img id='kakao"+ seq[int] +"' style='width:20px; height:20px;' src='http://dn.api1.kage.kakao.co.kr/14/dn/btqa9B90G1b/GESkkYjKCwJdYOkLvIBKZ0/o.jpg' />";
									 
									 }
									
//									 innerHTML += "    <a href='#' class='share glyphicon glyphicon-user' style='opacity:0.8;'></a> ";	
									 innerHTML += "    <a href='#' class='del glyphicon glyphicon-remove-sign' style='opacity:0.8;'></a> ";
									 innerHTML += "  </ul>";						
									 innerHTML += "  </li>";						 
								/* (path.split('/').length < dir[int].split('/').length)   is meant of dir[int] has sub-directory */	 
								}else if(path == dir[int].substr(0,path.length) && (path.split('/').length < dir[int].split('/').length) ){		
									//alert("폴더 디렉토리 공장");						
									var dupple = 0;					
									for (var int2 = 0; int2 < dup.length; int2++) {
										if(dup[int2] == dir[int].split('/')[sub_dir]){									
										    // 중복있으면
										    dupple ++;
										}
									}
									if(dupple == 0){
									  dup.push(dir[int].split('/')[sub_dir]);					
									 /* dir[int].split('/')[sub_dir]   is meant of first sub-directory from current-path */
									 innerHTML += "   <li class='folder' style='background-color:lightblue; opacity:1;'>";
									 innerHTML += "   <div class='create_time'></div>";
//									 alert(dir[int].split('/')[sub_dir]);
									 innerHTML += "   <div class='folderName'>"+ dir[int].split('/')[sub_dir] +"</div>";							
									 innerHTML += "  </li>";
									}
									 
								}
							};
							innerHTML += "</ul>";					
							/* alert(innerHTML); */
							document.getElementById("dir_content").innerHTML = innerHTML;																		
							
//							$(".glyphicon").on("mouseover",function(){
//								$(this).animate({"font-size":"50px"},200);
//							});
							
//							$("#dir_content").on("swipeleft",function(){								
//								$("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
//						    		$("#side_search").css('display','none');
//						    	});		
//							});
							
					    	 /* 목록리스트 마우스오버 효과 */
							$(".folder").on('mouseover',function(){					
							$(this).css({'background-color':'#aaaabb','opacity':'0.7','position':'relative','z-index':'500'});
							});
							$(".folder").on('mouseout',function(){
						    $(this).css({'background-color':'#ccccdd'});
							});
							
							
							var myElement = document.getElementById('side_search');

							// create a simple instance
							// by default, it only adds horizontal recognizers
							var mc = new Hammer(myElement);
							mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
							// listen to events...
							mc.on("swipe", function(ev) {
								ev.preventDefault();
//							    myElement.textContent = ev.type +" gesture detected.";
//								alert(ev.direction);
								if(ev.direction == '2'){
									if(side_nav_flag == false){
										$("#mceu_18-body").hide();
										$("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
								    	$("#side_search").css('display','none');
								    	$('#menu_controller').css({"display":"none"});
										});	
											side_nav_flag = true;								
									}
								}
							});
							
							$(".note").on('mouseenter',function(e){	
								e.stopPropagation();
								$(this).css({'background-color':'lightgreen','opacity':'0.3','position':'relative','z-index':'500'});
								$(this).animate({'opacity':'0.8'},200);
//								
//								$(this).css({	  "background-color":"lightgray",
//												  "top":"-5px",
//												  "z-index":"1000",
//												  "-webkit-box-shadow": "0 5px 10px #777",
//												  "-moz-box-shadow": "0 5px 10px #777",
//												  "box-shadow": "0 5px 10px #777",
//												
//												  });		
								
								$(this).find('ul').animate({"display":"block",'opacity':'1','background-color':'transparent'},100);
								$(this).find('ul').show();
								});
							$(".note").on('mouseleave',function(){
							    $(this).css({'background-color':'white'});
								
//								$(this).css({	  "background-color":"white",
//												  "top":"0px",
//												  "z-index":"200",
//								 	  "-webkit-box-shadow": "0 0px 0px #777",
//									  "-moz-box-shadow": "0 0px 0px #777",
//									  "box-shadow": "0 0px 0px #777",
//									  "-webkit-transform": "0.3s rotate(0deg)",
//									  "-moz-transform": "rotate(0deg)",
//									  "-o-transform": "rotate(0deg)",
//									  "-ms-transform": "rotate(0deg)",
//									  "transform": "rotate(0deg)"},500);
								
//							    $(this).find('ul').animate({"display":"none"},100);
//							    $(this).find('ul').hide();
							});
								
							// click list event
							$(".folder").one('click', function(){
//								$("#side_search").css({"left":"300px","opacity":"0"});
//								$("#side_search").animate({"left":"0px","opacity":"1"},500);
								//alert($("a",this).html());
								sub_dir ++;								
								path += $(".folderName",this).html() +"/";
							    trans_dir(dir,title,seq);													
							});
							$("#dir_title").off('click').one('click', function(){								
														    
							    if(path != "/"){
								var path_split = path.split('/');
								path = "/";						
								for (var int3 = 1; int3 < path_split.length-2; int3++) {							
								path += path_split[int3] + "/";							
								}
//								alert(path);
								sub_dir --;
								trans_dir(dir,title,seq);
								}										
							});							


							refreshQuizTable();
							
							$('.kakao-link-btn').on('click',function(){
								var kakao_container = $(this).parent().find('img').attr('id');
								var kakao_idx = $(this).parent().parent().attr('id');
								
//								alert(note_idx);
								$(this).on('click',function(){

							
									Kakao.Link.createTalkLinkButton({
									      container: '#'+kakao_container ,
									      label: '카카오링크 샘플에 오신 것을 환영합니다.',
									      image: {
									        src: 'http://dn.api1.kage.kakao.co.kr/14/dn/btqaWmFftyx/tBbQPH764Maw2R6IBhXd6K/o.jpg',
									        width: '300',
									        height: '200'
									      },
									      webButton: {
									        text: '카카오 디벨로퍼스',
									        url: 'http://www.oxfactory.net/oxfactory/views/test_view.php?note_idx='+ kakao_idx// 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
									      }
									    });

//									$(this).click();
									$('#'+kakao_container).click();
								});
								

								
							    // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
							   
								
							});
							
							$(".fb_btn").on("click",function(){
								var note_idx = $(this).parent().parent().attr('id');
								var title = $(this).parent().parent().find(".gulTitle").html();
								$(this).on('click',function(){

//									FB.ui({
//										  method: 'send',
//										  display: 'iframe',
//										  link: 'http://www.oxfactory.net/oxfactory/views/test_view.php?note_idx='+note_idx+'&exam_title='+title,
//										});
									shareurl = "https://www.facebook.com/dialog/share?app_id=774378769375487&display=popup&href='http://www.oxfactory.net/oxfactory/views/test_views.php?note_idx="+ note_idx +"&exam_title="+ title +"'&redirect_uri='http://www.oxfactory.net/oxfactory/views/main.php'";
									window.open(shareurl);
								});
									
								
							});


							// 노트 글 가져오기
							$(".note").on('click',function(){
								
								//alert($(this).attr("id"));
								// $(this).attr('id')는 글번호이다. 전역변수 note_idx에 저장하고
								// 수정이 이루어질때 바로 업데이트 되도록한다
								
								note_idx = $(this).attr('id');
								$("#tx_note_idx").val(note_idx);
//								alert($("#tx_note_idx").val());
								
								// 글을 불러온다
								 $.ajax({
									type:"post",
									url:"/oxfactory/models/note.php?note_idx="+note_idx ,	
									dataType:"xml",
									success:function(xml){	
// 										alert('note');
										
										if(mq_flag){											 
											 $('#mobile_note').html( $(xml).find('response').find('data').find('content').text());
											 tinyMCE.get('tiny_content').setContent($(xml).find('response').find('data').find('content').text());
																							 
											 $iframe = $("#tiny_content_ifr").contents();
											 $iframe.find('#tinymce').find(".txc-table").css({"width":"100%"});
											 $iframe.find('#tinymce').find("img").css({"width":"100%","height":"100%"});
											 
											 $("#mq_article_title").val($(xml).find('response').find('data').find('title').text());
							 				 
											 $("#mq_note_idx").val(note_idx);
											 
//											 alert($("#tx_note_idx").val());
//											 alert('성공');
//											 alert(note_idx);
										}else{												
//	 										alert('성공');
											Editor.modify({content: $(xml).find('response').find('data').find('content').text(), attachments:[]});
											$("#tx_article_title").val($(xml).find('response').find('data').find('title').text());
//											alert($(xml).find('response').find('data').find('title').text());
											if($(xml).find('response').find('data').find('content').text() == "" 
												|| $(xml).find('response').find('data').find('content').text() == null){
												Editor.getCanvas().setContent("");
											}
											
											
											oxfac_getQuestions(note_idx);
											 refreshQuizTable();
											 
											 var $iframe = $("#tx_canvas_wysiwyg").contents();
											 $iframe.find("body").css({"opacity":"0"});
											 $iframe.find("body").animate({"opacity":"1"},200);
											 $iframe.find("body").css({"height":"1000px"});
//											 Editor.getCanvas().focus();	
											
											
										}
										
										
											
									},	// success end   			
						            error: function(e){
						                alert(e.responseText) ;
						            }
									
								});								 
								 
								
						    });
													
							// 노트 삭제
							
								$('.del').on('click',function(e){
									e.stopPropagation();
									 if($(e.target).is('.note'))
										 return false;
									 else{	
										 
										 if (confirm('정말로 삭제하시겠습니까?')) {
										 
										 var del_idx = $(this).parents('.note').attr('id');
										 
										 $.ajax({
												type : "post",
												url  : "/oxfactory/models/del.php?note_idx="+del_idx,
												dataType : "xml",
												success : function(xml){
													
//													alert("삭제 성공");
													if(del_idx == note_idx){
//														 alert("del_idx == note_idx");
//														 add_note();
														 trans_dir(dir,title,seq);
													 }else{
//														 alert("del_idx != note_idx");
														 trans_dir(dir,title,seq);										 
													 }	
												},
												error : function(e){
													alert(e.responseText);
												}											
											});										 							 
										
										 						 
										 
										 }
									 }		
										
									});
							
							
								  	
							
						    // 문제 풀기
							 $('.exam').on('click',function(e){
									e.stopPropagation();
									 if($(e.target).is('.note'))
										 return false;
									 else{	
//										 alert('exam clicked');
										 var exam_idx = $(this).parents('.note').attr('id');
										 var exam_title = $('#'+exam_idx+' .gulTitle').html();
//										 alert(exam_title);											
										 $("#modal_title").html(exam_title);										 
																			
										$("#tx_note_idx").val(exam_idx);
//											alert($("#tx_note_idx").val());
											
											// 글을 불러온다
											 $.ajax({
												type:"post",
												url:"/oxfactory/models/note.php?note_idx="+exam_idx ,	
												dataType:"xml",
												success:function(xml){	
//			 										alert('note');
													
													if(mq_flag){											 
														 $('#mobile_note').html( $(xml).find('response').find('data').find('content').text());
														 tinyMCE.get('tiny_content').setContent($(xml).find('response').find('data').find('content').text());
																										 
														 $iframe = $("#tiny_content_ifr").contents();
														 $iframe.find('#tinymce').find(".txc-table").css({"width":"100%"});
														 $iframe.find('#tinymce').find("img").css({"width":"100%","height":"100%"});
														 
														 $("#mq_article_title").val($(xml).find('response').find('data').find('title').text());
										 				 
														 $("#mq_note_idx").val(note_idx);
														 
														 var q_idx_list = "";
														 var q_idx_count = 0;
														 $('#mobile_note').find(".quiz").each(function(){
//															 alert($(this).html());
															if($(this).attr("q_idx") != null && $(this).attr("q_idx") != ""){
//																alert("q_idx : "+$(this).attr("q_idx"));
																 q_idx_list += $(this).attr("q_idx") + ",";
																 q_idx_count ++;
															}										 
														 });
														 			
//														 alert(q_idx_list);
														 
														 var one_above = 0;
														 var two_above = 0;
														 var three_above = 0;
														 var multi_choice = 0;
														 var ox_choice = 0;
														 
														 var tcount_all = 0;
														 var tcorrect_all = 0;
														 
														 $.ajax({
																type : "post",
																url  : "/oxfactory/models/exam_info.php?q_idx_list="+q_idx_list+"&q_idx_count="+q_idx_count,
																dataType : "xml",
																success : function(xml){
																	
																	$(xml).find('data').each(function(){
																		var tcount = $(this).find('tcount').text();
																		var tcorrect = $(this).find('tcorrect').text();
//																		alert($(this).find('q_idx').text() + " " + $(this).find('tcount').text() + " " + $(this).find('tcorrect').text());
																		if((tcount-tcorrect) >= 3){
																			three_above ++;
																		}
																		if((tcount-tcorrect) >= 2){
																			two_above ++;
																		}
																		if((tcount-tcorrect) >= 1){
																			one_above ++;
																		}	
																		
																		tcount_all += Number(tcount);
																		tcorrect_all += Number(tcorrect);
//																		
																		
																		var qtype = $(this).find('qtype').text();
																		if(qtype == 1){
																			multi_choice ++;
																		}else if(qtype == 2){
																			ox_choice ++;
																		}else if(qtype == 3){
																			
																		}
																																
																	});
																	
																	
																	$("#modal_total_question_cnt").html("총 "+(multi_choice+ox_choice)+"문제");
																	$("#modal_question_compose").html("OX형("+ox_choice+") / 객관식("+multi_choice+")");
																	
																	$("#one_above").html("틀린문제("+one_above+")");
																	$("#two_above").html("틀린문제("+two_above+")");
																	$("#three_above").html("틀린문제("+three_above+")");
																	
														 
																	var correct_rate = parseFloat(tcorrect_all)/parseFloat(tcount_all)*100;
																	if(tcount_all == 0){
																		$("#modal_answer_portion").html("미풀이");
																	}else{
																		$("#modal_answer_portion").html("정답율 "+correct_rate.toFixed(0)+"%");
																	}
																	
																	$(".modal_question_choice").eq(0).css({"background-color":"black","color":"white"});	
																	
																	$(".modal_question_choice").on('click',function(){																	
																		
																		
																		if($(this).attr('class') == 'modal_question_choice all'){
																			 $(".modal_question_choice").css({"background-color":"white","color":"black"});
																			 $(this).css({"background-color":"black","color":"white"});	
																			 $("#test_start").attr('qtype','all');
																		}else if($(this).attr('class') == 'modal_question_choice one'){
																			if(one_above > 0){
																				  $(".modal_question_choice").css({"background-color":"white","color":"black"});
																				  $(this).css({"background-color":"black","color":"white"});
																				  $("#test_start").attr('qtype','one');
																			}
																		}else if($(this).attr('class') == 'modal_question_choice two'){
																			if(two_above > 0){
																				$(".modal_question_choice").css({"background-color":"white","color":"black"});
																				$(this).css({"background-color":"black","color":"white"});	
																				$("#test_start").attr('qtype','two');
																			}
																		}else if($(this).attr('class') == 'modal_question_choice three'){
																			if(three_above > 0){
																				$(".modal_question_choice").css({"background-color":"white","color":"black"});
																				$(this).css({"background-color":"black","color":"white"});	
																				$("#test_start").attr('qtype','three');
																			}
																		}
																		
																	});
																	
																	 $("#myModal").modal();
																	 																	 
																	 $("#test_start").on('click',function(){
//																		alert('test_start clicked');
																		 var exam_qtype = $(this).attr('qtype');
//																		 alert(exam_qtype);
																		 var url = "/oxfactory/views/test_view.php?note_idx="+exam_idx+"&exam_title="+exam_title+"&exam_qtype="+exam_qtype;										 
																		 window.location.href = url;
																	 });
																	 
																},
																error : function(e){
																	alert(e.responseText);
																}											
															});	
														 
													}else{												
//				 										alert('성공');
														Editor.modify({content: $(xml).find('response').find('data').find('content').text(), attachments:[]});
														$("#tx_article_title").val($(xml).find('response').find('data').find('title').text());
//														alert($(xml).find('response').find('data').find('title').text());
														if($(xml).find('response').find('data').find('content').text() == "" 
															|| $(xml).find('response').find('data').find('content').text() == null){
															Editor.getCanvas().setContent("");
														}
														 
//														var $iframe = $("#tx_canvas_wysiwyg").contents();
//														$iframe.find("body").css({"opacity":"0"});
//														$iframe.find("body").animate({"opacity":"1"},200);
//														$iframe.find("body").css({"height":"1000px"});
//														Editor.getCanvas().focus();	
														
														
														var $iframe = $("#tx_canvas_wysiwyg").contents();
														 
														 var q_idx_list = "";
														 var q_idx_count = 0;
														 $iframe.find(".quiz").each(function(){
															if($(this).attr("q_idx") != null && $(this).attr("q_idx") != ""){
//																alert("q_idx : "+$(this).attr("q_idx"));
																 q_idx_list += $(this).attr("q_idx") + ",";
																 q_idx_count ++;
															}										 
														 });
														 
//														 alert(q_idx_list);
//														 alert(q_idx_count);
														 
														 var one_above = 0;
														 var two_above = 0;
														 var three_above = 0;
														 var multi_choice = 0;
														 var ox_choice = 0;
														 
														 var tcount_all = 0;
														 var tcorrect_all = 0;
														 
														 $.ajax({
																type : "post",
																url  : "/oxfactory/models/exam_info.php?q_idx_list="+q_idx_list+"&q_idx_count="+q_idx_count,
																dataType : "xml",
																success : function(xml){
																	
																	$(xml).find('data').each(function(){
																		var tcount = $(this).find('tcount').text();
																		var tcorrect = $(this).find('tcorrect').text();
//																		alert($(this).find('q_idx').text() + " " + $(this).find('tcount').text() + " " + $(this).find('tcorrect').text());
																		if((tcount-tcorrect) >= 3){
																			three_above ++;
																		}
																		if((tcount-tcorrect) >= 2){
																			two_above ++;
																		}
																		if((tcount-tcorrect) >= 1){
																			one_above ++;
																		}	
																		
																		tcount_all += Number(tcount);
																		tcorrect_all += Number(tcorrect);
//																		
//																		alert(tcount_all);
//																		alert(tcorrect_all);
																		
																		
																		var qtype = $(this).find('qtype').text();
																		if(qtype == 1){
																			multi_choice ++;
																		}else if(qtype == 2){
																			ox_choice ++;
																		}else if(qtype == 3){
																			
																		}
																																
																	});
																	
																	
																	$("#modal_total_question_cnt").html("총 "+(multi_choice+ox_choice)+"문제");
																	$("#modal_question_compose").html("OX형("+ox_choice+") / 객관식("+multi_choice+")");
																	
																	$("#one_above").html("틀린문제("+one_above+")");
																	$("#two_above").html("틀린문제("+two_above+")");
																	$("#three_above").html("틀린문제("+three_above+")");
																	
														 
//																	alert(tcount_all);
//																	alert(tcorrect_all);
//																	alert(parseFloat(tcorrect_all)/parseFloat(tcount_all));
																	
																	var correct_rate = parseFloat(tcorrect_all)/parseFloat(tcount_all)*100;
																	if(tcount_all == 0){
																		$("#modal_answer_portion").html("미풀이");
																	}else{
																		$("#modal_answer_portion").html("정답율 "+correct_rate+"%");
																	}
																	
																	$(".modal_question_choice").eq(0).css({"background-color":"black","color":"white"});	
																	
																	$(".modal_question_choice").on('click',function(){																	
																		
																		
																		if($(this).attr('class') == 'modal_question_choice all'){
																			 $(".modal_question_choice").css({"background-color":"white","color":"black"});
																			 $(this).css({"background-color":"black","color":"white"});	
																			 $("#test_start").attr('qtype','all');
																		}else if($(this).attr('class') == 'modal_question_choice one'){
																			if(one_above > 0){
																				  $(".modal_question_choice").css({"background-color":"white","color":"black"});
																				  $(this).css({"background-color":"black","color":"white"});
																				  $("#test_start").attr('qtype','one');
																			}
																		}else if($(this).attr('class') == 'modal_question_choice two'){
																			if(two_above > 0){
																				$(".modal_question_choice").css({"background-color":"white","color":"black"});
																				$(this).css({"background-color":"black","color":"white"});	
																				$("#test_start").attr('qtype','two');
																			}
																		}else if($(this).attr('class') == 'modal_question_choice three'){
																			if(three_above > 0){
																				$(".modal_question_choice").css({"background-color":"white","color":"black"});
																				$(this).css({"background-color":"black","color":"white"});	
																				$("#test_start").attr('qtype','three');
																			}
																		}
																		
																	});
																	
																	
																	
																	
																	 $("#myModal").modal();
																	 

//																	 alert('exam clicked');
//																	 var exam_idx = $(this).parents('.note').attr('id');
//																	 alert(exam_idx);
//																	 var exam_title = $(this).parents('.note').children('.gulTitle').text();
//																	 var exam_title = $('#'+exam_idx+' .gulTitle').html();
//																	alert(exam_title);
//																	 var url = "/oxfactory/views/test_view.php?note_idx="+exam_idx+"&exam_title="+exam_title;										 
//																	 window.location.href = url;
																	 
																	 $("#test_start").on('click',function(){
//																		alert('test_start clicked');
																		 var exam_qtype = $(this).attr('qtype');
//																		 alert(exam_qtype);
																		 var url = "/oxfactory/views/test_view.php?note_idx="+exam_idx+"&exam_title="+exam_title+"&exam_qtype="+exam_qtype;										 
																		 window.location.href = url;
																	 });
																	 
																},
																error : function(e){
																	alert(e.responseText);
																}											
															});															
														
														
													}								
													
														
												},	// success end   			
									            error: function(e){
									                alert(e.responseText) ;
									            }
											 });
											 
										 		
										 
										 
										 
										 
																				 												
									 }		
										
								});				
							 
							 
							 if(path == "/"){
								 $("#dir_title").css({"display":"none"})
							 }else{
								 $("#dir_title").css({"display":"block"})
							 }
							 
						},	// success end   			
			            error: function(e){
			                alert(e.responseText) ;
			            }
					});	
			
		
			
			
//		if(note_idx() != null){
//			alert("note_idx not null");
//			note_idx = $(this).attr('id');			
//			
//			// 글을 불러온다
//			 $.ajax({
//				type:"post",
//				url:"/oxfactory/models/note.php?note_idx="+note_idx ,	
//				dataType:"xml",
//				success:function(xml){	
////						alert('note');
//					
//					if(mq_flag){											 
//						 $('#mobile_note').html( $(xml).find('response').find('data').find('content').text());
//						 tinyMCE.get('tiny_content').setContent($(xml).find('response').find('data').find('content').text());
//							
//						 
//						 
//					}else{												
////							alert('성공');
//						Editor.modify({content: $(xml).find('response').find('data').find('content').text(), attachments:[]});
//						$("#tx_article_title").val($(xml).find('response').find('data').find('title').text());
////						alert($(xml).find('response').find('data').find('title').text());
//						 oxfac_getQuestions(note_idx);
//						 refreshQuizTable();
//						 
//						 var $iframe = $("#tx_canvas_wysiwyg").contents();
//						 $iframe.find("body").css({"opacity":"0"});
//						 $iframe.find("body").animate({"opacity":"1"},200);
//						 $iframe.find("body").css({"height":"1000px"});
////						 Editor.getCanvas().focus();	
//						
//						
//					}
//					
//					
//						
//				},	// success end   			
//	            error: function(e){
//	                alert(e.responseText) ;
//	            }						
//			});	
//		}
			
//			alert('kakao link');
			
			
	    }
	    
	    
	 // 노트 저장하기
		$("#tx_save").on('click',function(){			
			
			// 노트 문제 저장
			// 작성 중인 노트의 내용을 서버에 넘겨 문제를 생성한다.
		
//			$.ajax({			
//				type:"post",
//				url:"/oxfactory/models/qlist.php?note_idx"+$("#tx_note_idx").val(),	
//				dataType:"xml",
//				success:function(xml){	
//						    
//					
//					
//					 
//				 },	// success end   			
//		            error: function(e){
//		                alert(e.responseText) ;
//		         }			
//			});	
			
			
			 var $iframe = $("#tx_canvas_wysiwyg").contents();
			
			
			 var q_idx_null_cnt = 0;
			 			 
			 $iframe.find(".quiz").each(function(index, item){
				
				if($(this).attr('q_idx')==null){
//					alert(index + ' q_idx null');
					q_idx_null_cnt++;
//					q_idx_null_content += $(this)[0].outerHTML + "/q_idx_split";
//					q_idx_null = $iframe.find(".quiz").eq(index)
//					alert($(this)[0].outerHTML);				
				
//					q_idx_null_content += $(this)[0].outerHTML+"";
				}else{
//					alert(index + ' q_idx not null');
				}
			});			
//			alert(q_idx_null);
//			alert(q_idx_null_content);
			 
			$("#qForm_q_idx_null").val(q_idx_null_cnt);
//			$("#qForm").submit();
			
			var qformData = $("#qForm").serialize();
			alert(qformData);
			$.ajax({			
				type:"post",
				url:"/oxfactory/models/add_question.php",	
				cache : false,
				data : qformData,
				dataType:"xml",
				success:function(xml){	
						
//					alert($(xml).find('response').find('data').text());
					
//					$(xml).find('data').each(function(){
//						
//						alert('response data nextId');
//					});
					
					
					var data_idx = 0;
					 $iframe.find(".quiz").each(function(index, item){
							
							if($(this).attr('q_idx')==null || $(this).attr('q_idx') == ""){
								var temp = $(xml).find('data').eq(data_idx).find('nextId').text();
								$(this).attr('q_idx',temp);
								data_idx++;
							}else{
//								alert(index + ' q_idx not null');
							}
						});		
					 
					 
					 $("#myForm_article_title").val($("#tx_article_title").val());
					 $("#myForm_content").val(Editor.getCanvas().getContent());
					 $("#myForm_note_idx").val($("#tx_note_idx").val());
					
					 			 
						var formData = $("#myForm").serialize();
//						alert(formData);
						 $.ajax({			
								type:"post",
								url:"/oxfactory/models/register.php",	
								cache : false,
								data : formData,
								dataType:"xml",
								success:function(xml){	
									
//									id='tx_save_span' class="glyphicon glyphicon-ok"
									$("#tx_save_span").animate({"opacity":"1"},200);
									$("#tx_save_tx").animate({"opacity":"0"},200);
									setTimeout(function(){
										$("#tx_save_span").animate({"opacity":"0"},200);
										$("#tx_save_tx").animate({"opacity":"1"},200);
									},1000);	
									
									
									trans_dir(dir,title,seq);
											    
									 
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
			
//			alert(Editor.getCanvas().getContent());
			
			
				 
				 
		});
		
	    // 노트 추가
	    var add_note = function(){
			
//	    	alert(path);
	    	
			$.ajax({			
				type:"post",
				url:"/oxfactory/models/add.php?directory="+path.trim(),	
				dataType:"xml",
				success:function(xml){	
					
					 $(xml).find('response').each(function(){
		                    var note_num = $(this).find("note_idx").text();
		                    note_idx = note_num;
		                    $("#tx_note_idx").val(note_idx);
		                    
		                });
					 trans_dir(dir,title,seq);
					 
					 if(mq_flag){
						 tinyMCE.get('tiny_content').setContent("");
						 $("#mq_article_title").val("제목없음");
						 
					 }else{
						 $("#tx_article_title").val("제목없음");
						 Editor.getCanvas().setContent("");
						 Editor.getCanvas().focus();
					 }
				    
					 
				 },	// success end   			
		            error: function(e){
		                alert(e.responseText) ;
		         }			
			});		
		};
		// 날짜 형식 변경
		var reform_date = function (){		
//			this.receive_date = date;										
										
			this.reformed_date = function (receive_date) {	
				var newDt = "";
				var yourdate = receive_date;
				var dt = new Date(yourdate);
				var year = dt.getFullYear();
				var month = dt.getMonth()+1;
				var date = dt.getDate();
				if(dt.getMonth()+1 < 10) {	month = "0"+month;	}
				if(dt.getDate() < 10){	date = "0"+date; }
				if(year == dt.getFullYear()){
					newDt = month+"."+date;		
				}else{
					newDt = year+"."+month+"."+date;		
				}
				
				
				
				
				return newDt;
			};	
			
		}
		
		$(".tx-oxfac").on("mouseenter", function(){	
			$("#qtype_menu").css({"display":"normal"});
			
			$("#qtype_menu").menu({
	            select: function(event, ui) {
//	                alert(ui.item.attr('tag'));
	            	set_qtype(ui.item.attr('tag'));
	            	alert(ui.item.attr('tag')=="c1");
	            	if(ui.item.attr('tag')=="c1"){
	            	var count = ui.item.text();
	            	alert(count);
	            	set_optionCnt(count);
	            	}
	            	oxfac_getQuestions(note_idx);
	            	
	            	
	            	
	            	
	            }
	        });		
		});
		$(".tx-oxfac").on("mouseleave",function(){
			$("#qtype_menu").css({"display":"none"});
		});
		
		
			
//		 $("#menu").click(function(){
//	      	  if($(this).attr("class") == "noactive")
//	      	  { 
//	      	    $(this).removeClass("noactive");         
//	      	    $("#submenu li").addClass("activeli");
//	      	  }
//	      	  else
//	      	  { 
//	      	    $(this).addClass("noactive");
//	      	    $("#submenu li").removeClass("activeli");
//	      	  }       	  
//	      	});
		 
		$("#menu, #submenu").on("mouseenter",function(){
			 if($(this).attr("class") == "noactive")
	      	  { 
	      	    $(this).removeClass("noactive");         
	      	    $("#submenu li").addClass("activeli");
	      	  }
	      	  else
	      	  { 
	      	    $(this).addClass("noactive");
	      	    $("#submenu li").removeClass("activeli");
	      	  }       
		});
		$("#menu").on("mouseleave",function(){
			 if($(this).attr("class") == "noactive")
	      	  { 
	      	    $(this).removeClass("noactive");         
	      	    $("#submenu li").addClass("activeli");
	      	  }
	      	  else
	      	  { 
	      	    $(this).addClass("noactive");
	      	    $("#submenu li").removeClass("activeli");
	      	  }       
		});
		
		
		
		
		
		var sendAsBlob = function() {
		    
		    var ajaxRequest = new XMLHttpRequest();
		    ajaxRequest.open('POST', 'http://localhost:5555/oxfactory/models/update.php', true);
		    ajaxRequest.setRequestHeader('Content-Type', 'application/xml');
		    
		    ajaxRequest.onreadystatechange = function() {
		        if (ajaxRequest.readyState == 4) {
		            alert('Response: \n' + ajaxRequest.responseText);
		        }
		    };

		    var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
		    
		    if(BlobBuilder) {
		        // android
		        var oBuilder = new BlobBuilder();
		        var aFileParts = ['{ "text": "test" }'];
		        oBuilder.append(aFileParts[0]);
		        var blob = oBuilder.getBlob("text\/plain"); // the blob
		        
		    } else {
		        // everyone else
		        var blob = new Blob(['{ "text": "test" }'], { 'type': 'text/plain' });    
		    }

		    ajaxRequest.send(blob);
		};

		var str2ab_blobreader = function(str, callback) {
		    var blob;
		    BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
		    if (typeof(BlobBuilder) !== 'undefined') {
		      var bb = new BlobBuilder();
		      bb.append(str);
		      blob = bb.getBlob();
		    } else {
		      blob = new Blob([str]);
		    }
		    var f = new FileReader();
		    f.onload = function(e) {
		        callback(e.target.result)
		    }
		    f.readAsArrayBuffer(blob);
		}

		function sendAsAB() {
		 
		    var ajaxRequest = new XMLHttpRequest();
		    ajaxRequest.open('POST', 'http://localhost:5555/oxfactory/models/update.php', true);
		    ajaxRequest.setRequestHeader('Content-Type', 'application/xml');
		    
		    ajaxRequest.onreadystatechange = function() {
		        if (ajaxRequest.readyState == 4) {
		            alert('Response: \n' + ajaxRequest.responseText);
		        }
		    };
		        
		   var buffer = str2ab_blobreader('{ "text": "test" }', function(buf) {
		       ajaxRequest.send(buf);
		    });

		};
		
		
	}); // document.ready
	
	
	 function addQuestion(){		   
		   
 		$.ajax({
 		type:"post",
			url:"/oxfactory/models/oxq.php?note_idx="+note_idx+
							"&question_content="+escape(encodeURIComponent(SelectRangeNode.trim()))+
							"&qtype="+oxfac_qtype+
							"&optCnt="+get_optionCnt(),	
			dataType:"xml",
			success:function(xml){	
				
				question_num = $(xml).find("question_num").text();	
				
				oxfac_setQuestionNum(question_num);
				
//				var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
//				
//				if(isEmpty(rownum)) {
//					rownum = 1;
//				}else{
//					rownum = parseInt(rownum) + 1;
//				}					
				var oxfacHTML = "";
				oxfacHTML += "<tr>";
				oxfacHTML += "	<td class='oxfac-tab-content'>"+ SelectRangeNode.trim() +"</td>";
				oxfacHTML += "</tr>";
				
				$("#oxfac-status-tab").append(oxfacHTML);
							
				
				
				
//				oxfacHTML += "<tr>";
//				oxfacHTML += "	<th style='width:20px'>번호</th>";
//				oxfacHTML += "	<th>문제</th>";
//				oxfacHTML += "  <th style='width:10px'>정답</th>";
//				oxfacHTML += "  <th style='width:10px'>삭제</th>";
//				oxfacHTML += "</tr>";			
				
//				$(xml).find('data').each(function(){
					
				var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
				
				if(isEmpty(rownum)) {
					rownum = 1;
				}else{
					rownum = parseInt(rownum) + 1;
				}	
				
				oxfacHTML += "<tr id='"+ $(this).find('question_num').text() +"'>";
				oxfacHTML += "	<td class='oxfac-tab-rownum' >"+ rownum +"</td>";
				oxfacHTML += "	<td class='oxfac-tab-content'>"+ SelectRangeNode.trim() +"</td>";
				oxfacHTML += "	<td class='oxfac-tab-answer' ></td>";
				oxfacHTML += "  <td class='oxfac-tab-del'><i class='fa fa-times-circle-o fa-2x'></i></td>";
				oxfacHTML += "</tr>";
				
//				}
				
//				for ( var int = 0; int < oxfac_optCnt; int++) {
					
					oxfacHTML += "<tr id='"+ $(this).find('question_num').text() +"'>";
					oxfacHTML += "	<td class='oxfac-tab-option'>"+ (int+1) +"</td>";
					oxfacHTML += "	<td class='oxfac-tab-answer' style='width:20px'></td>";
					oxfacHTML += "</tr>";
					
//				}
				
				
					$("#oxfac-status-tab").append(oxfacHTML);
				
				
			 },	// success end   			
	            error: function(e){
	                alert(e.responseText) ;
	         }	
 	});
			   
	  }
	
	 
	 
	 function addRightOption(){
		   
	 		$.ajax({
	 		type:"post",
				url:"/oxfactory/models/oxq.php?note_idx="+note_idx+
								"&question_content="+escape(encodeURIComponent(SelectRangeNode.trim()))+
								"&qtype="+oxfac_qtype+
								"&optCnt="+get_optionCnt(),	
				dataType:"xml",
				success:function(xml){	
					
					question_num = $(xml).find("question_num").text();	
					
					oxfac_setQuestionNum(question_num);
					
					var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
					
					if(isEmpty(rownum)) {
						rownum = 1;
					}else{
						rownum = parseInt(rownum) + 1;
					}					
					var oxfacHTML = "";
//					oxfacHTML += "<tr id='"+ question_num +"'>";
//					oxfacHTML += "	<td class='oxfac-tab-rownum'>"+ rownum +"</td>";
//					oxfacHTML += "	<td class='oxfac-tab-content'>"+ SelectRangeNode.trim() +"</td>";
//					oxfacHTML += "	<td class='oxfac-tab-answer'></td>";
//					oxfacHTML += "	<td class='oxfac-tab-del'><i class='fa fa-times-circle-o fa-2x'></i></td>";
//					oxfacHTML += "</tr>";
					
					oxfacHTML += "<tr id='"+ $(this).find('question_num').text() +"'>";
					oxfacHTML += "	<td class='oxfac-tab-option' id='oxfac-tab-option>"+ (int+1) +"</td>";
					oxfacHTML += "	<td class='oxfac-tab-answer' style='width:20px'></td>";
					oxfacHTML += "</tr>";
					
					$("#oxfac-status-tab").append(oxfacHTML);
					
				 },	// success end   			
		            error: function(e){
		                alert(e.responseText) ;
		         }	
	 	});
				   
	 }
	 function kakao_link(){
		
	 }
	 function refreshQuizTable(){
		 
		 var $iframe = $("#tx_canvas_wysiwyg").contents();
 		
		 
 		
 		$iframe.find(".quiz").each(function(index,item){
 			
 			$(this).attr("id",index).find("tr:first-child td:first-child").html("<span style='word-break: keep-all; text-align:center; '>문제 "+(index+1)+"</span>");
 			
 			$(this).find(".txc-table-option-number").on("click",function(){
 				
// 				alert("answer");
 				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").css({"background-color":"white"});	        	            				
 				$(this).css({"background-color":"lightblue"});	
 				
 				$iframe.find(".quiz").eq(index).find(".txc-table-option-number").attr("class","txc-table-option-number");	        	            				
 				$(this).attr("class","txc-table-option-number answer");	        	            				
 				
 				
 			});   	        	            				
 		}); 
 		
 		$iframe.find(".quiz").css({"border-radius":"10px"});
 		
// 		$("#tx_toolbar_basic").on("mouseover",function(){
//// 			alert("mouseover");
// 			$(this).slideUp();
// 			
// 		});
// 		$("#tx_toolbar_basic").on("mouseout",function(){ 		
//// 			alert("mouseout");
// 			$(this).slideDown();
// 		});
 		
 		/* 사이드 아이콘 보이기 */
// 	   var toolbar_nav_flag = true;
// 		$( document ).on( "mousemove", function( event ) {
// 			if(event.screenY < 250 && toolbar_nav_flag==true ){		
//// 				alert("hello");
//// 					$("#tx_toolbar_basic").slideDown();	
//// 					$("#tx_toolbar_advanced").slideDown();
// 				$("#tx_toolbar_basic").animate({"opacity":"1"},200);
// 				$("#tx_toolbar_advanced").animate({"opacity":"1"},200);
// 					toolbar_nav_flag = false;
// 			}else if(event.screenY >=250 && toolbar_nav_flag==false ){	
//// 				alert("bye");
//// 				!$(".tx-menu").on("mouseover",function(){
// 					
//// 					$("#tx_toolbar_basic").slideUp();
//// 					$("#tx_toolbar_advanced").slideUp();
// 					$("#tx_toolbar_basic").animate({"opacity":"0"},200);
// 					$("#tx_toolbar_advanced").animate({"opacity":"0"},200);
// 					toolbar_nav_flag = true;
//// 				});
// 					
// 			}  		
//         });	
// 	   $(".tx-toolbar-basic").on("mouseout",function(){
//			$("#tx_toolbar_basic").animate({"opacity":"0.2"},200);
//			$("#tx_toolbar_advanced").animate({"opacity":"0.2"},200);		
//		});
// 	  
// 		$(".tx-toolbar-basic").on("mouseover",function(){
// 			$("#tx_toolbar_basic").animate({"opacity":"1"},200);
//			$("#tx_toolbar_advanced").animate({"opacity":"1"},200); 	
//			
//			
//			
// 		});
 		
 		
 		
// 		var height = $(window).height();
 		 document.getElementById('body').style.height = window.innerHeight +'px';
 		
	 }
	 
	 function addWrongOption(){
		   
	 		$.ajax({
	 		type:"post",
				url:"/oxfactory/models/oxq.php?note_idx="+note_idx+
								"&question_content="+escape(encodeURIComponent(SelectRangeNode.trim()))+
								"&qtype="+oxfac_qtype+
								"&optCnt="+get_optionCnt(),	
				dataType:"xml",
				success:function(xml){	
					
					question_num = $(xml).find("question_num").text();	
					
					oxfac_setQuestionNum(question_num);
					
					var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
					
					if(isEmpty(rownum)) {
						rownum = 1;
					}else{
						rownum = parseInt(rownum) + 1;
					}					
					var oxfacHTML = "";
//					oxfacHTML += "<tr id='"+ question_num +"'>";
//					oxfacHTML += "	<td class='oxfac-tab-rownum'>"+ rownum +"</td>";
//					oxfacHTML += "	<td class='oxfac-tab-content'>"+ SelectRangeNode.trim() +"</td>";
//					oxfacHTML += "	<td class='oxfac-tab-answer'></td>";
//					oxfacHTML += "	<td class='oxfac-tab-del'><i class='fa fa-times-circle-o fa-2x'></i></td>";
//					oxfacHTML += "</tr>";
					
					oxfacHTML += "<tr id='"+ $(this).find('question_num').text() +"'>";
					oxfacHTML += "	<td class='oxfac-tab-option' id='oxfac-tab-option>"+ (int+1) +"</td>";
					oxfacHTML += "	<td class='oxfac-tab-answer' style='width:20px'></td>";
					oxfacHTML += "</tr>";
					
					$("#oxfac-status-tab").append(oxfacHTML);
					
				 },	// success end   			
		            error: function(e){
		                alert(e.responseText) ;
		         }	
	 	});
				   
	 }
	 
	 
	 function username(){
//		 alert($('#cell').html());
		 return $('#cell').html();
	 }
	 
	function initEditor(){
		
			
		}
	
	

