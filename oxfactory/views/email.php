<?php
require_once("../../phpmailer/class.phpmailer.php");

header("Content-Type: text/xml; charset=UTF-8");

	$connect = mysql_connect("localhost","root","apmsetup") or die("Couldn't connect!");
	mysql_select_db("oxfactory") or die("Couldn't find db");

	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");

	$mail = new PHPMailer();
	$mail->SMTPAuth = true; // turn on SMTP authentication
	$mail->Username = "redhotjjang@gmail.com"; // SMTP 사용자 이름
	$mail->Password = "Wowwow1537"; // SMTP 비밀번호
	$webmaster_email = "redhotjjang@gmail.com"; // 답변을 받을 이메일
	$email="redhotjjang@naver.com"; // 받을 이메일
	$name='정찬영2'; // 받을 이름
	$mail->From = $webmaster_email;
	$mail->FromName = "정찬영1"; // 보내는 사람 이름
	$mail->AddAddress($email,$name);
	$mail->AddReplyTo($webmaster_email,"Webmaster");
	$mail->WordWrap = 50; // set word wrap
	$mail->IsHTML(true); // HTML의 형식으로 보냄
	$mail->Subject = "SubJect Test"; // 메일 이름
	$mail->Body = "Hi This is the HTML BODY "; // 내용
	$mail->AltBody = "This is the body when user views in plain text format";
	$mail->IsSMTP();
	
	if(!$mail->Send()) //전송
	{//실패 하였을경우
	
	echo "메일 전송에 실패 하였습니다.: " . $mail->ErrorInfo;
	
	}else{ //메세지 전송에 성공하였을경우
	
		echo "메세지전송을 완료 하였습니다.";
	
	}
	
	$dom = new DOMDocument('1.0', 'UTF-8');
	$response = $dom->createElement('response');
	$dom->appendChild($response);
	
	echo $dom->saveXML();

?>
