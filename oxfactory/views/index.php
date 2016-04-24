<?php

session_destroy();

$note_idx = $_REQUEST['note_idx'];
$need_session = $_REQUEST['need_session'];

?>


<html>
 <meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
    
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>


<link rel="stylesheet" href="https://www.oxfactory.net:41996/oxfactory/views/css/index.css" type="text/css" charset="utf-8"/>
<script src="https://www.oxfactory.net:41996/oxfactory/views/js/index.js"></script> 
<style type="text/css">
       #file-input-wrapper {
         display : none ;
         margin-top : 50px ;
       }
    </style>
    
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>

<style>
#login_form, #main_div, #main_img
{
  position: absolute;
  margin: 0 auto;
}
#login_form
{
  
}
  #file-input-wrapper {
         display : none ;
         margin-top : 50px ;
       }
</style>
<script>
$(document).ready(function(){

	window.mobilecheck = function() {
		  var check = false;
		  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
// 		  alert(check);
	}

	 // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('4b465d5c0d952c2fd92afb4912ce4bc9');
  
  // 카카오 로그인 버튼을 생성합니다.
  $("#kakao-login-btn").on('click',function(){
	  Kakao.Auth.login({
	      success: function(authObj) {
	          
	    	  Kakao.API.request({
	    	        url: '/v1/user/me',
	    	        success: function(res) {

// 	         	        alert(JSON.stringify(res));
	    	        	var id = res.id;
	    	    		var nickname = res.properties.nickname;
	    	    		var pf_img = res.properties.thumbnail_image;

//	 					alert("/oxfactory/models/snslogin.php?id="+ id +"&nickname="+ nickname +"&pf_img="+ pf_img);
	    	    		var my_form=document.createElement('FORM');
						my_form.name='myForm';
						my_form.method='POST';
						my_form.action='https://www.oxfactory.net:41996/oxfactory/models/snslogin.php';
						
						var my_tb1=document.createElement('INPUT');
						my_tb1.type='HIDDEN';
						my_tb1.name='id';
						my_tb1.value=id;
						my_form.appendChild(my_tb1);
						
						var my_tb2=document.createElement('INPUT');
						my_tb2.type='HIDDEN';
						my_tb2.name='nickname';
						my_tb2.value=nickname;
						my_form.appendChild(my_tb2);

						var my_tb3=document.createElement('INPUT');
						my_tb3.type='HIDDEN';
						my_tb3.name='pf_img';
						my_tb3.value=pf_img;
						my_form.appendChild(my_tb3);

						var my_tb4=document.createElement('INPUT');
						my_tb4.type='HIDDEN';
						my_tb4.name='test';
						my_tb4.value='<?php echo $note_idx ?>';
						my_form.appendChild(my_tb4);
						
						document.body.appendChild(my_form);
						my_form.submit();

	    	    		
	    	        },
	    	        fail: function(error) {
	    	          alert(JSON.stringify(error))
	    	        }
	    	      });

			
	      },
	      fail: function(err) {
	        alert(JSON.stringify(err))
	      }
	    });
  });
   

//     function kakao_login(id,nickname,pf_img){

//     	$.ajax({
//     		type:"POST",
//     		url:"http://www.oxfactory.net/oxfactory/models/snslogin.php",
//     	    data: "id="+ id +"&nickname="+ nickname +"&pf_img="+ pf_img + "",
//     		dataType:"xml",
//     		success:function(xml){						

//     			alert($(xml).find('response').html());			
    			
//     		 },	// success end   			
//                 error: function(e){
//                     alert(e.responseText) ;
//              }
//     });	
//     }


    function getUserData() {
    	FB.api('/me', function(response) {
//     		document.getElementById('response').innerHTML = 'Hello ' + response.name;

			var id = response.id;
			var nickname = response.name;
// 			alert(id);
// 			alert(nickname);
			 FB.api("/me/picture?width=180&height=180",  function(response) {
				 var pf_img = response.data.url;


				 var my_form=document.createElement('FORM');
					my_form.name='myForm';
					my_form.method='POST';
					my_form.action='https://www.oxfactory.net:41996/oxfactory/models/snslogin.php';
					
					var my_tb1=document.createElement('INPUT');
					my_tb1.type='HIDDEN';
					my_tb1.name='id';
					my_tb1.value=id;
					my_form.appendChild(my_tb1);
					
					var my_tb2=document.createElement('INPUT');
					my_tb2.type='HIDDEN';
					my_tb2.name='nickname';
					my_tb2.value=nickname;
					my_form.appendChild(my_tb2);

					var my_tb3=document.createElement('INPUT');
					my_tb3.type='HIDDEN';
					my_tb3.name='pf_img';
					my_tb3.value=pf_img;
					my_form.appendChild(my_tb3);

					var my_tb4=document.createElement('INPUT');
					my_tb4.type='HIDDEN';
					my_tb4.name='test';
					my_tb4.value='<?php echo $note_idx ?>';
					my_form.appendChild(my_tb4);
					
					document.body.appendChild(my_form);
					my_form.submit();
				 
			    }); 
			    

//         }
			

    		
    	});
    }
     
    window.fbAsyncInit = function() {
    	//SDK loaded, initialize it
    	FB.init({
    		appId      : '1248062955210967',
    		xfbml      : true,
    		version    : 'v2.5'
    	});
     
    	//check user session and refresh it
//     	FB.getLoginStatus(function(response) {
//     		if (response.status === 'connected') {
//     			//user is authorized
//     			document.getElementById('loginBtn').style.display = 'none';
//     			getUserData();
//     		} else {
//     			//user is not authorized
//     		}
//     	});
    };
     
    //load the JavaScript SDK
    (function(d, s, id){
    	var js, fjs = d.getElementsByTagName(s)[0];
    	if (d.getElementById(id)) {return;}
    	js = d.createElement(s); js.id = id;
    	js.src = "//connect.facebook.net/en_US/sdk.js";
    	fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
     
    //add event listener to login button
    document.getElementById('loginBtn').addEventListener('click', function() {
    	//do the login
    	FB.login(function(response) {
    		if (response.authResponse) {
    			//user just authorized your app
//     			document.getElementById('loginBtn').style.display = 'none';
    			getUserData();
    		}
    	}, {scope: 'email,public_profile', return_scopes: true});
    }, false);

	
});

</script>
  
  
  			
			
<body onload="loading();">
 		
 		
<!--   <a id="kakao-login-btn"></a> -->
   

<!-- <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"> -->
<!-- </fb:login-button> -->
<!-- <div id="status"> -->
<!-- </div> -->
 

 
<!-- <button id="loginBtn">Facebook Login</button> -->
<!-- <div id="response"></div> -->

    <input type="hidden" name="mysession" id="mysession">
 <div id="login_wrap" >
    <img id="logo" src="https://www.oxfactory.net:41996/oxfactory/views/img/oxfactory-main.svg" style="height:40%; width:100%; "/> 
    <div class="omb_login" style="position:relative; bottom:-20%; ">
		<div class="row omb_row-sm-offset-3 omb_socialButtons">
    	    <div id="loginBtn" style="margin-bottom:20px;">
		        <a href="#" class="btn btn-lg btn-block omb_btn-facebook">			        
			        Facebook
		        </a>
	        </div>
        	<div id="kakao-login-btn"  >
		        <a href="#" class="btn btn-lg btn-block " style="background-color:rgb(255,235,53);">			        
			        Kakaotalk
		        </a>
	        </div>        	
		</div>
	</div>
</div>



</body>
</html>