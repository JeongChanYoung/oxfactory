<?php
header("Content-Type: text/xml; charset=UTF-8");

session_start();


// if(isset($_SESSION['id']))
// {
	
	$id = $_SESSION['id'];
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_select_db("kyde83") or die("Couldn't find db");

	$note_idx = $_REQUEST['note_idx'];

	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");
	
// 	$sql = "select title, content from note where note_idx = '$note_idx'";
	$sql = "select title, content, nick from note n left join member m on n.id = m.id where note_idx = '$note_idx'";
	$query = mysql_query($sql);

	$sql2 = "update member set recent = '$note_idx' where id = '$id' ";
	mysql_query($sql2);
	$_SESSION['note_idx'] = $note_idx;
	
	$numrows = mysql_num_rows($query);	

	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);


	
	// 	echo "list.php called";
	// 	echo $numrow;

	if($numrows != 0)
	{

		// 		echo "query result set";

		$result = $dom->createElement('result');
		$nodeText = $dom->createTextNode("00");
		$result->appendChild($nodeText);
		$response->appendChild($result);

		
		while ($row = mysql_fetch_assoc($query))
		{
			
			$content = str_replace("&#39","'",$row['content']);
			
			$data_row = $dom->createElement('data');
			
			$resultNode = $dom->createElement('title');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['title']);
			$resultNode->appendChild($excuteVal);
				
			$resultNode = $dom->createElement('content');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($content);
			$resultNode->appendChild($excuteVal);	

			$resultNode = $dom->createElement('nick');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row['nick']);
			$resultNode->appendChild($excuteVal);
			
			$response->appendChild($data_row);				
		}
		
	}
	
	echo $dom->saveXML();

// }else{
// 	die("username not found");
// }



?>