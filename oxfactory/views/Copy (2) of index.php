
<!DOCTYPE html>
<html>
<head>
<title>Facebook Login JavaScript Example</title>
<meta charset="UTF-8">
</head>
<body>
<script>
function getUserData() {
	FB.api('/me', function(response) {
		document.getElementById('response').innerHTML = 'Hello ' + response.name;
	});
}
 
window.fbAsyncInit = function() {
	//SDK loaded, initialize it
	FB.init({
		appId      : '774378769375487',
		xfbml      : true,
		version    : 'v2.2'
	});
 
	//check user session and refresh it
// 	FB.getLoginStatus(function(response) {
// 		if (response.status === 'connected') {
// 			//user is authorized
// 			document.getElementById('loginBtn').style.display = 'none';
// 			getUserData();
// 		} else {
// 			//user is not authorized
// 		}
// 	});
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
			document.getElementById('loginBtn').style.display = 'none';
			getUserData();
		}
	}, {scope: 'email,public_profile', return_scopes: true});
}, false);
</script>

<!--
  Below we include the Login Button social plugin. This button uses
  the JavaScript SDK to present a graphical Login button that triggers
  the FB.login() function when clicked.
-->

 
<button id="loginBtn">Facebook Login</button>
<div id="response"></div>

</body>
</html>