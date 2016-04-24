<?
function echoXmlResult($result) {
	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);
	
	$node = $dom->createElement('result'); // column 항목 생성
	$nodeText = $dom->createTextNode($result);
	$node->appendChild($nodeText);
	$response->appendChild($node); // row 항목에 추가
	
	// XML 파일 저장
	$xmlString = $dom->saveXML();
	
	return $xmlString;
	
}

function echoXmlResult2($result, $msg) {
	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);

	$node = $dom->createElement('result'); // column 항목 생성
	$nodeText = $dom->createTextNode($result);
	$node->appendChild($nodeText);
	$response->appendChild($node); // row 항목에 추가
	
	$node = $dom->createElement('msg'); // column 항목 생성
	$nodeText = $dom->createTextNode($msg);
	$node->appendChild($nodeText);
	$response->appendChild($node); // row 항목에 추가
	
	// XML 파일 저장
	$xmlString = $dom->saveXML();

	return $xmlString;

}


function execGcm($apiKey, $ids, $datas) { // gcm_ids, ap
	// gcm_id, api키, 제목, 내용, 이미지URL, 팝업여부, 
	$message = $title."|".$content;

	$fields = array(
			'registration_ids'  => $ids,
			'data'              => $datas
	);

	// 	echo json_encode($fields);
	$headers = array('Content-Type:application/json ; charset=UTF-8', 'Authorization:key='.$apiKey);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,    'https://android.googleapis.com/gcm/send');
	curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
	curl_setopt($ch, CURLOPT_POST,    true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($fields));

	$response = curl_exec($ch);
	return json_decode($response,true);
}

function LoginCheck() {
	if (strlen($_COOKIE["APP_SUPER_USER"]) == 0) {
		echo "<script type=\"text/javascript\">";
		echo "alert (\"로그인 후 이용하시기 바랍니다.\");";
		echo "location.href=\"./index.php\";";
		echo "</script>";
	}
}

function CompanyLoginCheck() {
	if (strlen($_COOKIE["APP_COMPANY_ADMIN"]) == 0) {
		echo "<script type=\"text/javascript\">";
		echo "alert (\"로그인 후 이용하시기 바랍니다.\");";
		echo "location.href=\"./index.php\";";
		echo "</script>";
	}
}

function CompanyPopLoginCheck() {
	if (strlen($_COOKIE["APP_COMPANY_ADMIN"]) == 0) {
		echo "<script type=\"text/javascript\">";
		echo "alert (\"로그인 후 이용하시기 바랍니다.\");";
		echo "self.close();";
		echo "window.opener.document.location.href = \"./index.php\";";
		echo "</script>";
	}
}

function ProvideLoginCheck() {
	if (strlen($_COOKIE["APP_COMPANY_PROVIDE"]) == 0) {
		echo "<script type=\"text/javascript\">";
		echo "alert (\"로그인 후 이용하시기 바랍니다.\");";
		echo "location.href=\"./index.php\";";
		echo "</script>";
	}
}

function ProvidePopLoginCheck() {
	if (strlen($_COOKIE["APP_COMPANY_PROVIDE"]) == 0) {
		echo "<script type=\"text/javascript\">";
		echo "alert (\"로그인 후 이용하시기 바랍니다.\");";
		echo "self.close();";
		echo "window.opener.document.location.href = \"./index.php\";";
		echo "</script>";
	}
}

function getCokie($num) {
	if (strlen($_COOKIE["APP_SUPER_USER"]) > 0 ) {
		$cookieArray = explode(":", base64_decode(base64_decode($_COOKIE["APP_SUPER_USER"])));
		$len = count($cookieArray);
		for ($i = 0; $i < $len; $i++) {
			//echo $cookieArray[$i]."<br />";
			if ($num == $i)
				return $cookieArray[$i];
			//else
				//return 0;
		}		
	}
}

function getCompanyCokie($num) {
	if (strlen($_COOKIE["APP_COMPANY_ADMIN"]) > 0 ) {
		$cookieArray = explode(":", base64_decode(base64_decode($_COOKIE["APP_COMPANY_ADMIN"])));
		$len = count($cookieArray);
		
		for ($i = 0; $i < $len; $i++) {
			//echo $cookieArray[$i]."<br />";
			if ($num == $i)
				return $cookieArray[$i];
			//else
			//return 0;
		}
	}
}

function getAppCompanyCokie($num) {
	if (strlen($_COOKIE["APP_COMPANY_PROVIDE"]) > 0 ) {
		$cookieArray = explode(":", base64_decode(base64_decode($_COOKIE["APP_COMPANY_PROVIDE"])));
		$len = count($cookieArray);

		for ($i = 0; $i < $len; $i++) {
			//echo $cookieArray[$i]."<br />";
			if ($num == $i)
				return $cookieArray[$i];
			//else
			//return 0;
		}
	}
}

