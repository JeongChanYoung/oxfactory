<?
header("Content-Type: text/xml; charset=UTF-8");
include "../../Require/Conn/dbfunc.php";
include "../../Require/lib/util.php";

//카톡
$uid = $_REQUEST["uid"];
$k_id = $_REQUEST["k_id"];

$mysqli = opendbi();
$mysqli->autocommit(FALSE);

$proc = "00";
$sql = " insert into tp_u_account_b 
		select 
		uid,k_id,k_nickname,k_pf_img,k_th_img,cno,device_id,adid,gid,
		nickname,rcmd_cnt,rcmd_nickname,rcmd_uid,coin_cnt,gcm_id
		,gcm_yn,sysdate(),p_app from tp_u_account where uid=$uid ";
$result = $mysqli->query($sql);

$sql = " delete from tp_u_account where uid=$uid and k_id='$k_id' ";
$result = $mysqli->query($sql);

if(!$result || !$mysqli->affected_rows) {
// 	$d_log->debug($sql);
	$proc = "99"; // insert 실패
} else {
	$proc = "00"; // insert 성공
}

if($proc == "00") {
	$mysqli->commit();
} else {
	$mysqli->rollback();
}

closedbi($mysqli);




// XML 문서의 버전은 1.0, 인코딩 방식은 UTF-8을 사용
$dom = new DOMDocument('1.0', 'UTF-8');

// response 최상위 항목 생성
$response = $dom->createElement('response');

// XML 문서에 response 추가 (최상위 노드가 됨)
$dom->appendChild($response);

$resultNode = $dom->createElement('result');
$response->appendChild($resultNode);
$excuteVal = $dom->createTextNode($proc);
$resultNode->appendChild($excuteVal);


// XML 파일 저장

$xmlString = $dom->saveXML();

echo $xmlString;

//------------------------------------------------------------
?>