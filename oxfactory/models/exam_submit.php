<?php

header("Content-Type: text/xml; charset=UTF-8");
session_start();

// if($_SESSION['id'])
// {
	if($_SESSION['id']){
	$id = $_SESSION['id'];
	}else{		
	$id = $_GET['id'];
	}
	$note_idx = $_REQUEST['note_idx'];
	
	$q_idx_list = $_REQUEST['q_idx_list'];
	$check_type_list = $_REQUEST['check_type_list'];
	
	$q_idx_split = split (",", $q_idx_list);
	$check_type_split = split (",", $check_type_list);
				
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");

	mysql_select_db("kyde83") or die("Couldn't find db");

	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);
	
		
	$share_qidx = "";
	
	for ($i = 0; $i < count($q_idx_split)-1; $i++) {
		
		$sql = "insert into test (q_idx, id, test_correct) values ('$q_idx_split[$i]','$id','$check_type_split[$i]')";
		mysql_query($sql);
		
		$check_type = 0;
		if($check_type_split[$i] == '1') $check_type = 1;
			
		$sql2 = "update question set sol_cnt = sol_cnt + 1, cor_cnt = cor_cnt + '$check_type' where q_idx='$q_idx_split[$i]'";
		mysql_query($sql2);
		
// 		$sql3 = " select p.*, m.nick from "
// 			 ." (select * from test order by reg_date asc) p "
// 			." join member m "
// 			." on p.id = m.id "
// 			." where q_idx = '$q_idx_split[$i]' "
// 			." group by id ";
					
// 		$query = mysql_query($sql3);
		
// 		$numrows = mysql_num_rows($query);
		
// 		$share_q_idxNode = $dom->createElement('share_q_idx');
// 		$response->appendChild($share_q_idxNode);
		
// 		$excuteVal = $dom->createTextNode($q_idx_split[$i]);
// 		$q_idxNode->appendChild($excuteVal);
		
// 		if($numrows != 0){
// 			while ($row = mysql_fetch_assoc($query))
// 			{
					
// 				$dataNode = $dom->createElement('data');
			
// 				$resultNode = $dom->createElement('id');
// 				$dataNode->appendChild($resultNode);
// 				$excuteVal = $dom->createTextNode($row['ID']);
// 				$resultNode->appendChild($excuteVal);
			
// 				$resultNode = $dom->createElement('test_correct');
// 				$dataNode->appendChild($resultNode);
// 				$excuteVal = $dom->createTextNode($row['TEST_CORRECT']);
// 				$resultNode->appendChild($excuteVal);
			
// 				$resultNode = $dom->createElement('nick');
// 				$dataNode->appendChild($resultNode);
// 				$excuteVal = $dom->createTextNode($row['nick']);
// 				$resultNode->appendChild($excuteVal);
			
				
				
// 				$q_idxNode->appendChild($dataNode);
					
// 			}
			
// 			$resultNode = $dom->createElement('numrows');
// 			$dataNode->appendChild($resultNode);
// 			$excuteVal = $dom->createTextNode($numrows);
// 			$resultNode->appendChild($excuteVal);
			
		
		
		
// 		}
		
		$sql4 = "select id from question where q_idx='$q_idx_split[$i]'";
		$query = mysql_query($sql4);
		
		
		while($row2 = mysql_fetch_assoc($query)){
			
			if($id != $row2['id']){
				
				$share_qidx .= $q_idx_split[$i].",";
			}else{
// 				$share_qidx .= $q_idx_split[$i].",";
			}		

		}
		
		
// 		$data_row = $dom->createElement('data');
			
// 		$resultNode = $dom->createElement('nextId');
// 		$data_row->appendChild($resultNode);
// 		$excuteVal = $dom->createTextNode($nextId);
// 		$resultNode->appendChild($excuteVal);
		
// 		$resultNode = $dom->createElement('q_cnt');
// 		$data_row->appendChild($resultNode);
// 		$excuteVal = $dom->createTextNode($i);
// 		$resultNode->appendChild($excuteVal);
		
// 		$response->appendChild($data_row);

		
	}

// 		$data_row = $dom->createElement('data');
	

		$resultNode = $dom->createElement('share_idx');
		$response->appendChild($resultNode);
		$excuteVal = $dom->createTextNode($share_qidx);
		$resultNode->appendChild($excuteVal);
	
		
	echo $dom->saveXML();
		

// }else{
// 		header('Location: http://www.oxfactory.net');
// 		exit;
// }




?>