function En_Replace($str) {
	$a = str_replace("&", "&amp;", $str);
	$a = str_replace("'", "&lsquo;", $a);
	$a = str_replace("<", "&lt;", $a);
	$a = str_replace(">", "&gt;", $a);
	$a = str_replace("\"", "&quot;", $a);
	$a = str_replace("<br />", "\n", $a);

	return $a;
}

function De_Replace($str) {
	$a = str_replace("&amp;", "&", $str);
	$a = str_replace("&lsquo;", "'", $a);
	$a = str_replace("&lt;", "<", $a);
	$a = str_replace("&gt;", ">", $a);
	$a = str_replace("&quot;", "\"", $a);
	$a = str_replace("<br />", "\n", $a);

	return $a;
}

function De_AppReplace($str) {
	$a = str_replace("&amp;", "&", $str);
	$a = str_replace("&lsquo;", "'", $a);
	$a = str_replace("&lt;", "<", $a);
	$a = str_replace("&gt;", ">", $a);
	$a = str_replace("&quot;", "\"", $a);
//	$a = str_replace("<br />", "\n", $a);

	return $a;
}

// 한글 문자열 자르기
function substrhan($str, $len, $footer='') {
	if(strlen($str) <= $len) {
		return $str;
	}
	else {
		$len = $len - strlen($footer);
		for($i=0; $i<$len; $i++) if(ord($str[$i])>127) $i++;
		if($i > $len) $i-=2;
		$str=substr($str,0,$i);
		return $str.$footer;
	}
}

// 페이징 limit_idx 계산
function basicLimitSize($list_size, $block_size, $total_record, $page) {

	$total_page = ceil($total_record / $list_size); // 총페이지
	$total_block = ceil($total_page / $block_size); // 총블럭

	$block = ceil($page / $block_size); // 현재 블럭
	$limit_idx = ($page - 1) * $list_size; // 리미트 시작 위치

	return $limit_idx;
}

function basicPaging($list_size, $block_size, $totalcount, $page, $query, $url) {
	$total_page = ceil($totalcount / $list_size); // 총페이지
	$total_block = ceil($total_page / $block_size); // 총블럭

	$block = ceil($page / $block_size); // 현재 블럭

	if ($page > 1) {
		$num = $totalcount - (($page - 1) * $list_size);
	} else {
		$num = $totalcount;
	}

	$first_page = (($block - 1) * $block_size) + 1;
	$last_page = min($total_page, $block * $block_size);

	$prev_page = $page - 1;	//이전 페이지
	$next_page = $page + 1; // 다음 페이지

	$prev_block = $block - 1;	// 이전블럭
	$next_block = $block + 1;	// 다음블럭

	$prev_block_page = $prev_block * $block_size;
	$next_block_page = $next_block * $block_size - ($block_size - 1);

	$string = "";

	if ($prev_page > 0)
		$string = "&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$prev_page.$query."\">‹&nbsp;<span>prev</span></a>&nbsp;";
	else 
		$string = "&nbsp;‹&nbsp;<span>prev</span>&nbsp;";

	if ($prev_block > 0)
		$string = $string."&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$prev_block_page.$query."\"><span>...</span></a>&nbsp;";
	else
		$string = $string."&nbsp;<span>...</span>&nbsp;";

	for ($i = $first_page; $i <= $last_page; $i++) {
		if ($i != $page) 
			$string = $string."&nbsp;<a href=\"".$url."?page=".$i.$query."\" class=\"l_font4\">[".$i."]</a>&nbsp;";
		else
			$string = $string."&nbsp;<strong>[".$i."]</strong>&nbsp;";
	}

	if ($next_block <= $total_block)
		$string = $string."&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$next_block_page.$query."\"><span>...</span></a>&nbsp;";
	else
		$string = $string."&nbsp;<span>...</span>&nbsp;";

	if ($next_page <= $total_page)
		$string = $string."&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$next_page.$query."\"><span>next</span>&nbsp;› </a>&nbsp;";
	else
		$string = $string."&nbsp;<span>next</span> › </a>&nbsp;";

	return $string;
}

