<?PHP
include('/home/hosting_users/nowmarketing/www/apps/log4php/Logger.php');
Logger::configure('/home/hosting_users/nowmarketing/www/apps/log4php/config.xml');
$g_log = Logger::getLogger('webLogger'); 
$ad_log = Logger::getLogger('adLogger');
$angel_ad_log = Logger::getLogger('angelAdLogger');
$mc_log = Logger::getLogger('mcLogger');
$d_log = Logger::getLogger('devLogger');
$ext_log = Logger::getLogger('extAdLogger');
$chun_log = Logger::getLogger('chunLogger');
$ka_ext_log = Logger::getLogger('kaExtLogger');
$pick_log = Logger::getLogger('pickLogger');
$catch_log = Logger::getLogger('catchLogger');


include "global.php";

function db_connect ()
{
	global $db_userid, $db_password, $db_name;

	if (!($link = mysql_connect ("localhost",$db_userid,$db_password)))
	{
		echo mysql_error($link)." db connect error.<br>\n";
		exit;
	}
	if (!mysql_select_db ($db_name, $link))
	{
		echo mysql_error($link)." db select error.<br>\n";
		exit;
	}
	
	mysql_query("set session character_set_connection=utf8;");
	
	mysql_query("set session character_set_results=utf8;");
	
	mysql_query("set session character_set_client=utf8;");
	
	
	
	return $link;
}

function db_disconnect ($link)
{
	mysql_close ($link);
}

// mysqli 형식의 DB 접근
function opendbi() {
	global $db_ip, $db_userid, $db_password, $db_name;

	$link = @mysqli_connect($db_ip, $db_userid, $db_password, $db_name);
// 	@mysqli_query($link, "set session character_set_connection=utf8;") or die("character_set Error");
// 	@mysqli_query($link, "set session character_set_results=utf8;") or die("character_set Error");
// 	@mysqli_query($link, "set session character_set_client=utf8;") or die("character_set Error");
	//@mysqli_query($link, "set session time_zone=Asia/Seoul;") or die("time zone error");
	
	if (!$link) {
		die(" db connect error : ".mysqli_connect_error());
		exit;
	}

	return $link;
}

function closedbi($link) {
	return mysqli_close($link);
}

function get_param($param) {
	return trim($_GET[$param]) ? trim($_GET[$param]) : trim($_POST[$param]);
}

function get_param2($param, $default) {
	$return = trim($_GET[$param]) ? trim($_GET[$param]) : trim($_POST[$param]);
	if($return == '' || is_null($return)) {
		$return = $default;
	}
	return $return;
}


function r_opendbi() {
	global $r_db_ip, $r_db_userid, $r_db_password, $r_db_name;

	$link = @mysqli_connect($r_db_ip, $r_db_userid, $r_db_password, $r_db_name);
// 	@mysqli_query($link, "set session character_set_connection=utf8;") or die("character_set Error");
// 	@mysqli_query($link, "set session character_set_results=utf8;") or die("character_set Error");
// 	@mysqli_query($link, "set session character_set_client=utf8;") or die("character_set Error");
	//@mysqli_query($link, "set session time_zone=Asia/Seoul;") or die("time zone error");
	
	if (!$link) {
		die(" db connect error : ".mysqli_connect_error());
		exit;
	}

	return $link;
}

function r_closedbi($link) {
	return mysqli_close($link);
}

function getDb() {
	$db = new PDO('mysql:host=localhost;dbname=nowmarketing;charset=utf8', 
		'nowmarketing', 
		'ahqkdlfdnpqdoq!',
		array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		
	return $db;
}
?>