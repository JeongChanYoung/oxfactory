<?php
header("Content-Type: text/xml; charset=UTF-8");
session_start();

if($_SESSION['id'])
{
	$id = $_SESSION['id'];
	$note_idx = $_GET['note_idx'];
	// 	$username = "redhotjjang@gmail.com";
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_select_db("kyde83") or die("Couldn't find db");

	$result = mysql_query("delete from note where id = '$id' and note_idx = '$note_idx'");

	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);
	
	echo $dom->saveXML();
	
// 	if($result){
		
// 		echo "delete success";
// 	}
	
}

?>