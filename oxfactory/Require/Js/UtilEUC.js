function encodeURL(str){
    var s0, i, s, u;
    s0 = "";                // encoded str
    for (i = 0; i < str.length; i++){   // scan the source
        s = str.charAt(i);
        u = str.charCodeAt(i);          // get unicode of the char
        if (s == " "){s0 += "+";}       // SP should be converted to "+"
        else {
            if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){       // check for escape
                s0 = s0 + s;            // don't escape
            }
            else {                  // escape
                if ((u >= 0x0) && (u <= 0x7f)){     // single byte format
                    s = "0"+u.toString(16);
                    s0 += "%"+ s.substr(s.length-2);
                }
                else if (u > 0x1fffff){     // quaternary byte format (extended)
                    s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else if (u > 0x7ff){        // triple byte format
                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else {                      // double byte format
                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
            }
        }
    }

    return s0;
}

function popClose() {
	if (confirm ("지금 보고 계신 창을 닫겠습니까?"))
		window.self.close();
	else
		return;
}

// 이메일 체크
function checkEmail(str) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)){
	    return (true)
	   }
	 return (false)
	}

function HangulCheck(obj)
{
    var str2 = obj.value;

    var flag = true;

    for (h = 0; h < str2.length; h++)
    {
        var g = str2.charCodeAt(h);

        if (!((0xAC00 <= g && g <= 0xD7A3) || (0x3131 <= g && g <= 0x318E)))
            flag = false;        
    }

    return flag;
}


// 숫자 체크
function IsAllNumber(strValue)
{
	var retCode = true;

	for(var i=0; i<strValue.length; i++)
  {
    if( strValue.charCodeAt(i) < 48 || 57 < strValue.charCodeAt(i) ){
      retCode = false;
    	break;
    } else if (i == 0 && strValue.charCodeAt(i) == 47) {
    	retCode = false;
    	break;
    }
  }

  return retCode; 	
}

// 영문 숫자 체크
function StringCheck3(str)
{
	
	var eng=/^([a-zA-Z0-9]{1,20})$/;
	if(eng.test(str)==false)
	{
		return (true);
	}
	return (false);	
}

function StringCheck4(str) {
//    chk1 = /^[a-z\d]{8,12}$/i; 
//    chk2 = /[a-z]/i; 
//    chk3 = /\d/; 

//  return chk1.test(str) && chk2.test(str) && chk3.test(str); 
	if(/[a-zA-Z]/.test(str)){
		if(/[0-9]/.test(str)){
		} else{
			return false;
		}
	} else{
		return false;
	}

	return true;
}

function StringCheck5(str) {
	var eng=/^([0-9]{1,20})$/;
	if(eng.test(str)==false)
	{
		return (true);
	}
	return (false);	
}

// 길이체크
function LengthCheck(length_limit, obj1) {
	   var form = eval("document.getElementById('"+obj1+"')");	   
	   var length = calculate_check(form.value);
	   	   	   
	   if (length > length_limit) {
	       alert("최대 " + length_limit + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
	       form.value = form.value.replace(/\r\n$/, "");
	       form.value = assert_check(form.value, length_limit);
	   }	
}

function calculate_check(message)
{
   var nbytes = 0;
   var blank = /^\s+|\s+$/g;
   
   for (i = 0; i < message.length; i++) {
       var ch = message.charAt(i);
       if(escape(ch).length > 4) {
           nbytes += 3;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               nbytes += 1;
           }
       } else if (ch == '<' || ch == '>') {
           nbytes += 4;
       } else if (ch == "'" || ch.replace(blank, '') == "") {
    	   nbytes += 6;
       } else {
           nbytes += 1;
       }
   }

   return nbytes;
}

function assert_check(message, maximum)
{
   var inc = 0;
   var nbytes = 0;
   var msg = "";
   var msglen = message.length;
   var blank = /^\s+|\s+$/g;
   
   for (i=0; i<msglen; i++) {
       var ch = message.charAt(i);
       if (escape(ch).length > 4) {
           inc = 3;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               inc = 1;
           }
       } else if (ch == '<' || ch == '>') {
           inc = 4;
       } else if (ch == "'" || ch.replace(blank, '') == "") {
    	   nbytes += 6;           
       } else {
           inc = 1;
       }
       if ((nbytes + inc) > maximum) {
           break;
       }
       nbytes += inc;
       msg += ch;
   }
   //a.innerText = nbytes;
   return msg;
}


