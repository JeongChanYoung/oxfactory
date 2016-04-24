<?php

header("Content-Type: text/xml; charset=UTF-8");
session_start();

if($_SESSION['id'])
{
	$id = $_SESSION['id'];
	$note_idx = $_REQUEST['note_idx'];
	
	$title = $_REQUEST['tx_article_title'];
	$content = stripslashes($_REQUEST['content']);
	$image = $_REQUEST['attach_image'];
	
	// 	$content = urldecode($_GET['content']);
		
// 	$title = "";
// 	// 	echo $content;
// 	// 	echo strpos($content, "<");
// 	if(strpos($content, "<p") == 0){
// 		// 		echo $content;
// 		$title = substr($content,0, strpos($content,"</p>")+4);

// 		// 		echo $title;
// 	}

	$quiz_cnt = 0;
	$quiz_cnt = substr_count($content,"txc-table quiz");
		
	
	$content = str_replace("'","&#39",$content);
	
// 	str_replace("txc-table quiz ")
	
	// 	$username = "redhotjjang@gmail.com";
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");

	mysql_select_db("kyde83") or die("Couldn't find db");
	
	mysql_query("update note set content='$content' , title='$title',  quiz_cnt='$quiz_cnt', chg_date=sysdate() where note_idx='$note_idx'");
	
	$_SESSION['note_idx'] = $note_idx;
	


}else{
		header('Location: https://www.oxfactory.net:41996/oxfactory/views/main.php');
		exit;
}




?>
