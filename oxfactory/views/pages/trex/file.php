<?php
$attachurl = $file_org_name = $file_org_type = '';
$file_org_size = 0;
if( $_POST['uploaded'] == 'upload_now' && !$_FILES['attache_file']['error'] ) { 
  // add IP tag.
  $file_org_name = $_FILES['attache_file']['name'] ;
  $file_org_size = $_FILES['attache_file']['size'] ;
  $file_org_type = $_FILES['attache_file']['type'] ;
  
  $file_name = $_SERVER['REMOTE_ADDR'] . "_" . $file_org_name ;
  move_uploaded_file($_FILES['attache_file']['tmp_name'] , '../../../upload/' . $file_name ) ;

  $attachurl = 'http://' . $_SERVER['HTTP_HOST'] . '/oxfactory/upload/' . $file_name ;
}

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Daum에디터 - 파일 첨부</title> 
<script src="../../js/popup.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" href="../../css/popup.css" type="text/css"  charset="utf-8"/>
<script type="text/javascript">
// <![CDATA[

	function upload() {
	  document.file_upload.submit();
  }
	
	function done() {
		if (typeof(execAttach) == 'undefined') { //Virtual Function
	        return;
	    }
		
		var _mockdata = {
			'attachurl': '<?=$attachurl;?>',
			'filemime': '<?=$file_org_type;?>',
			'filename': '<?=$file_org_name;?>',
			'filesize': <?=$file_org_size;?>
		};
		execAttach(_mockdata);
		closeWindow();
	}

	function initUploader(){
	    var _opener = PopupUtil.getOpener();
	    if (!_opener) {
	        alert('잘못된 경로로 접근하셨습니다.');
	        return;
	    }
	    
	    var _attacher = getAttacher('file', _opener);
	    registerAction(_attacher);
	}
	
</script>
</head>
<body onload="initUploader();">
<div class="wrapper">
	<div class="header">
		<h1>파일 첨부</h1>
	</div>

<?php
if( $_POST['uploaded'] != 'upload_now' ) :
?>
	<div class="body">
  	<form name="file_upload" id="file_upload" action="<?=$_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" accept-charset="utf-8">
		<dl class="alert">
		    <dt>파일 첨부 하기</dt>
		    <dd>
        	<input type=hidden name="uploaded" value="upload_now">
        	<input type=file name="attache_file" size=30>
			</dd>
		</dl>
		</form>
	</div>
	<div class="footer">
		<p><a href="#" onclick="closeWindow();" title="닫기" class="close">닫기</a></p>
		<ul>
			<li class="submit"><a href="#" onclick="upload();" title="업로드" class="btnlink">업로드</a> </li>
			<li class="cancel"><a href="#" onclick="closeWindow();" title="취소" class="btnlink">취소</a></li>
		</ul>
	</div>

<?php
else:
?>


	<div class="body">
		<dl class="alert">
		    <dt>파일 첨부 확인</dt>
		    <dd>
		    	확인을 누르시면 <b>"<?=$file_org_name;?>"</b> 파일첨부 됩니다.<br /> 
			</dd>
		</dl>
	</div>
	<div class="footer">
		<p><a href="#" onclick="closeWindow();" title="닫기" class="close">닫기</a></p>
		<ul>
			<li class="submit"><a href="#" onclick="done();" title="등록" class="btnlink">등록</a> </li>
			<li class="cancel"><a href="#" onclick="closeWindow();" title="취소" class="btnlink">취소</a></li>
		</ul>
	</div>

<?php
endif;
?>
	
</div>
</body>
</html>
