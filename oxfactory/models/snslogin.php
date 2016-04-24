<?php

session_start();

$id = $_POST['id'];
$nickname = $_POST['nickname'];
$pf_img = $_POST['pf_img'];
$test = $_POST['test'];

// echo $id;
// echo $nickname;
// echo $pf_img;

$dom = new DOMDocument('1.0', 'UTF-8');
$response = $dom->createElement('response');
$dom->appendChild($response);

$result = $dom->createElement('id');
$nodeText = $dom->createTextNode($id);
$result->appendChild($nodeText);
$response->appendChild($result);

$result = $dom->createElement('nickname');
$nodeText = $dom->createTextNode($nickname);
$result->appendChild($nodeText);
$response->appendChild($result);

if($id)
{
	
	$connect = mysql_connect('localhost','kyde83','wowwow1537') or die("Couldn't connect!");
	mysql_select_db('kyde83') or die("Couldn't find db");
	
	$query = mysql_query("SELECT * FROM member WHERE id='$id'");
	
	$numrows = mysql_num_rows($query);
		
	
// 	echo $numrow;
	
	if($numrows != 0)
	{
		// id 있는 경우
		$result = $dom->createElement('result');
		$nodeText = $dom->createTextNode("00");
		$result->appendChild($nodeText);
		$response->appendChild($result);
		
		while ($row = mysql_fetch_assoc($query))
		{			
			$dbid = $row['ID'];
			$dbnickname = $row['NICK'];		
			
		}		
		
			$_SESSION['id']=$dbid;
			$_SESSION['nickname']=$dbnickname;
			$_SESSION['test']=$test;
			
			header('Location: https://www.oxfactory.net:41996/oxfactory/views/main.php');
// 			exit;
			
	}else{
			// id 없는 경우
			$connect = mysql_connect('localhost','kyde83','wowwow1537') or die("Couldn't connect!");
			mysql_select_db('kyde83') or die("Couldn't find db");
			
			mysql_query("INSERT INTO member (id, nick, pfimg, reg_date ) VALUES ('$id', '$nickname', '$pfimg',sysdate() )");
			
			$_SESSION['id']=$id;
			$_SESSION['nickname']=$nickname;
			$_SESSION['test']=$test;
			
			header('Location: https://www.oxfactory.net:41996/oxfactory/views/main.php');
// 			exit;
		}
		
		$result = $dom->createElement('id');
		$nodeText = $dom->createTextNode($id);
		$result->appendChild($nodeText);
		$response->appendChild($result);
		
		$result = $dom->createElement('test');
		$nodeText = $dom->createTextNode($test);
		$result->appendChild($nodeText);
		$response->appendChild($result);
		
		$result = $dom->createElement('result');
		$nodeText = $dom->createTextNode("00");
		$result->appendChild($nodeText);
		$response->appendChild($result);
		
		echo $dom -> saveXML();
	}
	else {		
		
		
		// id 실패
		$result = $dom->createElement('result');
		$nodeText = $dom->createTextNode("99");
		$result->appendChild($nodeText);
		$response->appendChild($result);
		
		echo $dom -> saveXML();
		
	}	
	
?>

