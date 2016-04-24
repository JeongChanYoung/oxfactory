<?php
header("Content-Type: text/xml; charset=UTF-8");
session_start();

if($_SESSION['id'])
{
	$id = $_SESSION['id'];
	
	$title = $_POST['title'];
	$content = stripslashes($_POST['content']);
	$quiz_cnt = $_POST['quiz_cnt'];
// 	$username = "redhotjjang@gmail.com";
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_select_db("kyde83") or die("Couldn't find db");

	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");
	
	$content = str_replace("'","&#39",$content);
	
// 	$quiz_cnt = 0;
// 	$quiz_cnt = substr_count($content,"txc-table quiz");
	
	
	mysql_query("insert into note (id, directory, auth, title, content, reg_date) 
			values('$id','/','{auth:$id,dir:/}', '$title', '$content', sysdate()) ");
		
	$query = mysql_query("select max(note_idx) as note_idx from note where id='$id'");	
	$row = mysql_fetch_assoc($query);
	
	$note_idx = $row['note_idx'];

	mysql_query("update note set quiz_cnt='$quiz_cnt' where note_idx='$note_idx'");
	
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