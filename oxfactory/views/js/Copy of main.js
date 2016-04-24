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
	    
		
		
	$(document).ready(function($){ 		
		
		
		 setTimeout(function(){
	            $('#body').fadeIn('slow', function () {
	            	Editor.getCanvas().focus();
	            });
	        },0);
		 
		 
		 
		 
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
		
		initEditor();
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
//				 oxfac_getQuestions(note_idx);
//				 
//				 Editor.getCanvas().focus();
//				 
//			 },	// success end   			
//	            error: function(e){
//	                alert(e.responseText) ;
//	         }			
//		});

		
		
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
	        						
	        	        		    $.ajax({
	        	        				type:"post",
//	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
	        	        				dataType:"xml",
	        	        				success:function(xml){	
	        	        					
	        	        					if(content.indexOf("<") == 0){
//	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
	        	        					    
	        	        					    $("#"+note_idx+" .gulTitle").html(title);
	        	        						title[note_idx] = title;		
	        	        					}						
	        	        					
	        	        					trans_dir(dir, title, seq);
	        	        					
	        	        				 },	// success end   			
	        	        		            error: function(e){
	        	        		                alert(e.responseText) ;
	        	        		            }
	        	        			});	
	        	            		
	        	            		
	        	            		Editor.getCanvas().past
	        	            		
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
	        						
	        	        		    $.ajax({
	        	        				type:"post",
//	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
	        	        				dataType:"xml",
	        	        				success:function(xml){	
	        	        					
	        	        					if(content.indexOf("<") == 0){
//	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
	        	        					   
	        	        					    $("#"+note_idx+" .gulTitle").html(title);
	        	        						title[note_idx] = title;		
	        	        					}						
	        	        					
	        	        					trans_dir(dir, title, seq);
	        	        					
	        	        				 },	// success end   			
	        	        		            error: function(e){
	        	        		                alert(e.responseText) ;
	        	        		            }
	        	        			});	
	        	            		
	        	            		
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
	        						
	        	        		    $.ajax({
	        	        				type:"post",
//	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
	        	        				dataType:"xml",
	        	        				success:function(xml){	
	        	        					
	        	        					if(content.indexOf("<") == 0){
//	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
	        	        					   
	        	        					    $("#"+note_idx+" .gulTitle").html(title);
	        	        						title[note_idx] = title;		
	        	        					}						
	        	        					
	        	        					trans_dir(dir, title, seq);
	        	        					
	        	        				 },	// success end   			
	        	        		            error: function(e){
	        	        		                alert(e.responseText) ;
	        	        		            }
	        	        			});	
	        	            		
	        	            		
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
	        						
	        	        		    $.ajax({
	        	        				type:"post",
//	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
	        	        				dataType:"xml",
	        	        				success:function(xml){	
	        	        					
	        	        					if(content.indexOf("<") == 0){
//	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
	        	        					    
	        	        					    $("#"+note_idx+" .gulTitle").html(title);
	        	        						title[note_idx] = title;		
	        	        					}						
	        	        					
	        	        					trans_dir(dir, title, seq);
	        	        					
	        	        				 },	// success end   			
	        	        		            error: function(e){
	        	        		                alert(e.responseText) ;
	        	        		            }
	        	        			});	
	        	            		
	        	            		
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
	        						
	        	        		    $.ajax({
	        	        				type:"post",
//	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
	        	        				dataType:"xml",
	        	        				success:function(xml){	
	        	        					
	        	        					if(content.indexOf("<") == 0){
//	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
	        	        					   
	        	        					    $("#"+note_idx+" .gulTitle").html(title);
	        	        						title[note_idx] = title;		
	        	        					}						
	        	        					
	        	        					trans_dir(dir, title, seq);
	        	        					
	        	        				 },	// success end   			
	        	        		            error: function(e){
	        	        		                alert(e.responseText) ;
	        	        		            }
	        	        			});	
	        	            		
	        	            		
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
	        						
	        	        		    $.ajax({
	        	        				type:"post",
//	        	         				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
	        	        				url:"/oxfactory/models/update.php?content="+ content +"&note_idx="+note_idx,
	        	        				dataType:"xml",
	        	        				success:function(xml){	
	        	        					
	        	        					if(content.indexOf("<") == 0){
//	        	         						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
	        	        					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
	        	        					   
	        	        					    $("#"+note_idx+" .gulTitle").html(title);
	        	        						title[note_idx] = title;		
	        	        					}						
	        	        					
	        	        					trans_dir(dir, title, seq);
	        	        					
	        	        				 },	// success end   			
	        	        		            error: function(e){
	        	        		                alert(e.responseText) ;
	        	        		            }
	        	        			});	
	        	            		
	        	            		
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
			var content = this.getContent();			
					
		    $.ajax({
				type:"post",
// 				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
				url:"/oxfactory/models/update.php?content="+escape(encodeURIComponent(content))+"&note_idx="+note_idx,
				dataType:"xml",
				success:function(xml){	
					
					if(content.indexOf("<") == 0){
// 						alert(content.substring(content.indexOf(">")+1, content.indexOf("</p>")));
					    title = content.substring(content.indexOf(">")+1, content.indexOf("</p>"));
//					    alert(title.length);
					    $("#"+note_idx+" .gulTitle").html(title);
						title[note_idx] = title;		
					}						
					
				 },	// success end   			
		            error: function(e){
		                alert(e.responseText) ;
		            }
			});			
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
	    	trans_dir(dir,title,seq);
	    	Editor.getCanvas().setContent("");
	    	
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
	    	
	    	 var url = "/oxfactory/views/oxfactory.php";										 
			 window.location.href = url;
	    	
		  });	
	    
	   
	    
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
						url:"/oxfactory/models/list.php?username="+ $('#cell').html() ,
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
							innerHTML += " <ul>";//alert("첫번째 클릭");
							for (var int = 0; int < dir.length; int++) {	  
							    /* path == dir[int]   is meant arrival of note's path */
								if(path == dir[int]){												  
									 innerHTML += " <li class='note' style='width:300px; ' id='"+ seq[int] +"' >";							
									 innerHTML += "  <div class='create_time' style='float:right; font-size:10pt'>" + reDate.reformed_date(reg_date[int]) +"</div>";
									 innerHTML += "  <div class='gulTitle' ><span class='title_span'>"+ title[int] + "</span></div>";									 
									 innerHTML += "  <ul class='note_icons' >";																				 									 
									 if(quiz_count[int]>0){									 
									 innerHTML += "    <a href='#' class='exam glyphicon glyphicon-edit' style='opacity:0.8;'>"+ quiz_count[int] +" </a> ";
									 }
									 innerHTML += " <a class='kakao-link-btn' href='#'>";
									 innerHTML += "  <img style='width:20px; height:20px;' src='http://dn.api1.kage.kakao.co.kr/14/dn/btqa9B90G1b/GESkkYjKCwJdYOkLvIBKZ0/o.jpg' />";
									 innerHTML += " </a>";
									 innerHTML += "    <a href='#' class='share glyphicon glyphicon-user' style='opacity:0.8;'></a> ";	
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
									 innerHTML += "   <li class='folder' style='background-color:#ccccdd; width:300px;'>";
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
							
							
					    	 /* 목록리스트 마우스오버 효과 */
							$(".folder").on('mouseover',function(){					
							$(this).css({'width':'300px','background-color':'#aaaabb','opacity':'0.7','position':'relative','z-index':'500'});
							});
							$(".folder").on('mouseout',function(){
						    $(this).css({'width':'300px','background-color':'#ccccdd'});
							});
							
							$(".note").on('mouseenter',function(e){	
								e.stopPropagation();
								$(this).css({'width':'300px','background-color':'lightgreen','opacity':'0.3','position':'relative','z-index':'500'});
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
								
								$(this).find('ul').animate({"display":"block"},100);
								$(this).find('ul').show();
								});
							$(".note").on('mouseleave',function(){
							    $(this).css({'width':'300px','background-color':'white'});
								
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
								$("#side_search").css({"left":"300px","opacity":"0"});
								$("#side_search").animate({"left":"0px","opacity":"1"},500);
								
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
							
//							$('.kakao-link-btn').on('click',function(){
//								note_idx = $(this).parents('.note').attr('id');
//								
//								
////								alert(note_idx);
//								
//								
//							});
							
							
							
							// 노트 글 가져오기
							$(".note").on('click',function(){
								
								//alert($(this).attr("id"));
								// $(this).attr('id')는 글번호이다. 전역변수 note_idx에 저장하고
								// 수정이 이루어질때 바로 업데이트 되도록한다
								
								note_idx = $(this).attr('id');
								
								
								// 글을 불러온다
								 $.ajax({
									type:"post",
									url:"/oxfactory/models/note.php?note_idx="+note_idx+"&username="+ username(),	
									dataType:"xml",
									success:function(xml){	
 										
// 										alert('성공');
										Editor.modify({content:$(xml).find('response').find('data').find('content').text(), attachments:[]});
										
										 oxfac_getQuestions(note_idx);
										 refreshQuizTable();
										 
										 var $iframe = $("#tx_canvas_wysiwyg").contents();
										 $iframe.find("body").css({"opacity":"0"});
										 $iframe.find("body").animate({"opacity":"1"},200);
										 $iframe.find("body").css({"height":"1000px"});
//										 Editor.getCanvas().focus();
										 
										
											
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
													
												},
												error : function(e){
													alert(e.responseText);
												}											
											});										 							 
										
										 if(del_idx == note_idx){
//											 alert("del_idx == note_idx");
//											 add_note();
											 trans_dir(dir,title,seq);
										 }else{
//											 alert("del_idx != note_idx");
											 trans_dir(dir,title,seq);										 
										 }							 
										 
										 }
									 }		
										
									});
							
							
							 
							
						    // 문제 풀기
							 $('.exam').on('click',function(e){
									e.stopPropagation();
									 if($(e.target).is('.note'))
										 return false;
									 else{
										 var exam_idx = $(this).parents('.note').attr('id');
//										 alert(exam_idx);
//										 var exam_title = $(this).parents('.note').children('.gulTitle').text();
										 var exam_title = $('#'+exam_idx+' .gulTitle').html();
										
										 var url = "/oxfactory/views/test_view.php?note_idx="+exam_idx+"&exam_title="+exam_title;										 
										 window.location.href = url;
//																				 												
									 }		
										
								});							 
							 
						},	// success end   			
			            error: function(e){
			                alert(e.responseText) ;
			            }
					});	
			
