<?php

session_start();

$id = $_SESSION['id'];
if(!$_SESSION['id']){
	$id = "";
}
$note_idx = $_GET['note_idx'];
$exam_title = $_GET['exam_title'];
$wrong_times = $_GET['wrong_times'];

// if(isset($_SESSION['id'])){	
// // 	echo 'session isset';	
	
// }else{	
// 	 header('Location: https://www.oxfactory.net:41996?test_type=need_session&note_idx=$note_idx');
//   	exit;
// }

// $ch = curl_init('http://localhost/oxfactory/models/exam.php?note_idx=268');
$url = "https://www.oxfactory.net:41996/oxfactory/models/note.php?";


// $param = http_build_query ( array (
// 		'note_idx' => $note_idx,
// 		'id' => $id
// ) );
// $ch = curl_init ();
// curl_setopt ( $ch, CURLOPT_URL, $url . $param);
// // Following line is compulsary to add as it is:
// curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
// curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, 300 );
// $data = curl_exec ( $ch );
// curl_close ( $ch );
// // echo $data;
// // convert the XML result into array

// $array_data = simplexml_load_string ( $data );


// $cnt = count ( $array_data->data );

// echo $array_data->data->content;

// echo $data;




?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>OX FACTORY</title>
<script	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script	src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<!-- <script src="js/test_view.js"></script> -->

<link rel="stylesheet" href="css/test_view.css" type="text/css"	charset="utf-8" />
<!-- Latest compiled and minified CSS -->

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script	src="js/jquery-scrollto.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>



