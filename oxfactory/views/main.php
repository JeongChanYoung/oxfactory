<?php

session_start();

$id = $_SESSION['id'];
$nickname = $_SESSION['nickname'];
$test = $_SESSION['test'];
// $note_idx = $_SESSION['note_idx'];
// echo $id;
// echo $nickname;
// echo $note_idx;

if(isset($_SESSION['id'])){	
// 	echo 'session isset';	
	if($_SESSION['test'] != null){
		$temp = $_SESSION['test'];
		header('Location: https://www.oxfactory.net:41996/oxfactory/views/test_view.php?note_idx=$temp');
		exit;
	}
}else{	
	 header('Location: https://www.oxfactory.net:41996');
  	exit;
}
// function getNote_idx(){
// 	return $note_idx;
// }
function userId(){	
// 	alert($id);
	return $_SESSION['id'];	
}
function username(){
	
	if($_SESSION['nickname']){
		return $_SESSION['nickname'];
	}else{
		return $id;
	}
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no" >


<title>OX Factory</title>
<!-- <script src="js/editor_loader.js" type="text/javascript" charset="utf-8"></script> -->

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

 <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>



 <link rel="stylesheet" href="https://www.oxfactory.net:41996/oxfactory/views/css/main.css" type="text/css" charset="utf-8"/>
 <link rel="stylesheet" href="https://www.oxfactory.net:41996/oxfactory/views/css/oxfac.css" type="text/css" charset="utf-8"/>
 <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

<!-- hammer swipe -->
<script src="https://hammerjs.github.io/dist/hammer.js"></script>

<!-- kako sdk -->
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>

<!-- <script src="js/editor.js"></script> -->
<script src="https://www.oxfactory.net:41996/oxfactory/views/js/main.js"></script>

<script src="https://www.oxfactory.net:41996/oxfactory/views/js/trigonometry.js"></script>
<script src="https://www.oxfactory.net:41996/oxfactory/views/js/modernizr.custom.34982.js"></script>
<script src="https://www.oxfactory.net:41996/oxfactory/views/js/oxfac.js"></script>
<script src="https://www.oxfactory.net:41996/tinymce/tinymce.min.js"></script>

<script src="https://www.oxfactory.net:41996/tinymce/jquery.iframe-post-form.js"></script>
<script	src="https://www.oxfactory.net:41996/oxfactory/views/js/jquery-scrollto.js"></script>

<!-- <script src="../../ckeditor/ckeditor.js"></script> -->
<!-- toastr -->
<script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.js"></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.css">


<!-- <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" /> -->
<!-- <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script> -->
<script src="https://www.oxfactory.net:41996/oxfactory/views/js/jquery.mobile-1.4.5.min.js"></script>

 <link rel="stylesheet" href="css/circle-menu.min.css">

 
</head>



<body id="body" >
 
<form method="post" id="myForm" style="display:none;">
	<input id="myForm_article_title" type="hidden" name="tx_article_title" />
	<input id="myForm_content" type="hidden" name="content" />
	<input id="myForm_note_idx" type="hidden" name="note_idx" />
</form> 
<form method="post" id="qForm" style="display:none;">
	<input id="qForm_q_idx_null" type="hidden" name="q_idx_null" />
</form>
 
<div style="display:none;" id="cell">userId()</div>

<!-- <a id="kakao-link-btn" href="javascript:;"> -->
<!--       <img src="http://dn.api1.kage.kakao.co.kr/14/dn/btqa9B90G1b/GESkkYjKCwJdYOkLvIBKZ0/o.jpg" /> -->
<!--     </a> -->
<script>

    Kakao.init('4b465d5c0d952c2fd92afb4912ce4bc9');
    
    </script>
<div id="header" >
 <div id='logo'>
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/oxfactory-main.svg" />
 	<div id="profile" ><a href="../models/logout.php" style="color:black;">로그아웃</a></div>
 </div>
<!--  <div id="hamberg" class="menu btn13" data-menu="5" style="top:-12px;">-->
<!--         <div class="icon"></div> -->
<!--       </div> -->
 <div id="hamberg">
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/hamberg.svg" /> 	
 </div>
 <div id="note_add">
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/note_add.svg" />
 </div>
 <div id="folder_add">
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/folder_add.svg" />
 </div>
 <div id="save_note" >
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/save_note.svg" />
 </div>
 <div id="camera">
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/camera.svg" />
 </div>
 <div id="oxfactory">
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/Factory.svg" />
 </div>
 <div id="template">
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/template.svg" />
 </div>
  <div id="mypage">
 	<img src="https://www.oxfactory.net:41996/oxfactory/views/img/profile.svg" />
 </div>
</div>

<div >

 <div id="side_nav">
   <ul>
     <li>
     <div class="nav_icon">
     <a href="#">     
	 <img src="https://www.oxfactory.net:41996/oxfactory/views/img/add_button.svg" />	  
     </a> 
     </div>    
     </li>     
     <li>
     <div class="nav_icon">
     <a href="#">
     <img src="https://www.oxfactory.net:41996/oxfactory/views/img/search_button.svg" />
     </a>  
     </div>  
     </li>
     <li>
     <div class="nav_icon">
     <a href="#">
     <img src="https://www.oxfactory.net:41996/oxfactory/views/img/share_button.svg" />
     </a>  
     </div>  
     </li>
     
   </ul>    
 </div>
  
  <nav id="c-circle-nav" class="c-circle-nav">
  <button id="c-circle-nav__toggle" class="c-circle-nav__toggle" style="border-radius:50px;">
    <span>Toggle</span>
  </button>
  <ul class="c-circle-nav__items">
    <li class="c-circle-nav__item">
      <a href="#" class="c-circle-nav__link">
        <img src="img/note_add.svg" alt="">
      </a>
    </li>
    <li class="c-circle-nav__item">
      <a href="#" class="c-circle-nav__link">
        <img src="https://www.oxfactory.net:41996/oxfactory/views/img/hamberg.svg" alt="">
      </a>
    </li>
    <li class="c-circle-nav__item">
      <a href="#" class="c-circle-nav__link">
        <img src="img/template.svg" alt="">
      </a>
    </li>
    <li class="c-circle-nav__item">
      <a href="#" class="c-circle-nav__link">
        <img src="img/camera.svg" alt="">
      </a>
    </li>
    <li class="c-circle-nav__item">
      <a href="#" class="c-circle-nav__link">
        <img src="img/Factory.svg" alt="">
      </a>
    </li>
    
  </ul>
</nav>

<script src="js/circleMenu.min.js"></script>

 <div id="menu_controller">
 <div id="side_search" style="display:none; overflow-x:hidden; overflow-y:auto;">
  <div id="dir" class="swipe">
    <div id="dir_title"></div> 
    <div id="dir_content" class="swipe-wrap">
    </div>    
  </div>  
 </div>
 </div>
 
 </div>

<!-- <form method="POST" action="/oxfactory/models/register.php" id="tiny_form"  -->
<!-- 			enctype="multipart/form-data"> -->
 	 <textarea id='tiny_content'></textarea>
<!-- </form> -->
 	 
 	 
 	 
 <!-- 	 
	<iframe id="form_target" name="form_target" style="display:none"></iframe>
	<form id="my_form" action="/upload/" target="form_target" method="post" enctype="multipart/form-data" style="width:0px;height:0;overflow:hidden">
 	    <input name="image" type="file" onchange="$('#my_form').submit();this.value='';"> -->
<!-- 	</form> -->

 	 
 	 
 
 
 <div id='mobile_note'>
   
 </div>
 
           
            
 <style>
 .tx-list{
 position:absolute;
 float:left;
 }
 
 </style>
 
<!--  <div id="mouse_status"></div> -->
<!--  <div id="mouse_status_iframe"></div> -->
  
<!--  <div id="fb-root"></div> -->
 

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog" >
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content" style="top:250px">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">문제 풀기</h4>
      </div>
      
      <div class="modal-body">       
        <form method="post" action="https://www.oxfactory.net:41996/oxfactory/views/test_view.php" id="exam_form">
        	<input id="question_choice" type="hidden" name="question_choice" value="" />
			<table class="txc-table" width="673px" cellspacing="0" cellpadding="0"	border="0"	style="border: none; border-collapse: collapse; font-family: verdana; font-size: 16px; width: 100%;">
				<tbody>
					<tr>
						<td	style="width: 672px; height: 52px; border: 1px solid rgb(204, 204, 204);"
							rowspan="1" colspan="4"><p id="modal_title" style="text-align: center;">토익
								보카 1일차</p></td>
					</tr>
					<tr>
						<td
							style="width: 166px; height: 51px; border: 1px solid rgb(204, 204, 204);"
							rowspan="1"><p id="modal_total_question_cnt" style="text-align: center;">총40문제</p></td>
						<td
							style="width: 507px; height: 51px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);"
							rowspan="1" colspan="3"><p id="modal_question_compose" style="text-align: center;">
							OX형(10) / 객관식(10) </p></td>
					</tr>
					<tr>
						<td class="modal_question_choice all"
							style="width: 166px; height: 73px; border: 1px solid rgb(204, 204, 204);"><p
								style="text-align: center;">전체문제</p></td>
						<td class="modal_question_choice one"
							style="width: 166px; height: 73px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);"><p
								style="text-align: center;">1번 이상</p>
							<p style="text-align: center;">
								<span id='one_above' style="font-size: 12pt; line-height: 1.5;">틀린문제(10)
							</p></td>
						<td class="modal_question_choice two"
							style="width: 166px; height: 73px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);"><p
								style="text-align: center;">2번 이상</p>
							<p style="text-align: center;">
								<span id='two_above' style="font-size: 12pt; line-height: 1.5;">틀린문제(5)</span>
							</p></td>
						<td class="modal_question_choice three"
							style="width: 175px; height: 73px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);"><p
								style="text-align: center;">3번 이상</p>
							<p style="text-align: center;">
								<span id='three_above' style="font-size: 12pt; line-height: 1.5;">틀린문제(2)</span>
							</p></td>
					</tr>
<!-- 					<tr> -->
<!-- 						<td -->
							<!--style="width: 166px; height: 51px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204);"><p-->
						<!--		style="text-align: center;">전체풀이 횟수(30)</p></td>-->
<!-- 						<td -->
							<!--style="width: 166px; height: 51px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);"><p-->
						<!--		style="text-align: center;">나(10)</p></td>-->
<!-- 						<td -->
							<!--style="width: 166px; height: 51px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);"><p-->
						<!--		style="text-align: center;">다른 사람(20)</p></td>-->
<!-- 						<td -->
							<!--style="width: 175px; height: 51px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);"><p-->
						<!--		style="text-align: center;">-->
<!-- 								<br> -->
<!-- 							</p></td> -->
<!-- 					</tr> -->
					<tr>
							<td
							style="width: 672px; height: 50px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204);"
							colspan="4" rowspan="1"><p id="modal_answer_portion" style="text-align: center;">정답율
								80%</p>
							</td>
						</tr>
					</tbody>
				</table>
		</form>	
      </div>
      
      <div class="modal-footer">
        <button id='test_start' qtype='all' type="button" class="btn btn-success" data-dismiss="modal">풀기</button>
      </div>
    </div>

  </div>
</div>
  <div id="folderModal" class="modal fade" role="dialog" >
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content" style="top:250px">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">폴더 생성</h4>
      </div>
      
      <div class="modal-body">       
<!--         <form method="post" action="https://www.oxfactory.net:41996/oxfactory/models/add_folder.php" id="folder_form"> -->
        	<input id="folder_name" type="text" name="folder_name" value="" placeholder="폴더 이름" class="form-control" 
        			style="display:block; width:100%;" />
			
<!-- 		</form>	 -->
      </div>
      
      <div class="modal-footer">
        <button id='add_folder' qtype='all' type="button" class="btn btn-success" >생성</button>
      </div>
    </div>

  </div>
</div>


</body>

</html>