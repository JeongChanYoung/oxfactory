<?php
header("Content-Type: text/xml; charset=UTF-8");

session_start();


if(isset($_SESSION['id']))
{
	
	$id = $_SESSION['id'];
	$connect = mysql_connect("localhost","kyde83","wowwow1537") or die("Couldn't connect!");
	mysql_select_db("kyde83") or die("Couldn't find db");

	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");
	
	$sql = "select recent from member where id = '$id' ";
	$query = mysql_query($sql);
	
	while ($row = mysql_fetch_assoc($query))
	{
		$note_idx = $row['recent'];	
	}
	
	$sql2 = "select title, content, nick from note n left join member m on n.id = m.id where note_idx = '$note_idx'";
	$query2 = mysql_query($sql2);

	$sql2 = "update member set recent = '$note_idx' where id = '$id' ";
	mysql_query($sql2);
	$_SESSION['note_idx'] = $note_idx;
	
	$numrows = mysql_num_rows($query2);	

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

		
		while ($row2 = mysql_fetch_assoc($query2))
		{
			$data_row = $dom->createElement('data');
			
			$resultNode = $dom->createElement('title');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row2['title']);
			$resultNode->appendChild($excuteVal);
				
			$resultNode = $dom->createElement('content');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row2['content']);
			$resultNode->appendChild($excuteVal);	

			$resultNode = $dom->createElement('nick');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($row2['nick']);
			$resultNode->appendChild($excuteVal);
			
			$resultNode = $dom->createElement('note_idx');
			$data_row->appendChild($resultNode);
			$excuteVal = $dom->createTextNode($note_idx);
			$resultNode->appendChild($excuteVal);
			
			$response->appendChild($data_row);				
		}
		
	}
	
	echo $dom->saveXML();

}else{
	die("username not found");
}



?>