function LimitCheck(length_limit, obj1, num) {
	
	   var form = eval("document.getElementById('"+obj1+"')");
	   
	   var length = calculate_msglen(form.value);
	   var a = eval("document.getElementById('textlimit_"+num+"')");
	   
	   a.innerText = length;
	   if (length > length_limit) {
	       alert("최대 " + length_limit + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
	       form.value = form.value.replace(/\r\n$/, "");
	       form.value = assert_msglen(form.value, length_limit, num);
	   }	
}

function calculate_msglen(message)
{
   var nbytes = 0;
   var blank = /^\s+|\s+$/g;
   
   for (i = 0; i < message.length; i++) {
       var ch = message.charAt(i);
       if(escape(ch).length > 4) {
           nbytes += 3;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               nbytes += 1;
           }
       } else if (ch == '<' || ch == '>') {
           nbytes += 4;
       } else if (ch == "'" || ch.replace(blank, '') == "") {
    	   nbytes += 6;
       } else {
           nbytes += 1;
       }
   }

   return nbytes;
}

function assert_msglen(message, maximum, num)
{
   var inc = 0;
   var nbytes = 0;
   var msg = "";
   var msglen = message.length;
   var a = eval("document.getElementById('textlimit_"+num+"')");
   var blank = /^\s+|\s+$/g;
   
   for (i=0; i<msglen; i++) {
       var ch = message.charAt(i);
       if (escape(ch).length > 4) {
           inc = 3;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               inc = 1;
           }
       } else if (ch == '<' || ch == '>') {
           inc = 4;
       } else if (ch == "'" || ch.replace(blank, '') == "") {
    	   nbytes += 6;           
       } else {
           inc = 1;
       }
       if ((nbytes + inc) > maximum) {
           break;
       }
       nbytes += inc;
       msg += ch;
   }
   a.innerText = nbytes;
   return msg;
}


function unRadioCheck(aValue) {
	for (b = 0; b < aValue.length; b++){
		aValue[b].checked = false;
	}
}

// 라디오 버튼 체크
function RadioCheck(aValue)
{
	var flag = false;
	
	for (b = 0; b < aValue.length; b++)
	{
		if (aValue[b].checked == true)
		{			
			flag = true;
			return flag;
		}
	}

	return flag;
}

// 라디오 버튼 값 체크
function RadioValue(obj)
{
	var num = 0;

	for (var a = 0; a < obj.length; a++){
		if (obj[a].checked == true)
			num = obj[a].value;
	}


	return num;
}

//URL 체크
function isValidUrl(urls) {
	 var chkExp = /http:\/\/([\w\-]+\.)+/g;
	 var chekExp2 = /market:\/\/+/g;
	 var chekExp3 = /https:\/\/([\w\-]+\.)+/g;
	 var test = true;

	 if (chkExp.test(urls) || chekExp2.test(urls) || chekExp3.test(urls)) {
	  return test;
	 } else {
	  test = false;
	  return test;
	 }

}


// 숫자 관련
String.prototype.comma = function() {
    var tmp = this.split('.');
    var minus = false;
    var str = new Array();

    if(tmp[0].indexOf('-') >= 0) {
        minus = true;
        tmp[0] = tmp[0].substring(1, tmp[0].length); 
    }

    var v = tmp[0].replace(/,/gi,'');
    for(var i=0; i<=v.length; i++) {
        str[str.length] = v.charAt(v.length-i);
        if(i%3==0 && i!=0 && i!=v.length) {
            str[str.length] = '.';
        }
    }
    str = str.reverse().join('').replace(/\./gi,',');
    if(minus) str = '-' + str;

    return (tmp.length==2) ? str + '.' + tmp[1] : str;
}

function onlyNum(obj) {
    var val = obj.value;
    var re = /[^0-9\.\,\-]/gi;
    obj.value = val.replace(re, '');
}

function unNumber(obj) {
	return (obj.replace(/\,/g,""));
}

function NumFormat(obj1) {
	var f = document.form1;

	if (parseInt(obj1) == 0){
		f.admin_ipdanga.value = f.admin_ipdanga.value.comma();
		f.admin_ip_danga.value = unNumber(f.admin_ipdanga.value);
	} else if (parseInt(obj1) == 1){
		f.admin_andanga.value = f.admin_andanga.value.comma();
		f.admin_an_danga.value = unNumber(f.admin_andanga.value);
	}
}

