<?
header("Content-Type: text/xml; charset=UTF-8");
include "../../Require/Conn/dbfunc.php";
include "../../Require/lib/util.php";
//카톡
$k_id = $_REQUEST["k_id"];
$k_nickname = $_REQUEST["k_nickname"];
$k_pf_img = $_REQUEST["k_pf_img"];
$k_th_img = $_REQUEST["k_th_img"];

//입력값
$nickname = $_REQUEST["nickname"];
$gcm_id = $_REQUEST["gcm_id"];
$cno = $_REQUEST["cno"];
$cno = str_replace(" 82", "0", $cno);
$cno = str_replace("+82", "0", $cno);

$device_id = $_REQUEST["device_id"];
$adid = $_REQUEST["adid"];
$gid = $_REQUEST["gid"];

$db = getDb();

$uid = "";

try {
	$db->beginTransaction();
	
	$sql = " SELECT uid FROM tg_u_account WHERE k_id= '$k_id' and p_app='SN' ";
	$result = $db->prepare($sql);
	$result->execute();
	if ($result==null) {
		$db->rollBack();
		echo echoCommonResult("20", "이미 존재하는 카톡 ID입니다.");
		exit;
	} 
	
	$sql = "
	INSERT INTO tg_u_account(
	k_id
	,k_nickname
	,k_pf_img
	,k_th_img
	,cno
	,device_id
	,adid
	,gid
	,nickname
	,gcm_id
	,coin_cnt
	,gcm_yn
	,p_app
	,reg_date
	) VALUES (
	'$k_id'
	,'$k_nickname'
	,'$k_pf_img'
	,'$k_th_img'
	,'$cno'
	,'$device_id'
	,'$adid'
	,'$gid'
	,'$nickname'
	,'$gcm_id'
	,5
	,'Y'
	,'SN'
	,sysdate())	";
	
	$result = $db->prepare($sql);
	$result->execute();
	if (!$result || !$result->rowCount()) {
		$db->rollBack();
		$debug_log->debug("FAIL  insert tg_u_account [".$sql."]");
		echo echoCommonResult("99", $gb_error_msg);
		exit;
	}
	
	
	$uid = $db->lastInsertId();
	
	
	
	$sql = " insert into tg_u_coin (uid, c_type, c_flag, c_amt, ad_title, reg_date, p_app) values
	($uid, '1', '3', 1, '회원가입 축하 주사위', sysdate(), 'SN') ";
	$result = $db->prepare($sql);
	$result->execute();
	if (!$result || !$result->rowCount()) {
		$db->rollBack();
		$debug_log->debug("FAIL  insert tg_u_coin [".$sql."]");
		echo echoCommonResult("99", $gb_error_msg);
		exit;
	}
	
	
	$db->commit();
	
	

} catch(PDOException $ex) {
	$db->rollBack();
	echoCommonResult("99", $gb_error_msg);
	$debug_log->debug("DB ERROR : [".$ex->getMessage()."]");
	exit;
}

// XML 문서의 버전은 1.0, 인코딩 방식은 UTF-8을 사용
$dom = new DOMDocument('1.0', 'UTF-8');

// response 최상위 항목 생성
$response = $dom->createElement('response');

// XML 문서에 response 추가 (최상위 노드가 됨)
$dom->appendChild($response);

$resultNode = $dom->createElement('result');
$response->appendChild($resultNode);
$excuteVal = $dom->createTextNode("00");
$resultNode->appendChild($excuteVal);


$resultNode = $dom->createElement('uid');
$response->appendChild($resultNode);
$excuteVal = $dom->createTextNode($uid);
$resultNode->appendChild($excuteVal);

// XML 파일 저장

$xmlString = $dom->saveXML();

echo $xmlString;

//------------------------------------------------------------
?>