function basicPaging2($list_size, $block_size, $totalcount, $page, $query, $func) {
	$total_page = ceil($totalcount / $list_size); // 총페이지
	$total_block = ceil($total_page / $block_size); // 총블럭

	$block = ceil($page / $block_size); // 현재 블럭

	if ($page > 1) {
		$num = $totalcount - (($page - 1) * $list_size);
	} else {
		$num = $totalcount;
	}

	$first_page = (($block - 1) * $block_size) + 1;
	$last_page = min($total_page, $block * $block_size);

	$prev_page = $page - 1;	//이전 페이지
	$next_page = $page + 1; // 다음 페이지

	$prev_block = $block - 1;	// 이전블럭
	$next_block = $block + 1;	// 다음블럭

	$prev_block_page = $prev_block * $block_size;
	$next_block_page = $next_block * $block_size - ($block_size - 1);

	$string = "";

	if ($prev_page > 0)
		$string = "&nbsp;<a class='l_font4' href='#' onClick='javascript:".$func."(\"".$prev_page."\")'>&nbsp;<span>prev</span></a>&nbsp;";
// 		$string = "&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$prev_page.$query."\">‹&nbsp;<span>prev</span></a>&nbsp;";
	else
		$string = "&nbsp;‹&nbsp;<span>prev</span>&nbsp;";

	if ($prev_block > 0)
		$string = $string."&nbsp;<a class='l_font4' href='#' onClick='javascript:".$func."(\"".$prev_block_page."\")'>&nbsp;<span>...</span></a>&nbsp;";
// 		$string = $string."&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$prev_block_page.$query."\"><span>...</span></a>&nbsp;";
	else
		$string = $string."&nbsp;<span>...</span>&nbsp;";

	for ($i = $first_page; $i <= $last_page; $i++) {
		if ($i != $page)
			$string = $string."&nbsp;<a class='l_font4' href='#' onClick='javascript:".$func."(\"".$i."\")'>[".$i."]</a>&nbsp;";
// 			$string = $string."&nbsp;<a href=\"".$url."?page=".$i.$query."\" class=\"l_font4\">[".$i."]</a>&nbsp;";
		else
			$string = $string."&nbsp;<strong>[".$i."]</strong>&nbsp;";
	}

	if ($next_block <= $total_block)
		$string = $string."&nbsp;<a class='l_font4' href='#' onClick='javascript:".$func."(\"".$next_block_page."\")'>&nbsp;<span>...</span></a>&nbsp;";
// 		$string = $string."&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$next_block_page.$query."\"><span>...</span></a>&nbsp;";
	else
		$string = $string."&nbsp;<span>...</span>&nbsp;";

	if ($next_page <= $total_page)
		$string = $string."&nbsp;<a class='l_font4' href='#' onClick='javascript:".$func."(\"".$next_page."\")'>&nbsp;<span>...</span></a>&nbsp;";
// 		$string = $string."&nbsp;<a class=\"l_font4\" href=\"./".$url."?page=".$next_page.$query."\"><span>next</span>&nbsp;› </a>&nbsp;";
	else
		$string = $string."&nbsp;<span>next</span> › </a>&nbsp;";

	return $string;
}


function PhoneNumber($str) {
	if (strlen($str) == 9) {
		$a_phone_1 = substr($str, 0, 2);
		$a_phone_2 = substr($str, 2, 3);
		$a_phone_3 = substr($str, 5, 4);
	}  else if (strlen($str) == 10) {
		$a_phone_1 = substr($str, 0, 2);
		$a_phone_2 = substr($str, 2, 4);
		$a_phone_3 = substr($str, 6, 4);
	} else if (strlen($str) == 11) {
		$a_phone_1 = substr($str, 0, 3);
		$a_phone_2 = substr($str, 3, 4);
		$a_phone_3 = substr($str, 7, 4);
	}

	return $a_phone_1."-".$a_phone_2."-".$a_phone_3;
}

function ZipCode($str) {
	$a_zip_1 = substr($str, 0, 3);
	$a_zip_2 = substr($str, 3, 3);

	return $a_zip_1."-".$a_zip_2;
}

function WorkNum($str) {
	$a_w_1 = substr($str, 0, 3);
	$a_w_2 = substr($str, 3, 2);
	$a_w_3 = substr($str, 5, 5);

	return $a_w_1."-".$a_w_2."-".$a_w_3;
}

// 심사 제출 상태
function AppresultType($r_type, $mysqli) {

	$sql = "SELECT s_category FROM tbl_sub_category WHERE s_midx = $r_type ORDER BY s_sort ASC ";

	$result = $mysqli->query($sql);

	while ($row = $result->fetch_array()) {
		$s_category[] = $row["s_category"];
	}

	$result->close();
	return $s_category;
}

function Encode64($str) {
	$string = base64_encode(base64_encode($str));
	return $string;
}

function Decode64($str) {
	$string = base64_decode(base64_decode($str));
	return $string;
}

function ftpUpload($file) {
	$connection = ssh2_connect('114.207.246.230', 22);
	ssh2_auth_password($connection, 'donple', 'Donple@06)*');
	ssh2_scp_send($connection, '/local/filename', '/remote/filename', 0644);
}

function sendMail($subject, $content, $mailto){
	$admin_email = "marketing@nowmarketing.co.kr";
	$admin_name  = "엔트리";
	
	$header  = "Return-Path: ".$admin_email."\n";
	$header .= "From: =?UTF-8?B?".base64_encode($admin_name)."?= <".$admin_email.">\n";
	$header .= "MIME-Version: 1.0\n";
	$header .= "X-Priority: 3\n";
	$header .= "X-MSMail-Priority: Normal\n";
	$header .= "X-Mailer: FormMailer\n";
	$header .= "Content-Transfer-Encoding: base64\n";
	$header .= "Content-Type: text/html;\n \tcharset=UTF-8\n";
	
	$subject  = "=?UTF-8?B?".base64_encode($subject)."?=\n";
	$message = base64_encode($content);
	
	flush();
	@mail($mailto, $subject, $message, $header);
}

?>