function step1(obj1) {
	var f = document.form1;
	var a = 0;
	var b = 0;
	var c = 0;

	var temp_total = 0;
	var temp_sum = 0;
	
	if (parseInt(obj1) == 0 || parseInt(obj1) == 2) {		
		if (f.ipmoney.value.length == 0 ){
			a = 0;
			b = 0;
			c = 0;
		} else {
			
			f.ipmoney.value = f.ipmoney.value.comma();					
			f.ip_money.value = unNumber(f.ipmoney.value);
			
			f.ipdanga.value = f.ip_money.value.comma();
			f.ip_danga.value = unNumber(f.ipdanga.value);			
			
			a = parseInt(f.ip_money.value);			
						
			if (f.ipnum.value.length == 0) {				
				b = 0;
				c = 0;
			}
			else {				
				f.ipnum.value = f.ipnum.value.comma();
				f.ip_num.value = unNumber(f.ipnum.value);				
				
				b = parseInt(f.ip_num.value);
				c = parseInt(f.ip_danga.value);

				temp_total = (((a + c) * b) / 100) * 10 + ((a + c) * b);
				temp_sum = (((a + c) * b) / 100) * 10 + ((a + c) * b);
				
				f.ip_total.value = temp_total;//(a + c) * b;
				f.ip_sum.value = temp_sum;//(a + c) * b;
									
				f.iptotal.value = f.ip_total.value.comma();
				f.ipsum.value = f.ip_sum.value.comma();
				
				if (parseInt(f.u_money.value) < parseInt(f.ip_sum.value)) {
					f.app_need.value = parseInt(f.ip_sum.value) - parseInt(f.u_money.value)
					f.appneed.value = f.app_need.value.comma();
				} else {
					f.appneed.value = 0;
					f.app_need.value = 0;
				}				
			}													
		}	
	}
	
	if (parseInt(obj1) == 1 || parseInt(obj1) == 2) {
		
		if (f.anmoney.value.length == 0 ){
			a = 0;
			b = 0;
			c = 0;
		} else {
						
			f.anmoney.value = f.anmoney.value.comma();					
			f.an_money.value = unNumber(f.anmoney.value);
			
			f.andanga.value = f.an_money.value.comma();
			f.an_danga.value = unNumber(f.andanga.value);			
			
			a = parseInt(f.an_money.value);			
						
			if (f.annum.value.length == 0) {				
				b = 0;
				c = 0;
			}
			else {
				f.annum.value = f.annum.value.comma();
				f.an_num.value = unNumber(f.annum.value);				
				
				b = parseInt(f.an_num.value);
				c = parseInt(f.an_danga.value);
				
				temp_total = (((a + c) * b) / 100) * 10 + ((a + c) * b);
				temp_sum = (((a + c) * b) / 100) * 10 + ((a + c) * b);

				f.an_total.value = temp_total;//(a + c) * b;
				f.an_sum.value = temp_sum;//(a + c) * b;
									
				f.antotal.value = f.an_total.value.comma();
				f.ansum.value = f.an_sum.value.comma();
				
				if (parseInt(f.u_money.value) < parseInt(f.an_sum.value)) {
					f.app_need.value = parseInt(f.an_sum.value) - parseInt(f.u_money.value)
					f.appneed.value = f.app_need.value.comma();
				} else {
					f.appneed.value = 0;
					f.app_need.value = 0;
				}				
			}													
		}			
	}
	
	if (parseInt(obj1) == 2) {
		var appsum = parseInt(f.ip_sum.value) + parseInt(f.an_sum.value);

		if (appsum > parseInt(f.u_money.value)) {
			f.app_need.value = appsum - parseInt(f.u_money.value)
			f.appneed.value = f.app_need.value.comma();			
		}
	}
}

