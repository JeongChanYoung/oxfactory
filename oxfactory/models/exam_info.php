<?php

header("Content-Type: text/xml; charset=UTF-8");
session_start();

if($_SESSION['id'])
{
	$id = $_SESSION['id'];
	
	$q_count = $_REQUEST['q_idx_count'];
	$q_idx_list = $_REQUEST['q_idx_list'];
	$q_idx_array = split (",", $q_idx_list);
				
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");

	mysql_select_db("kyde83") or die("Couldn't find db");

	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);
	
// 	$qcountNode = $dom->createElement('q_cnt');
// 	$response->appendChild($qcountNode);
// 	$excuteVal = $dom->createTextNode($q_cnt);
// 	$qcountNode->appendChild($excuteVal);	
	
	for ($i = 0; $i < $q_count; $i++) {		
		
		$sql = "select count(test_correct) as tcount, sum(test_correct) as tcorrect from test where q_idx='$q_idx_array[$i]' and id='$id'";
		$resultSet = mysql_query($sql);		
		$numrows = mysql_num_rows($resultSet);
		
		$sql2 = "select qtype from question where q_idx='$q_idx_array[$i]'";
		$resultSet2 = mysql_query($sql2);
		
		if($numrows != 0){
			while ($row = mysql_fetch_assoc($resultSet))
			{
				
				$data_row = $dom->createElement('data');
					
				$resultNode = $dom->createElement('q_idx');
				$data_row->appendChild($resultNode);
				$excuteVal = $dom->createTextNode($q_idx_array[$i]);
				$resultNode->appendChild($excuteVal);
				
				$resultNode = $dom->createElement('tcount');
				$data_row->appendChild($resultNode);
				$excuteVal = $dom->createTextNode($row['tcount']);
				$resultNode->appendChild($excuteVal);
				
				$resultNode = $dom->createElement('tcorrect');
				$data_row->appendChild($resultNode);
				$excuteVal = $dom->createTextNode($row['tcorrect']);
				$resultNode->appendChild($excuteVal);
				
				while ($row2 = mysql_fetch_assoc($resultSet2))
				{
					$resultNode = $dom->createElement('qtype');
					$data_row->appendChild($resultNode);
					$excuteVal = $dom->createTextNode($row2['qtype']);
					$resultNode->appendChild($excuteVal);					
				}
				
				$response->appendChild($data_row);
				
				
			}					
		}
	}

	echo $dom->saveXML();
		

}else{
		header('Location: http://www.oxfactory.net');
		exit;
}




?>
