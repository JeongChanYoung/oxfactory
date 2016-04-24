<?php

session_start();

$id = $_POST['id'];
$password = $_POST['password'];
$nickname = $_POST['nickname'];
$pf_img = $_POST['pf_img'];


if($id && $password)
{
	
	$connect = mysql_connect('localhost','kyde83','wowwow1537') or die("Couldn't connect!");
	mysql_select_db('kyde83') or die("Couldn't find db");
	
	$query = mysql_query("SELECT * FROM member WHERE id='$id'");	
	$numrows = mysql_num_rows($query);
	
	$query2 = mysql_query("select * from note where id='$id' order by reg_date desc limit 1");
	$numrows2 = mysql_num_rows($query2);
// 	echo $numrow;
	
	if($numrows != 0)
	{
		while ($row = mysql_fetch_assoc($query))
		{			
			$dbid = $row['ID'];
			$dbnickname = $row['NICK'];
			$dbpassword = $row['PASSWORD'];			
// 			$dbnoteidx = $row['RECENT'];
			
			
// 			if($row['RECENT'] == null || $row['RECENT'] == 'undefined'){
// 				while ($row2 = mysql_fetch_assoc($query2))
// 				{
// 					$dbnoteidx = $row2['RECENT'];
// 				}
// 			}
			
			
		}
		
		// check to see if they match!
		if ($id == $dbid && $password == $dbpassword)
		{
// 			echo "You're in! <a href='../views/main.php'>Click</a> here to enter the member page.";
			$_SESSION['id']=$dbid;
			$_SESSION['nickname']=$dbnickname;
// 			$_SESSION['note_idx']=$dbnoteidx;
			
			header('Location: https://www.oxfactory.net:41996/oxfactory/views/main.php');
			exit;
			
		}
		else {
// 			echo "Incorrect password!";
			header('Location: https://www.oxfactory.net:41996/oxfactory/views/main.php?reason=pwd');
			exit;
		}
			
		
	}
	else {
		
		
		
		header('Location: https://www.oxfactory.net:41996/oxfactory/views/main.php?reason=id');
		exit;
	}
		
	
}
else{
	
	header('Location: https://www.oxfactory.net:41996/oxfactory/views/main.php?reason=nocontent');
	exit;
}


?>

