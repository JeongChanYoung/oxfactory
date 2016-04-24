<?php

session_start();

$id = $_SESSION['id'];
if(isset($_SESSION['id'])){
	echo 'session isset';
}else{
	header('Location: http://www.oxfactory.net/index.php');
	exit;
}

$url = "https://www.oxfactory.net:41996/oxfactory/models/list.php?";
$note_idx = $_GET ['note_idx'];
$exam_title = $_GET ['exam_title'];

$param = http_build_query ( array (
		'note_idx' => $note_idx ,
		'id' => $id
) );
$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_URL, $url . $param );
// Following line is compulsary to add as it is:
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, 300 );
$data = curl_exec ( $ch );
curl_close ( $ch );
// echo $data;
// convert the XML result into array

$array_data = simplexml_load_string ( $data );

$cnt = count ( $array_data->data );

?>



<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Insert title here</title>

 <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
 <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" /> 
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="css/oxfactory.css">
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

</head>
<script>
$(document).ready(function(){

	var dir = [];    // 노트별 전체경로	    
	var title = [];  // 노트제목
	var seq = [];    // 노트번호	
	
	 trans_dir(dir,title,seq);
		
// 	    // 폴더 이동
	    function trans_dir(dir,title,seq){    	
			
	    	var dir = [];    // 노트별 전체경로	    
			var title = [];  // 노트제목
			var seq = [];    // 노트번호	
			var reg_date = []; 
			var exam = [];
			var quiz_count = [];
			
			// 디렉토리, 제목, 글번호 리프레쉬		
			$.ajax({
						type:"post",
						url:"https://www.oxfactory.net:41996/oxfactory/models/list.php?id="+ '<?php echo $id ?>' ,
						dataType:"xml",
						success:function(xml){	

// 							alert("hello");
							 $(xml).find('response').find('data').each(function(){

										               				                    
				                    dir.push($(this).find("directory").text()); 
							   		title.push($(this).find("title").text());
							   		seq.push($(this).find("note_idx").text());	
									reg_date.push($(this).find("reg_date").text());
									quiz_count.push($(this).find("quiz_cnt").text());
									alert($(this).find("title").text());

						            });


					          var inner = "";

 							  inner += "<ul>";
								
					          for (var int = 0; int < title.length; int++) {
								  inner += "<li>";
					        	  inner += "<div class='oxfactory_note'>";
					        	  inner += "	 <div class='coversheet'>";
					        	  inner += "	   <div class='oxfactory_title'>";
					        	  inner += title[int];   
					        	  inner += "   </div>";
					        		 
					        	  inner += "	 </div>";
					        	  inner += "	 <div class='xbox'></div>";
					        	  inner += "	</div>";
					        	  inner += "</li>";
									
							}
								inner += "</ul>";
// 							alert(inner);
				            document.getElementById("oxfactory_list").innerHTML = inner;						 			 

// 				            $("#oxfactory_list").find("li").each(function(){
// // 								alert("kk");
// 				            	$(this).css({"visibility":"hidden"});
// 				            });
				            
							$("#oxfactory_list").find("li").each(function(index, item){

								$(this).eq(index).animate({"opacity":"1"},1000);

							});

// 							$("#oxfactory_list").find("li").eq(0).animate({"display":"visible"},1000,function(){

// 								$(this).next().animate({"display":"visible"},500);
								
// 								});

				            $('.coversheet').on("mouseover",function(){	
								
//						 		$(this).show();
								$(this).animate({'background-color':'green','opacity':'0.4'},400);		
								
							});
							
							$('.coversheet').on("mouseout",function(){
								
								$(this).stop();
								$(this).animate({"color":"black",'background-color':'transparent','opacity':'1'},100);
//						  		$(this).find(".oxfactory_title").css({"color":"black","opacity":"1"});
//						 		$(this).hide();
							});
							 
						},	// success end   			
			            error: function(e){
			                alert(e.responseText) ;
			            }
					});



			
			
		}
			
});


</script>


<body>

<div id='oxfactory_list'>
	<div class='oxfactory_note'>
	 <div class='coversheet'>
	   <div class='oxfactory_title'>
	   	영어   
	   </div>
	 
	 </div>
	 <div class='xbox'></div>
	</div>
</div>


</body>
</html>