//			alert('kakao link');
			
			
	    }
	    
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
		                    
		                });
					 
					 Editor.getCanvas().focus();
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
		
		
		
		var mq = window.matchMedia( "(min-width: 500px)" );
		 
		 if (mq.matches) {
				// window width is at least 500px
			 
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
				
				$('#header').css({"height":"80px"});
				
				$('#menu_controller').css({"left":"0px","width":"100%"});
								
				$( document ).on( "mousemove", function( event ) {
					
					var mouseX = event.pageX;
					var mouseY = event.pageY;
					
					if(mouseX < 100 && mouseY > 100 && side_nav_flag==true){					
//							$("#side_nav").animate({'left':'0px'},500);		
						$("#side_search").css({'left':'-410px','display':'block'});
				    	$("#side_search").animate({'left':'0px','opacity':'1'},500);
						    side_nav_flag = false;
					}else if(mouseX >=100 && side_nav_flag==false){					
//							$("#side_nav").animate({'left':'-100px'},200);	
						$("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
				    		$("#side_search").css('display','none');
						});	
							side_nav_flag = true;
					}  		
		        });	

//				if($("#side_search").css('display') == 'none'){
//			    	$("#side_search").css({'left':'-410px','display':'block'});
//			    	$("#side_search").animate({'left':'0px','opacity':'1'},500);
//			    	}else {	    	
//				    	$("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
//				    		$("#side_search").css('display','none');
//				    	});		    	
//			    	}
				
				
			}
		
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

		/* 예제용 함수 */
		function saveContent() {
			Editor.save(); // 이 함수를 호출하여 글을 등록하면 된다.
		}

		/**
		 * Editor.save()를 호출한 경우 데이터가 유효한지 검사하기 위해 부르는 콜백함수로
		 * 상황에 맞게 수정하여 사용한다.
		 * 모든 데이터가 유효할 경우에 true를 리턴한다.
		 * @function
		 * @param {Object} editor - 에디터에서 넘겨주는 editor 객체
		 * @returns {Boolean} 모든 데이터가 유효할 경우에 true
		 */
		function validForm(editor) {
			// Place your validation logic here

			// sample : validate that content exists
			var validator = new Trex.Validator();
			var content = editor.getContent();
			
			//이름 필수
			if ($("#name").val() == "") {
				alert("이름을 입력하세요.");
				$("#name")[0].focus();
				return;
			}

			//암호 필수
			if ($("#pw").val() == "") {
				alert("암호를 입력하세요.");
				$("#pw")[0].focus();
				return;
			}

			//제목 필수
			if ($("#subject").val() == "") {
				alert("제목을 입력하세요.");
				$("#subject")[0].focus();
				return;
			}
			
			if (!validator.exists(content)) {
				alert('내용을 입력하세요');
				return false;
			}
			
			return true;
		}

		/**
		 * Editor.save()를 호출한 경우 validForm callback 이 수행된 이후
		 * 실제 form submit을 위해 form 필드를 생성, 변경하기 위해 부르는 콜백함수로
		 * 각자 상황에 맞게 적절히 응용하여 사용한다.
		 * @function
		 * @param {Object} editor - 에디터에서 넘겨주는 editor 객체
		 * @returns {Boolean} 정상적인 경우에 true
		 */
		function setForm(editor) {
	        var i, input;
	        var form = editor.getForm();
	        var content = editor.getContent(); 
	       
		    alert(content);
	        /* var replaceContent = Editor.getContent().replace(/(\w+)="([\w\d\/\.\-\s\?=_:;]+)"/gi, "$1='$2'");
	        alert( replaceContent ); */

	        // 본문 내용을 필드를 생성하여 값을 할당하는 부분
	        var textarea = document.createElement('textarea');
	        textarea.name = 'content';
	        textarea.value = content;
	        
	        form.createField(textarea);

	        /* 아래의 코드는 첨부된 데이터를 필드를 생성하여 값을 할당하는 부분으로 상황에 맞게 수정하여 사용한다.
	         첨부된 데이터 중에 주어진 종류(image,file..)에 해당하는 것만 배열로 넘겨준다. */
	        var images = editor.getAttachments('image');
	        for (i = 0; i < images.length; i++) {
	            // existStage는 현재 본문에 존재하는지 여부
	            if (images[i].existStage) {
	                // data는 팝업에서 execAttach 등을 통해 넘긴 데이터
	                alert('attachment information - image[' + i + '] \r\n' + JSON.stringify(images[i].data));
	                input = document.createElement('input');
	                input.type = 'hidden';
	                input.name = 'attach_image';
	                input.value = images[i].data.imageurl;  // 예에서는 이미지경로만 받아서 사용
	                form.createField(input);
	            }
	        }

	        var files = editor.getAttachments('file');
	        for (i = 0; i < files.length; i++) {
	            input = document.createElement('input');
	            input.type = 'hidden';
	            input.name = 'attach_file';
	            input.value = files[i].data.attachurl;
	            form.createField(input);
	        }
	        return true;
		}
		
		var config = {
				txHost: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
				txPath: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
				txService: 'sample', /* 수정필요없음. */
				txProject: 'sample', /* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
				initializedId: "", /* 대부분의 경우에 빈문자열 */
				wrapper: "tx_trex_container", /* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
				form: 'form1'+"", /* 등록하기 위한 Form 이름 */
				txIconPath: "images/icon/editor/", /*에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
				txDecoPath: "images/deco/contents/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
				canvas: {
		            exitEditor:{
		                /*
		                desc:'빠져 나오시려면 shift+b를 누르세요.',
		                hotKey: {
		                    shiftKey:true,
		                    keyCode:66
		                },
		                nextElement: document.getElementsByTagName('button')[0]
		                */
		            },
		            initHeight:600,
					styles: {
						color: "#000000", /* 기본 글자색 */
						fontFamily: "verdana", /* 기본 글자체 */
						fontSize: "12pt", /* 기본 글자크기 */
						backgroundColor: "#fff", /*기본 배경색 */
						lineHeight: "1.5", /*기본 줄간격 */
						padding: "8px" /* 위지윅 영역의 여백 */
					},
					showGuideArea: true
				},
				events: {
					preventUnload: false
				},
				sidebar: {
					attachbox: {
						show: true,
						confirmForDeleteAll: true
					}
				},
				size: {
					contentWidth: 700 /* 지정된 본문영역의 넓이가 있을 경우에 설정 */
				}
			};
		var config2 = {
				txHost: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
				txPath: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
				txService: 'sample', /* 수정필요없음. */
				txProject: 'sample', /* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
				initializedId: "", /* 대부분의 경우에 빈문자열 */
				wrapper: "tx_trex_container", /* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
				form: 'form1'+"", /* 등록하기 위한 Form 이름 */
				txIconPath: "images/icon/editor/", /*에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
				txDecoPath: "images/deco/contents/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
				canvas: {
		            exitEditor:{
		                /*
		                desc:'빠져 나오시려면 shift+b를 누르세요.',
		                hotKey: {
		                    shiftKey:true,
		                    keyCode:66
		                },
		                nextElement: document.getElementsByTagName('button')[0]
		                */
		            },
					styles: {
						color: "#000000", /* 기본 글자색 */
						fontFamily: "바탕", /* 기본 글자체 */
						fontSize: "12pt", /* 기본 글자크기 */
						backgroundColor: "#fff", /*기본 배경색 */
						lineHeight: "1.5", /*기본 줄간격 */
						padding: "8px" /* 위지윅 영역의 여백 */
					},
					showGuideArea: true
				},
				events: {
					preventUnload: false
				},
				sidebar: {
					attachbox: {
						show: true,
						confirmForDeleteAll: true
					}
				},
				size: {
					contentWidth: 700 /* 지정된 본문영역의 넓이가 있을 경우에 설정 */
				}
			};
//			alert("준비완료");
			EditorJSLoader.ready(function(Editor) {				
					var editor = new Editor(config);	
//					var editor2 = new Editor(config2);	 
			});			
			
		}
	
	