<script>


 $(document).ready(function($) { 
// 	 alert('hello');

	var nickname = "";

	
	
// 글을 불러온다
	 $.ajax({
			type:"post",
			url:"https://www.oxfactory.net:41996/oxfactory/models/note.php?note_idx="+'<?php echo $note_idx ?>',	
			dataType:"xml",
			success:function(xml){

			
				
			var test_q_idx = '<?php echo $wrong_times ?>';
			test_q_idx = test_q_idx.split(",");	

			
// 			alert('note');
// 				alert($(xml).find('response').find('data').find('content').text());
				$("#exam_content").html($(xml).find('content').text());
// 				document.getElementById("exam_content").innerHTML = $(xml).find('content').text();					
				 
				 nickname = $(xml).find('nick').text();
// 				
// 			    $("#myModal").modal();	
			    	
				var question = [];
				var option1 = [];
				var option2 = [];
				var option3 = [];
				var option4 = [];
				var option5 = [];
				var answer = [];
				var q_idx = [];
				var image_quiz = [];
				var description = [];
				
				
				$("#exam_content").find('.quiz').each(function(){
// 					alert('hello');
//			 		alert($(this).html());
//			 		question.push($(this).html());		
// 					alert($(this).attr('class'));
					
					if($(this).attr('class').includes('image')) {
						image_quiz.push('true');
					}else{
						image_quiz.push('false');
					}
// 					alert(image_quiz);
					
					var is_question = false;
// 			     	alert(test_q_idx[0]);
			     	
						for (var int = 0; int < test_q_idx.length-1; int++) {
							if($(this).attr('q_idx') == test_q_idx[int]){
								 is_question = true;
// 								 alert($(this).attr('q_idx') + "  true");
							}							
						}
			
					if(is_question || test_q_idx[0] == ""){
					

					$(this).find('.question-cell').each(function(){
						question.push($(this).html());
					});

					$(this).find('.txc-table-description').each(function(){
						description.push($(this).html());
					});

					q_idx.push($(this).attr('q_idx'));

					
					$(this).find('.txc-table-option-number').each(function(index,item){
						var temp = $(this).attr('class');
						if(temp.indexOf('answer') != -1) answer.push(index);

					});
					
					$(this).find('.txc-table-option').each(function(index, item){			
//			 			alert(index);
							switch(index){
							case 0:
//			 					alert('0');
								option1.push($(this).html());
								break;
							case 1:
								option2.push($(this).html());
								break;
							case 2:
								option3.push($(this).html());
								break;
							case 3:
								option4.push($(this).html());
// 								alert($(this).html());
								break;
							case 4:
// 								alert($(this).html());
								option5.push($(this).html());
								break;
							default:

								break;
							}							
					});
					
					if($(this).find('.txc-table-option').size() == 2){
						option3.push(null);
						option4.push(null);
						option5.push(null);
					}else if($(this).find('.txc-table-option').size() == 3){
						option4.push(null);
						option5.push(null);
					}else if($(this).find('.txc-table-option').size() == 4){						
						option5.push(null);
					}else if($(this).find('.txc-table-option').size() == 5){						
// 						alert('5');
					}

					}// is_question true
						
				}); 

				for (var int = 0; int < option1.length; int++) {
//			 		alert(option1[int]);
				}

				  var exam_table  = "";

				  for (var int = 0; int < question.length; int++) {


					  exam_table += "<table q_idx='"+ q_idx[int] +"' class='exam_table' width='100%' cellspacing='0' border='0'> ";
					  exam_table += "<tr>";
					  exam_table += "<td class='question' style='padding-top:100px; padding-bottom:100px;' colspan='5'>";
					  exam_table += question[int];
					  exam_table += "</td>";
					  exam_table += "</tr>";					
// 					alert('11111');
// 					alert(image_quiz[int]);
					 if(image_quiz[int] == true){
// 						 alert('222222');
						 exam_table += "<tr>";
					      exam_table += "<td style='width:20%;'>";
					      exam_table += option1[int];
					      exam_table += "</td>";
					      exam_table += "<td style='width:20%;'>";
					      exam_table += option2[int];
					      exam_table += "</td>";
					      
					      if(option3[int] != null && option4[int] == null){
						      exam_table += "<td style='width:20%;'>";
						      exam_table += option3[int];
						      exam_table += "</td>";
					      }else if(option3[int] != null && option4[int] != null ){
						      exam_table += "<td style='width:20%;'>";
						      exam_table += option3[int];
						      exam_table += "</td>";
						      exam_table += "<td style='width:20%;'>";
						      exam_table += option4[int];
						      exam_table += "</td>";
					      }
					      if(option5[int] != null ){
						      exam_table += "<td style='width:20%;'>";
						      exam_table += option5[int];
						      exam_table += "</td>";
						      exam_table += "</tr>";			     
					      }	
					 
					 }else{
// 						 alert('33333');
						 exam_table += "<tr>";
					      exam_table += "<td>";
					      exam_table += option1[int];
					      exam_table += "</td>";
					      exam_table += "<td>";
					      exam_table += option2[int];
					      exam_table += "</td>";
					      exam_table += "</tr>";
					      
					      if(option3[int] != null && option4[int] == null){
					    	  exam_table += "<tr>";
						      exam_table += "<td>";
						      exam_table += option3[int];
						      exam_table += "</td>";
						      exam_table += "</tr>";
					      }else if(option3[int] != null && option4[int] != null ){
					    	  exam_table += "<tr>";
						      exam_table += "<td>";
						      exam_table += option3[int];
						      exam_table += "</td>";
						      exam_table += "<td>";
						      exam_table += option4[int];
						      exam_table += "</td>";
						      exam_table += "</tr>";
					      }
					      if(option5[int] != null ){
					    	  exam_table += "<tr>";
						      exam_table += "<td>";
						      exam_table += option5[int];
						      exam_table += "</td>";
						      exam_table += "</tr>";					     
					      }	
					 }
					  

					  exam_table += "<tr>";
					  exam_table += "<td class='description' style='visibility:hidden; height:0px; padding-top:100px; padding-bottom:100px;' colspan='5'>";
					  exam_table += description[int];
					  exam_table += "</td>";					  
					  exam_table += "</tr>";
				     	     
// 				           alert(option5[int]);
				      exam_table += "</table>";
				}
			      
				 

				document.getElementById("exam_form").innerHTML = exam_table;

				$("img").css({"width":"80%","max-width":"800px"});
// 				$("img").attr('style','width:80%;');
				$(".exam_table").each(function(index,item){

					$(this).find('tr').each(function(index,item){
						if(index > 0){
							$(this).find("td").css({"padding-top":"30px","padding-bottom":"30px"});
							
							$(this).find("td").on("click",function(){

								if($(this).attr('class') != 'question'){
								
								$(this).parent().parent().find("td").css({"background-color":"white","color":"black"});

								$(this).parent().parent().find("td").each(function(){
									if($(this).attr('class') != 'question') $(this).attr('class',null);					
								});
								
								$(this).css({"background-color":"black","color":"white"});
								$(this).attr('class','answer');
								
								
								$(this).parent().parent().parent().next('.exam_table').ScrollTo({
									duration:200,
									easing:'linear'
								});

								

//				 				alert($(this).parent().parent().parent().parent().next());
								
								}
								
							});


						}
					});
					
				});					
					

				var exam_count = 0;
				var exam_right = 0;

				var q_idx_list = "";
				var check_type_list = "";
				
				$("#check").on('click',function(){

					$(".exam_table").each(function(index,item){
						exam_count++;
						var answer_parent_idx = $(this).find(".answer").parent().index();
						var answer_idx = $(this).find(".answer").index();

						if((answer[index]) == ( answer_idx + ((answer_parent_idx-1) * 2) ) ) {
							exam_right++;
//			 				alert('정답');
						}else {
							switch(answer[index]){
							case 0:
								$(this).find("tr").eq(1).find("td:first-child").css({"background-color":"red","color":"white"});
								break;
							case 1:
								$(this).find("tr").eq(1).find("td:last-child").css({"background-color":"red","color":"white"});
								break;
							case 2:
								$(this).find("tr").eq(2).find("td:first-child").css({"background-color":"red","color":"white"});
								break;
							case 3:
								$(this).find("tr").eq(2).find("td:last-child").css({"background-color":"red","color":"white"});
								break;				
							
							}
//			 			alert('오답');
						}			
					}); 

//			 		alert("exam count : " + exam_count);
//			 		alert("right count : " + exam_right);

					alert(exam_count + "문제 중 " + exam_right +"개 맞음");
					
					exam_count = 0;
					exam_right = 0;
				});

				function check(){
					
					$(".exam_table").each(function(index,item){
						exam_count++;
						var answer_parent_idx = $(this).find(".answer").parent().index();
						var answer_idx = $(this).find(".answer").index();

						if((answer[index]) == ( answer_idx + ((answer_parent_idx-1) * 2) ) ) { // 정답
							exam_right++;
							check_type_list += "1,";
							q_idx_list += q_idx[index]+",";
						}else { // 오답
							check_type_list += "0,";
							q_idx_list += q_idx[index]+",";
							switch(answer[index]){
							case 0:
								$(this).find("tr").eq(1).find("td:first-child").css({"background-color":"red","color":"white"});
								break;
							case 1:
								$(this).find("tr").eq(1).find("td:last-child").css({"background-color":"red","color":"white"});
								break;
							case 2:
								$(this).find("tr").eq(2).find("td:first-child").css({"background-color":"red","color":"white"});
								break;
							case 3:
								$(this).find("tr").eq(2).find("td:last-child").css({"background-color":"red","color":"white"});
								break;				
							
							}
//			 			alert('오답');
						}			
					}); 

//			 		alert("exam count : " + exam_count);
//			 		alert("right count : " + exam_right);

					

				}

				$("#submit").one("click",function(){
// 					alert("111111");	
					$(".description").css({"visibility":"visible"});
					check();
// 					alert("222222");	
// 					alert(q_idx_list);
// 					alert(check_type_list);

// 					 var url = "/oxfactory/models/exam_submit.php?q_idx_list="+ q_idx_list +"&check_type_list="+check_type_list;									 
// 					 window.location.href = url;
					
					if('<?php echo $id ?>' == ""){
							$("#nickModal").modal();

							$("#nick_name").on("keyup",function(){

								if($(this).val() != ""){
									$('#add_nickname').removeAttr('disabled');
								}else{
									$('#add_nickname').attr('disabled','disabled');
								}

							});

							
							$("#add_nickname").on("click",function(){

								$("#nick_name").val();
// 								alert($("#nick_name").val());
								nickname = $("#nick_name").val();
								

								$.ajax({			
									type:"post",
									url:"https://www.oxfactory.net:41996/oxfactory/models/exam_submit.php?q_idx_list="+ q_idx_list +"&check_type_list="+check_type_list+"&id="+nickname,	
									dataType:"xml",
									success:function(xml){					

//			 							alert("성공");	
//		 								alert("333333");	
//			 							alert($(xml).find('response').find('share_idx').text());

										var share_idx = $(xml).find('response').find('share_idx').text();
										var share_idx_split = share_idx.split(",");
										var share_content = "";
										for (var int2 = 0; int2 < share_idx_split.length-1; int2++) {
//			 								alert(share_idx_split[int2]);
//			 								$("#exam_content").find(".quiz").each(function(){


												
//			 									if($(this).attr('q_idx') == share_idx_split[int2]){
//			 										alert($(this)[0].outerHTML);
//			 										share_content += $(this)[0].outerHTML;
//			 										share_content += "<br/>";										
//			 									}				
																
//			 								});


//			 								alert($("#exam_content").find("table[q_idx*='"+share_idx_split[int2]+"']")[0].outerHTML);

											share_content += $("#exam_content").find("table[q_idx*='"+share_idx_split[int2]+"']")[0].outerHTML;
										    share_content += "<br />";
										}

//			 							alert(share_content);
//			 							alert($("#exam_title").find('span').html());

										if(share_content != null && share_content != ""){
											$("#solveForm_title").val($("#exam_title").find('span').html());
											$("#solveForm_content").val(share_content);
											$("#solveForm_cnt").val(share_idx_split.length-1);
											var formData = $("#solveForm").serialize();
//		 									alert("44444");	
//				 							$("#solveForm").submit();
//				 							alert(formData);
											$.ajax({			
												type:"post",
												url:"https://www.oxfactory.net:41996/oxfactory/models/add_solve.php",	
												cache : false,
												data : formData,
												dataType:"xml",
												success:function(xml){	
													
//				 									alert("저장 성공");
																						    
													 
												 },	// success end   			
										            error: function(e){
										                alert(e.responseText) ;
										         }			
											});
													
										}
														
										var test_id = [];
										var test_correct = [];
										var test_nick = [];

//			 							var data_length = $(this).find('data').size();
										
//			 		 					 $(xml).find('q_idx').each(function(index, item){
											 
											 
//			 			 					 $(this).find('data').each(function(index, item){
						 						 
//			 			 						 test_id.push($(this).find('id'));
//			 			 						 test_correct.push($(this).find('test_correct'));
//			 			 						 test_nick.push($(this).find('nick'));
//			 			 					 });				                    
//			 		 		              });

//			 		 		              for (var int2 = 0; int2 < data_length; int2++) {
//			 									if(data_length
					
//			 									alert(test_id[int2] + " " + test_correct[int2] + " " + test_nick[int2]);
//			 							}
										$(".modal-title").eq(0).html(nickname+"님의 결과");
//		 								alert($(".modal-title").eq(0).html());
//		 								alert($("#myModal").html());
										var result = "";

										result += "<div id='score'>";

										result += "<div>";
										result += "<ul>";
//			 							result += "<li>";
//			 							result += "난이도 ";
//			 							result += "</li>";
//			 							result += "<li>";
//			 							result += "최고 득점 : ";
//			 							result += "</li>";
//			 							result += "<li>";
//			 							result += "평균 득점 : ";
//			 							result += "</li>";
										result += "<li>";
										result += "나의 득점 : "+ ((exam_right/exam_count)*100).toFixed(0) + "점(" + exam_right + " / " + exam_count + ")";
										result += "</li>";
										result += "</ul>";	
										result += "</div>";

//			 							result += "<div style='background:yellow;'>";
//			 							result += "hello";		
//			 							result += "</div>";
										
										result += "</div>";

										
												
										
										result += "";
										result += "";
										result += "";

										document.getElementById("modal-body").innerHTML = result;

										exam_count = 0;
										exam_right = 0;

										$("#nickModal").modal('toggle');
										$("#myModal").modal();
											
													

										$(".description").css({"visibility":"hidden"});
										$("#submit").html("돌아가기");
										$("#submit").attr('id','submitted');
										$("#submitted").on("click",function(){
											 alert('돌아가기');
						 					 var url = "https://www.oxfactory.net:41996/oxfactory/views/main.php";							 
						 					 window.location.href = url;
											
										});

										
									 },	// success end   			
							            error: function(e){
							                alert(e.responseText) ;
							         }			
								});


								
							});

							
					}else{
						$.ajax({			
							type:"post",
							url:"https://www.oxfactory.net:41996/oxfactory/models/exam_submit.php?q_idx_list="+ q_idx_list +"&check_type_list="+check_type_list+"&id='<?php echo $id ?>'",	
							dataType:"xml",
							success:function(xml){					

//	 							alert("성공");	
// 								alert("333333");	
//	 							alert($(xml).find('response').find('share_idx').text());

								var share_idx = $(xml).find('response').find('share_idx').text();
								var share_idx_split = share_idx.split(",");
								var share_content = "";
								for (var int2 = 0; int2 < share_idx_split.length-1; int2++) {
//	 								alert(share_idx_split[int2]);
//	 								$("#exam_content").find(".quiz").each(function(){


										
//	 									if($(this).attr('q_idx') == share_idx_split[int2]){
//	 										alert($(this)[0].outerHTML);
//	 										share_content += $(this)[0].outerHTML;
//	 										share_content += "<br/>";										
//	 									}				
														
//	 								});


//	 								alert($("#exam_content").find("table[q_idx*='"+share_idx_split[int2]+"']")[0].outerHTML);

									share_content += $("#exam_content").find("table[q_idx*='"+share_idx_split[int2]+"']")[0].outerHTML;
								    share_content += "<br />";
								}

//	 							alert(share_content);
//	 							alert($("#exam_title").find('span').html());

								if(share_content != null && share_content != ""){
									$("#solveForm_title").val($("#exam_title").find('span').html());
									$("#solveForm_content").val(share_content);
									$("#solveForm_cnt").val(share_idx_split.length-1);
									var formData = $("#solveForm").serialize();
// 									alert("44444");	
//		 							$("#solveForm").submit();
//		 							alert(formData);
									$.ajax({			
										type:"post",
										url:"https://www.oxfactory.net:41996/oxfactory/models/add_solve.php",	
										cache : false,
										data : formData,
										dataType:"xml",
										success:function(xml){	
											
//		 									alert("저장 성공");
																				    
											 
										 },	// success end   			
								            error: function(e){
								                alert(e.responseText) ;
								         }			
									});
											
								}
												
								var test_id = [];
								var test_correct = [];
								var test_nick = [];

//	 							var data_length = $(this).find('data').size();
								
//	 		 					 $(xml).find('q_idx').each(function(index, item){
									 
									 
//	 			 					 $(this).find('data').each(function(index, item){
				 						 
//	 			 						 test_id.push($(this).find('id'));
//	 			 						 test_correct.push($(this).find('test_correct'));
//	 			 						 test_nick.push($(this).find('nick'));
//	 			 					 });				                    
//	 		 		              });

//	 		 		              for (var int2 = 0; int2 < data_length; int2++) {
//	 									if(data_length
			
//	 									alert(test_id[int2] + " " + test_correct[int2] + " " + test_nick[int2]);
//	 							}
								$(".modal-title").eq(0).html(nickname+"님의 결과");
// 								alert($(".modal-title").eq(0).html());
// 								alert($("#myModal").html());
								var result = "";

								result += "<div id='score'>";

								result += "<div>";
								result += "<ul>";
//	 							result += "<li>";
//	 							result += "난이도 ";
//	 							result += "</li>";
//	 							result += "<li>";
//	 							result += "최고 득점 : ";
//	 							result += "</li>";
//	 							result += "<li>";
//	 							result += "평균 득점 : ";
//	 							result += "</li>";
								result += "<li>";
								result += "나의 득점 : "+ ((exam_right/exam_count)*100).toFixed(0) + "점(" + exam_right + " / " + exam_count + ")";
								result += "</li>";
								result += "</ul>";	
								result += "</div>";

//	 							result += "<div style='background:yellow;'>";
//	 							result += "hello";		
//	 							result += "</div>";
								
								result += "</div>";

								
										
								
								result += "";
								result += "";
								result += "";

								document.getElementById("modal-body").innerHTML = result;

								exam_count = 0;
								exam_right = 0;

								
									$("#myModal").modal();
									
											

								$(".description").css({"visibility":"visible"});
								$("#submit").html("돌아가기");
								$("#submit").attr('id','submitted');
								$("#submitted").on("click",function(){

// 									 alert('돌아가기');
				 					 var url = "https://www.oxfactory.net:41996/oxfactory/views/main.php";							 
				 					 window.location.href = url;
									
								});

								
							 },	// success end   			
					            error: function(e){
					                alert(e.responseText) ;
					         }			
						});

					}


					


					
					
					
				});

				
				
				
				function shuffle(array) {
				    var counter = array.length, temp, index;

				    // While there are elements in the array
				    while (counter > 0) {
				        // Pick a random index
				        index = Math.floor(Math.random() * counter);

				        // Decrease counter by 1
				        counter--;

				        // And swap the last element with it
				        temp = array[counter];
				        array[counter] = array[index];
				        array[index] = temp;
				    }

				    return array;
				}
					
					
					$("input[id^=check_exam]").on("click",function(){			
					          
					      for (var int2 = 0; int2 < answer.length; int2++) {

								if(answer_shuffle[int2] == answer_notshuffle[int2]){

									if($("input[id^=row"+(int2+1)+"]:checked").val() == "yes"){
										alert("정답");
									}else{
										alert("오답");
									}

								}else{

									if($("input[id^=row"+(int2+1)+"]:checked").val() == "no"){
										alert("정답");
									}else{
										alert("오답");
									}
								}					
						}			
					});


					$("#mail").on("click",function(){

						$.ajax({			
							type:"post",
							url:"https://www.oxfactory.net:41996/oxfactory/views/email.php",	
							dataType:"xml",
							success:function(xml){					

								alert("성공");				
//			 					 $(xml).find('response').each(function(){
//			 		                    var note_num = $(this).find("note_idx").text();
//			 		                    note_idx = note_num;
					                    
//			 		                });
							 },	// success end   			
					            error: function(e){
					                alert(e.responseText) ;
					         }			
						});
					});

					
					$("#btns").css({"display":"block"});
								
			},	// success end   			
	           error: function(e){
	               alert(e.responseText) ;
	           }
					
		});

		
		
 	}); // document ready


