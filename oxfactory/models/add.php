<?php
header("Content-Type: text/xml; charset=UTF-8");
session_start();

if($_SESSION['id'])
{
	$id = $_SESSION['id'];
	$dir = $_GET['directory'];
// 	$username = "redhotjjang@gmail.com";
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_select_db("kyde83") or die("Couldn't find db");

	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");
	
// 	mysql_query("delete from note where id='$id' and content is NULL ");

	mysql_query("insert into note (id, directory, auth, reg_date) 
			values('$id','$dir','{auth:$id,dir:/}', sysdate()) ");

// 	mysql_query("update note set directory='$dir' where note_idx='$note_idx'");
	
	$query = mysql_query("select max(note_idx) as note_idx from note where id='$id'");	
	$row = mysql_fetch_assoc($query);
	
	$note_idx = $row['note_idx'];

	$sql2 = "update member set recent = '$note_idx' where id = '$id' ";
	mysql_query($sql2);
	$_SESSION['note_idx'] = $note_idx;
	
// 	echo $note_idx;
	// XML 문서의 버전은 1.0, 인코딩 방식은 UTF-8을 사용
	$dom = new DOMDocument('1.0', 'UTF-8');
	
	// response 최상위 항목 생성
	$response = $dom->createElement('response');
	
	// XML 문서에 response 추가 (최상위 노드가 됨)
	$dom->appendChild($response);
	
	$resultNode = $dom->createElement('note_idx');
	$response->appendChild($resultNode);
	$excuteVal = $dom->createTextNode($note_idx);
	$resultNode->appendChild($excuteVal);
		
	$resultNode = $dom->createElement('id');
	$response->appendChild($resultNode);
	$excuteVal = $dom->createTextNode($id);
	$resultNode->appendChild($excuteVal);
	
	// XML 파일 저장
	
	$xmlString = $dom->saveXML();
	
	echo $xmlString;
	
}

?>