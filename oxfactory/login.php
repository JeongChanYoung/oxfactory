<?php
header("Content-Type: text/xml; charset=UTF-8");
// include "./inc.php";
include "../Require/Conn/dbfunc.php";

session_start();

$username = $_POST['username'];
$password = $_POST['password'];

$mysqli = opendbi();

if($username && $password)
{
	
// 	$connect = mysql_connect('localhost:3306','kyde83','wowwow1537') or die("Couldn't connect!");
// 	mysql_select_db('kyde83') or die("Couldn't find db");
	
	$query = mysql_query("SELECT * FROM member WHERE email='$username'");
	
	$result = $mysqli->query($query);
	
	$numrows = mysql_num_rows($query);
	
// 	echo $numrow;
	
	if($numrows != 0)
	{
		while ($row = mysql_fetch_assoc($query))
		{			
			$dbusername = $row['EMAIL'];
			$dbpassword = $row['PASSWORD'];			
			
		}
		
		// check to see if they match!
		if ($username == $dbusername && $password == $dbpassword)
		{
			echo "You're in! <a href='../views/main.php'>Click</a> here to enter the member page.";
			$_SESSION['username']=$username;
			
		}
		else 
			echo "Incorrect password!";
		
	}
	else 
		die("That user doesn't exist!");
	
}
else{
	
	die("Please enter username and a password");
}

?>

