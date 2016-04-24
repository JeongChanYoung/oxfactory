<?php

header("Content-Type: text/xml; charset=UTF-8");
session_start();

if($_SESSION['id'])
{
	$id = $_SESSION['id'];
	$note_idx = $_REQUEST['note_idx'];
	
	$q_cnt = $_REQUEST['q_idx_null'];
// 	$q_idx_null = split (",", $q_idx);
				
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");

	mysql_select_db("kyde83") or die("Couldn't find db");

	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);
	
	$qcountNode = $dom->createElement('q_cnt');
	$response->appendChild($qcountNode);
	$excuteVal = $dom->createTextNode($q_cnt);
	$qcountNode->appendChild($excuteVal);	
	
	for ($i = 0; $i < $q_cnt; $i++) {
		
		$result = mysql_query("SHOW TABLE STATUS LIKE 'question'");
		$row = mysql_fetch_array($result);
		$nextId = $row['Auto_increment'];		
		
		$data_row = $dom->createElement('data');
			
		$resultNode = $dom->createElement('nextId');
		$data_row->appendChild($resultNode);
		$excuteVal = $dom->createTextNode($nextId);
		$resultNode->appendChild($excuteVal);
		
		$resultNode = $dom->createElement('q_cnt');
		$data_row->appendChild($resultNode);
		$excuteVal = $dom->createTextNode($i);
		$resultNode->appendChild($excuteVal);
		
		$response->appendChild($data_row);
		
		$sql = "insert into question (id) values ('$id')";
		mysql_query($sql);	

	}

	echo $dom->saveXML();
		

}else{
		header('Location: http://www.oxfactory.net');
		exit;
}




?>
