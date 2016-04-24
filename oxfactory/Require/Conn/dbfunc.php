<?PHP
include('../../log4php/Logger.php');
Logger::configure('../../log4php/config.xml');
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
$debug_log = Logger::getLogger('debugLogger');

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
	$db = new PDO('mysql:host=localhost;dbname=oxfactory;charset=utf8', 
		'root', 
		'apmsetup',
		array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		
	return $db;
}

function echoCommonResult($result, $msg) {
	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);

	$node = $dom->createElement('result'); // column 항목 생성
	$nodeText = $dom->createTextNode($result);
	$node->appendChild($nodeText);
	$response->appendChild($node); // row 항목에 추가

	$node = $dom->createElement('message'); // column 항목 생성
	$nodeText = $dom->createTextNode($msg);
	$node->appendChild($nodeText);
	$response->appendChild($node); // row 항목에 추가

	// XML 파일 저장
	$xmlString = $dom->saveXML();

	return $xmlString;
}

function getTnkPid($p_app) {
	$pid = "";
	if($p_app=="KP") { //카톡
		$pid="905080f0-6061-4459-9544-16060d0d0201";
	}else if($p_app=="FP") { // 간식
		$pid="e0b080e0-b011-14c9-9c41-110b0c0c0b08";
	}else if($p_app=="NP") { // 용돈
		$pid="a0b01030-8001-442b-b244-100801020e0c";
	}else if($p_app=="TP") { // 티머니
		$pid="406050e0-f011-d499-994d-110f0c090a05";	
	}else if($p_app=="SP") { // 데이터
		$pid="70e07000-0041-743a-a347-130f0e0a0c07";
	}else if($p_app=="CP") { // 쿠키런
		$pid="d0b06070-f0d1-c4ba-ab4c-1d0f05080a03";
	}else if($p_app=="MP") { // 문상
		$pid="b010a020-c0d1-940a-a049-1d0c000d060b";
	}else if($p_app=="HP") { // 화장빨
		$pid="b0800010-8061-247c-c742-16070e0f0504";
	}else if($p_app=="SL") { // 급식
		$pid="50f04030-e0f1-140c-c041-1f0e0104080e";
	}else if($p_app=="DW") { // 데이트 통장
		$pid="80406020-c0c1-44ec-ce44-1c0c00040306";
	}
	return $pid;

}
function getIgaHashKey($p_app) {
	$key = "";
	if($p_app=="KP") { //카톡
		$key="3ecb0235ad374114";
	}else if($p_app=="FP") { // 간식
		$key="4ad987a9e6ca4fbd";
	}else if($p_app=="NP") { // 용돈
		$key="7cae9de7014a4b1c";
	}else if($p_app=="TP") { // 티머니
		$key="42c9c05d91084312";	
	}else if($p_app=="SP") { // 데이터
		$key="27d068bd0171450a";
	}else if($p_app=="CP") { // 쿠키런
		$key="9fae33a02fec4cbc";
	}else if($p_app=="MP") { // 문상
		$key="c6ac3be14f58420b";
	}else if($p_app=="HP") { // 화장빨
		$key="4948bd3f1e0f4f39";
	}else if($p_app=="SL") { // 급식
		$key="be0037c237de45fd";
	}else if($p_app=="DW") { // 데이트 통장
		$key="c51bbcd126564597";
	}
	return $key;

}

function getAccountTable($p_app) {
	$table = "tp_u_account";
	if($p_app=="KP") { //카톡
		$table = "tp_kp_account";
	}/*else if($p_app=="FP") { // 간식
		$table = "tp_fp_account";
	}else if($p_app=="NP") { // 용돈
		$table = "tp_np_account";
	}*/
	return $table;
}

?>