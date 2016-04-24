<?php

// $ch = curl_init('http://localhost/oxfactory/models/exam.php?note_idx=268');
$url = "http://localhost:5555/oxfactory/models/note.php?";
$exam_idx = $_GET['note_idx'];
// echo $exam_idx;
$exam_title = $_GET['exam_title'];

$param = http_build_query(array('note_idx'=>$exam_idx));
$ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url.$param);
// Following line is compulsary to add as it is:
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
        $data = curl_exec($ch);
        curl_close($ch);
// 		echo $data;
        //convert the XML result into array
        $array_data = simplexml_load_string($data);        
     	$cnt = count($array_data->data);
     	
//      	echo $data;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<!-- <script src="js/test_view.js"></script> -->

<link rel="stylesheet" href="css/test_view.css" type="text/css" charset="utf-8"/>
<link href='https://dgos7ltvhdxe.cloudfront.net/s3/uswitch-assets-eu/fonts/v18/stylesheet.css' media='all' rel='stylesheet' type='text/css' />

 <script>
 
 $(document).ready(function($) { 

	
		
	  var exam_table  = "";
	        
	  exam_table += "<table width='100%' cellspacing='0' border='0'> ";
	  exam_table += "<tr class='toprow'>";
	  exam_table += "<th>번호</th>";
      exam_table += "<th>문제</th>";
      exam_table += "<th>풀이</th>";
      exam_table += "</tr>";


//      var exam_num = [];
     var content = "";
     
//      var answer = [];
//      var answer_notshuffle = [];
//   	 var answer_shuffle = [];
  	 
//  	 exam_num.push('<? echo $data->rownum ?>');
//	content.push('<? echo $data->content ?>');
//	answer.push('<? echo $data->answer ?>');	
//	answer_notshuffle.push('<? echo $data->answer ?>');
	
	// content = '<? echo $data->content ?>';
	<?php foreach ($array_data->data as $data): ?>
	
	<?php endforeach; ?>

	answer_shuffle = shuffle(answer);

	<? echo $data->content ?>
	
	for ( var int = 0; int < '<? echo $cnt ?>'; int ++) {
          exam_table += "<tr class=\"us-form\">";
//           exam_table += "<td>"+ exam_num[int] +"</td>";
          exam_table += "<td>"+ content[int] +" - "+ answer_shuffle[int] +"</td>";
          exam_table += "<td nowrap=\"nowrap\">";
          exam_table += "<label for=\"row"+ (int+1) +"_radio1\">Yes: </label><input id=\"row"+ (int+1) +"_radio1\" type=\"radio\" name=\"row"+ (int+1) +"_radio\" value=\"yes\" checked=\"checked\" />";
          exam_table += "<label for=\"row"+ (int+1) +"_radio2\">No: </label><input id=\"row"+ (int+1) +"_radio2\" type=\"radio\" name=\"row"+ (int+1) +"_radio\" value=\"no\" />";
          exam_table += "</td>";
          exam_table += "</tr>";  
	}
// 			 exam_table += "<ul class='module left'>";
//			 for ( var int = 0; int < '<? echo $cnt ?>'; int ++) {
// 			 exam_table += "<li>"+ content[int] +"</li>";
// 			 }
// 			 exam_table += "</ul>";
// 			 exam_table += "<ul class='module right'>";
//		    for ( var int = 0; int < '<? echo $cnt ?>'; int ++) {
// 		     exam_table += "<li>"+ answer_shuffle[int] +"</li>";
// 		    }
// 		     exam_table += "</ul>";

// 		     alert(exam_table);
     
      exam_table += "<tr> ";
      exam_table += "<td colspan='3'><input id='check_exam' type='button' value='제출'></td>";
	  exam_table += "</tr>";
      exam_table += "</table>";

// 	alert(exam_table);
    	
	document.getElementById("exam_form").innerHTML = exam_table;
// 	document.getElementById("flowWrap").innerHTML = exam_table;
// 	document.getElementById("flowWrap").appendChild(exam_table);
	
	
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
		
 });


</script>
          
<body>

<table width='100%' cellspacing='0' border='0'>
	<tr>
		<th><?= $exam_title; ?></th>
	</tr>
</table>

<form action="check_exam.php" method="post" >
<div id="exam_form"></div>



</form>     

<!-- <div id="mainWrap"> -->
   
<!--   <div id="flowWrap">     -->
<!--    <ul class='module left'> -->
<!-- 	<li>apple</li> -->
<!--    </ul> -->
<!--    <ul class='module right'> -->
<!--    <li>사과</li> -->
<!--    </ul> -->
<!--   </div> -->
<!--   <div id="output"> -->
<!--     <strong>JSON Output</strong> -->
<!--       <div id="result"> -->
        
<!--       </div> -->
<!--   </div> -->
<!-- </div> -->
   
</body>
</html>