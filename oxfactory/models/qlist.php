<?php
header("Content-Type: text/xml; charset=UTF-8");

session_start();

if($_SESSION['id'])
{
	$id = $_SESSION['id'];
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_select_db("kyde83") or die("Couldn't find db");
	
	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");
	
	$note_idx = $_REQUEST['note_idx'];
	
	$sql = "select q_idx from question where note_idx = '$note_idx'";
	
		
	$query = mysql_query($sql);	
	
	$numrows = mysql_num_rows($query);
	
	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);
		
	
	if($numrows != 0)
	{
		
// 		echo "query result set";
		
		$result = $dom->createElement('result');
		$nodeText = $dom->createTextNode("00");
		$result->appendChild($nodeText);
		$response->appendChild($result);
				
		
		$total = $dom->createElement('total');
		$nodeText = $dom->createTextNode($numrows);
		$total->appendChild($nodeText);
		
		$response->appendChild($total);
				
		
		while ($row = mysql_fetch_assoc($query))
		{					
			
			$data_row = $dom->createElement('data');
			$resultNode = $dom->createElement('note_idx');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['note_idx']);			
			$resultNode->appendChild($excuteVal);			
			
// 			$resultNode = $dom->createElement('exam');
// 			$data_row->appendChild($resultNode);
// 			$excuteVal = $dom->createTextNode($numrows2);
// 			$resultNode->appendChild($excuteVal);
			
			$resultNode = $dom->createElement('id');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['id']);
			$resultNode->appendChild($excuteVal);
			
			$resultNode = $dom->createElement('directory');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['directory']);
			$resultNode->appendChild($excuteVal);
			
			$resultNode = $dom->createElement('auth');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['auth']);
			$resultNode->appendChild($excuteVal);
			
// 			echo $row['title'];
			$resultNode = $dom->createElement('title');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['title']);
			$resultNode->appendChild($excuteVal);
			
			$resultNode = $dom->createElement('reg_date');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['reg_date']);
			$resultNode->appendChild($excuteVal);
			
			$resultNode = $dom->createElement('chg_date');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['chg_date']);
			$resultNode->appendChild($excuteVal);
			
			$resultNode = $dom->createElement('quiz_cnt');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['quiz_cnt']);
			$resultNode->appendChild($excuteVal);
			
			$response->appendChild($data_row);
			
		}		
		
		
	}
	
}else{
	die('id not found');
}

$xmlString = $dom->saveXML();

echo $xmlString;

?>