function step2(obj1) {
	var f = document.form1;
	var a = 0;
	var b = 0;
	var c = 0;
	var temp_total = 0;
	var temp_sum = 0;
	
	if (parseInt(obj1) == 0 || parseInt(obj1) == 2) {		
		if (f.ipnum.value.length == 0 ){
			a = 0;
			b = 0;
			c = 0;
		} else {
			
			f.ipnum.value = f.ipnum.value.comma();
			f.ip_num.value = unNumber(f.ipnum.value);

			f.ipdanga.value = f.ipdanga.value.comma();
			f.ip_danga.value = unNumber(f.ipdanga.value);
			
			a = parseInt(f.ip_num.value);
			b = parseInt(f.ip_danga.value);
			
			if (parseInt(a) >= 0 && parseInt(b) >= 0){
				temp_total = ((a * b) / 100) * 10 + (a * b);
				temp_sum = ((a * b) / 100) * 10 + (a * b);

				f.ip_total.value = temp_total;//a * b;
				f.ip_sum.value = temp_sum;//a * b;
									
				f.iptotal.value = f.ip_total.value.comma();
				f.ipsum.value = f.ip_sum.value.comma();
				
				if (parseInt(f.u_money.value) < parseInt(f.ip_sum.value)) {
					f.app_need.value = parseInt(f.ip_sum.value) - parseInt(f.u_money.value)
					f.appneed.value = f.app_need.value.comma();
				} else {
					f.appneed.value = 0;
					f.app_need.value = 0;
				}
			}
		}	
	}
	
	if (parseInt(obj1) == 1 || parseInt(obj1) == 2) {
		if (f.annum.value.length == 0 ){
			a = 0;
			b = 0;
			c = 0;
		} else {
			
			f.annum.value = f.annum.value.comma();
			f.an_num.value = unNumber(f.annum.value);
			
			f.andanga.value = f.andanga.value.comma();
			f.an_danga.value = unNumber(f.andanga.value);
			
			a = parseInt(f.an_num.value);
			b = parseInt(f.an_danga.value);

			if (parseInt(a) >= 0 && parseInt(b) >= 0){
				temp_total = ((a * b) / 100) * 10 + (a * b);
				temp_sum = ((a * b) / 100) * 10 + (a * b);
				
				f.an_total.value = temp_total;//a * b;
				f.an_sum.value = temp_sum;//a * b;
									
				f.antotal.value = f.an_total.value.comma();
				f.ansum.value = f.an_sum.value.comma();
				
				if (parseInt(f.u_money.value) < parseInt(f.an_sum.value)) {
					f.app_need.value = parseInt(f.an_sum.value) - parseInt(f.u_money.value)
					f.appneed.value = f.app_need.value.comma();
				} else {
					f.appneed.value = 0;
					f.app_need.value = 0;
				}			
			}
		}			
	}
	
	if (parseInt(obj1) == 2) {
		var appsum = parseInt(f.ip_sum.value) + parseInt(f.an_sum.value);

		if (appsum > parseInt(f.u_money.value)) {
			f.app_need.value = appsum - parseInt(f.u_money.value)
			f.appneed.value = f.app_need.value.comma();			
		}
	}	
}


//  앱 다운을 위한 쿠키 체크
function getTimestamp(){
	var nowTime = new Date().getTime();
	var strNowTime = new String(nowTime);
	var nowTimeStamp = parseInt(strNowTime.substring(0,10));
	return strNowTime;
}

function getTime(){
	var nowTime = new Date().getTime();
	var strNowTime = new String(nowTime);
	var nowTimeStamp = parseInt(strNowTime.substring(0,10));
	return nowTimeStamp;
}

if(!getCookie("wm_uniq")){
	setCookie("wm_uniq",getTimestamp(),365);
}

function getCookie(name){
    var result = null;
    var myCookie = " " + document.cookie + ";";
    var searchName = " " + name + "=";
    var startOfCookie = myCookie.indexOf(searchName);
    var endOfCookie;
    if (startOfCookie != -1)
    {
        startOfCookie += searchName.length;
        endOfCookie = myCookie.indexOf(";", startOfCookie);
        result = unescape(myCookie.substring(startOfCookie, endOfCookie));
    }
    return result;
}

function setCookie( name, value, expiredays){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays);
	document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
}

function in_array(Val,Arr)
{
	for(var i=0;i<Arr.length;i++) {
		if(Val == Arr[i]) {
			return true;
			break;
		}
	}
}

function _storeLinkCheck(obj1, obj2) {
	var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
	var str = null;
	var i = 0;
	var url = obj1.replace(regURL, '$2');
	var url_1 = null;

	if (obj2 == "Y"){		// 구글 플레이
		for (i = 0; i < url.length; i++ ){

			if (url.indexOf("details?") > 0){
				str = url.substring(url.indexOf("details?") + 8);
				str = "market://details?" + str;
			} else {
				alert ("구글플레이 링크를 확인하신 후 다시 입력하시기 바랍니다.");
				return false;
			}
		}

		return str;
	} else if (obj2 == "N") {
		for (i = 0; i < url.length; i++){
			if (url.indexOf("insProdId=") > 0){
				str = url.substring(url.indexOf("insProdId=") + 10);
			} else {
				alert ("티스토어 링크를 확인하신 후 다시 입력하시기 바랍니다.");
				return false;
			} 
		}

		url_1 = str.split("&");

		str = "http://m.tstore.co.kr/userpoc/mp.jsp?pid="+url_1[0];

		return str;
	} else {
		return false;
	}
}

// 윈도우 오픈
function PopWindow(url, param, width, height, name) {

	window.open (url+"?"+param, name, "width="+width+", height="+height+", scrollbars=yes, status=no, menubar=no, location=no, toolbar=no");
}

function BaseEncode(str) {
	var string = Base64.encode(Base64.encode(str));

	return string;
}

function BaseDecode(str) {
	var string = Base64.decode(Base64.decode(str));

	return string;
}