</script>


<body>

<form method="post" id="solveForm" style="display:none;">
	<input id="solveForm_title" type="hidden" name="title" />
	<input id="solveForm_content" type="hidden" name="content" />
	<input id="solveForm_cnt" type="hidden" name="quiz_cnt" />
</form> 
<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog" >
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content" style="top:250px">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><?php echo $id?>님 결과</h4>
      </div>
      <div id='modal-body' class="modal-body">
       
      </div>
      <div class="modal-footer">
<!--         <button id="mail" type="button" class="btn btn-default">EMAIL</button> -->
        <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
      </div>
    </div>

  </div>
</div>
<!-- nickname modal -->
<div id="nickModal" class="modal fade" role="dialog" >
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content" style="top:250px">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">닉네임 입력</h4>
      </div>
      
      <div class="modal-body">       
<!--         <form method="post" action="https://www.oxfactory.net:41996/oxfactory/models/add_folder.php" id="folder_form"> -->
        	<input id="nick_name" type="text" name="nick_name" value="" placeholder="닉네임" class="form-control" 
        			style="display:block; width:100%;" />
			
<!-- 		</form>	 -->
      </div>
      
      <div class="modal-footer">
        <button id='add_nickname' qtype='all' type="button" class="btn btn-success" disabled >생성</button>
      </div>
    </div>

  </div>
</div>

	<table width='100%' cellspacing='0' border='0'>
		<tr>
			<th><h1 id='exam_title' style="text-align:center; font-size:50px"><?php echo $exam_title; ?></h1></th>
		</tr>
	</table>

<!-- 	<form action="check_exam.php" method="post"> -->

		<div style="display:none; text-align:center; " id="exam_content"></div>		
		
		<div id="exam_form"></div>
		
		
<!-- 	</form> -->
	
	<div id="btns" style="display:none;">
	<!--<button href='#' id='check' class='btn btn-success' style='padding-right:50px;' >채점</button>-->
	<button href='#' id='submit' class='btn btn-success' style="font-size:x-large;width:200px; height:80px;"  >제출</button>
	</div>

</body>
</html>