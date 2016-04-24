<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=8">
<title>TeX 수식 편집기</title>
<meta name="description"
	content="You can generate an image of a mathematical formula using the TeX language. This is useful for displaying complex formulas on your web page.">
<meta name="keywords"
	content="latex equation editor, editor equation, equation editor, latex equation, latex to image, tex to image, math images, latex image, latex, teach latex, learn latex, latex books, equations, math, equation, image, png, math, mathematics, formula">
<meta property="og:title" content="TeX 수식 편집기">
<meta property="og:description"
	content="You can generate an image of a mathematical formula using the TeX language. This is useful for displaying complex formulas on your web page.">
<meta property="og:type" content="website">
<meta property="og:url" content="http://atomurl.net/math/">
<meta property="og:image"
	content="http://atomurl.net/math/img/logo128.png">
<link rel="shortcut icon" href="http://atomurl.net/math/favicon.ico">
<link rel=StyleSheet HREF="http://atomurl.net/css/style_normal.css"
	type=text/css title=style>

<style>
.tableclick {
	cursor: pointer;
	width: 25px;
	border: 1px solid white;
}

#tab_select a {
	color: #00E;
	font-size: 15px;
}

.textareaedit {
	font-size: 15px;
	font-family: verdana;
	width: 750px;
	height: 180px;
	padding: 5px;
	/*letter-spacing: 1px;
	line-height: 160%;
	background: #014931;
	border: 6px ridge #C5A99B;
	color: white;*/
}
#latex_img, #latex_link
{   
    -ms-transform: scale(4,0.2); /* IE 9 */
    -webkit-transform: scale(0.2,0.2); /* Chrome, Safari, Opera */
    transform: scale(4,0.2); /* Standard syntax */

}
</style>

<script type="text/javascript" src="http://atomurl.net/math/js/basic.js"></script>
<script type="text/javascript"
	src="http://atomurl.net/math/js/jscolor/jscolor.js"></script>
<script type="text/javascript" src="http://atomurl.net/js/ajax.js"></script>

<script>
	var m_math = [ "\\widetilde{ab}", "\\overline{ab}", "\\overbrace{ab}",
			"\\sqrt{ab}", "f'", "x^{k}", "\\lim_{a \\rightarrow b}",
			"\\begin{bmatrix}a & b \\\\c & d \\end{bmatrix}", "\\big(a\\big)",
			"\\int_a^b x", "\\sum_a^b x", "\\prod_a^b x", "\\bigcap_a^b x",
			"\\bigvee_a^b x", "\\bigotimes", "\\widehat{ab}",
			"\\underline{ab}", "\\underbrace{ab}", "\\sqrt[n]{ab}",
			"\\frac{a}{b}", "x_{k}", "\\frac{\\partial^nf}{\\partial x^n}",
			"x =\\begin{cases}a & x = 0\\\\b & x > 0\\end{cases}",
			"\\big\\{a\\big\\}", "\\oint_a^b x", "\\bigsqcup_a^b x",
			"\\coprod_a^b x", "\\bigcup_a^b x", "\\bigwedge_a^b x",
			"\\bigoplus" ];
	var m_greek = [ "\\alpha", "\\beta", "\\gamma", "\\delta", "\\epsilon",
			"\\varepsilon", "\\zeta", "\\eta", "\\theta", "\\vartheta",
			"\\gamma", "\\kappa", "\\lambda", "\\mu", "\\nu", "\\xi", "o",
			"\\pi", "\\varpi", "\\rho", "\\varrho", "\\sigma", "\\varsigma",
			"\\tau", "\\upsilon", "\\phi", "\\varphi", "\\chi", "\\psi",
			"\\omega", "\\Gamma", "\\Delta", "\\Theta", "\\Lambda", "\\Xi",
			"\\Pi", "\\Sigma", "\\Upsilon", "\\Phi", "\\Psi", "\\Omega", "\\$" ];
	var m_rel = [ "\\leq", "\\prec", "\\preceq", "\\ll", "\\subset",
			"\\subseteq", "\\sqsubset", "\\sqsubseteq", "\\in", "\\vdash", ">",
			"\\smile", "\\sim", "\\asymp", "\\equiv", "\\mid", "\\neq",
			"\\perp", ":", "\\geq", "\\succ", "\\succeq", "\\gg", "\\supset",
			"\\supseteq", "\\sqsupset", "\\sqsupseteq", "\\ni", "\\dashv", "<",
			"\\frown", "\\simeq", "\\approx", "\\parallel", "\\propto" ];
	var m_logic = [ "\\hat{a}", "\\acute{a}", "\\bar{a}", "\\dot{a}",
			"\\breve{a}", "\\check{a}", "\\grave{a}", "\\vec{a}", "\\ddot{a}",
			"\\tilde{a}", "+", "\\times", "\\cap", "\\cup", "\\vee",
			"\\setminus", "\\bigtriangleup", "\\triangleright", "\\oplus",
			"\\otimes", "\\odot", "\\uplus", "\\ast", "\\circ", "-", "\\div",
			"\\sqcup", "\\sqcap", "\\wedge", "\\wr", "\\bigtriangledown",
			"\\triangleleft", "\\ominus", "\\oslash", "\\bigcirc", "\\amalg",
			"\\star", "\\bullet" ];
	var m_symbol = [ "\\ldots", "\\vdots", "\\mp", "\\times", "/", "|",
			"\\imath", "\\nabla", "\\top", "\\forall", "\\neg", "\\partial",
			"\\Re", "\\aleph", "\\ell", "\\wp", "\\prime", "\\surd",
			"\\natural", "\\clubsuit", "\\cdots", "\\ddots", "\\pm", "\\div",
			"\\backslash", "\\|", "\\jmath", "\\triangle", "\\bot", "\\exists",
			"\\flat", "\\infty", "\\Im", "\\hbar", "\\emptyset", ".",
			"\\angle", "\\sharp", "\\Diamond", "\\spadesuit" ];
	var m_arrow = [ "\\leftarrow", "\\Leftarrow", "\\leftrightarrow",
			"\\mapsto", "\\leftharpoonup", "\\rightharpoonup",
			"\\longleftarrow", "\\Longleftarrow", "\\longleftrightarrow",
			"\\uparrow", "\\downarrow", "\\updownarrow", "\\rightleftharpoons",
			"\\nearrow", "\\searrow", "\\rightarrow", "\\Rightarrow",
			"\\Leftrightarrow", "\\leftharpoondown", "\\rightharpoondown",
			"\\longrightarrow", "\\Longrightarrow", "\\Longleftrightarrow",
			"\\Uparrow", "\\Downarrow", "\\Updownarrow", "\\nwarrow",
			"\\swarrow" ];
	var m_math_rect = [ "2,2,29,47", "31,2,58,47", "60,2,87,47", "89,2,119,47",
			"121,2,148,47", "150,2,177,47", "179,2,214,47", "216,2,314,47",
			"316,2,344,47", "346,2,378,47", "380,2,420,47", "422,2,459,47",
			"461,2,493,47", "495,2,527,47", "529,2,556,47", "2,49,29,94",
			"31,49,58,94", "60,49,87,94", "89,49,119,94", "121,49,148,94",
			"150,49,177,94", "179,49,214,94", "216,49,314,94", "316,49,344,94",
			"346,49,378,94", "380,49,420,94", "422,49,459,94", "461,49,493,94",
			"495,49,527,94", "529,49,556,94" ];
	var m_greek_rect = [ "2,2,29,22", "31,2,58,22", "60,2,87,22",
			"89,2,116,22", "118,2,145,22", "147,2,174,22", "176,2,203,22",
			"205,2,232,22", "234,2,261,22", "263,2,290,22", "292,2,319,22",
			"321,2,348,22", "350,2,377,22", "379,2,406,22", "408,2,435,22",
			"437,2,464,22", "466,2,493,22", "495,2,522,22", "524,2,551,22",
			"553,2,580,22", "582,2,609,22", "2,24,29,44", "31,24,58,44",
			"60,24,87,44", "89,24,116,44", "118,24,145,44", "147,24,174,44",
			"176,24,203,44", "205,24,232,44", "234,24,261,44", "263,24,290,44",
			"292,24,319,44", "321,24,348,44", "350,24,377,44", "379,24,406,44",
			"408,24,435,44", "437,24,464,44", "466,24,493,44", "495,24,522,44",
			"524,24,551,44", "553,24,580,44", "582,24,609,44" ];
	var m_rel_rect = [ "2,2,29,28", "31,2,58,28", "60,2,87,28", "89,2,116,28",
			"118,2,145,28", "147,2,174,28", "176,2,203,28", "205,2,232,28",
			"234,2,261,28", "263,2,290,28", "292,2,319,28", "321,2,348,28",
			"350,2,377,28", "379,2,406,28", "408,2,435,28", "437,2,464,28",
			"466,2,493,28", "2,30,29,51", "31,30,58,51", "60,30,87,51",
			"89,30,116,51", "118,30,145,51", "147,30,174,51", "176,30,203,51",
			"205,30,232,51", "234,30,261,51", "263,30,290,51", "292,30,319,51",
			"321,30,348,51", "350,30,377,51", "379,30,406,51", "408,30,435,51",
			"437,30,464,51", "466,30,493,51", "495,30,522,51" ];
	var m_logic_rect = [ "2,2,29,24", "31,2,58,24", "60,2,87,24",
			"89,2,116,24", "118,2,145,24", "147,2,174,24", "176,2,203,24",
			"205,2,232,24", "234,2,261,24", "263,2,290,24", "292,2,319,24",
			"321,2,348,24", "350,2,377,24", "379,2,406,24", "408,2,435,24",
			"437,2,464,24", "466,2,493,24", "495,2,522,24", "524,2,551,24",
			"2,26,29,52", "31,26,58,52", "60,26,87,52", "89,26,116,52",
			"118,26,145,52", "147,26,174,52", "176,26,203,52", "205,26,232,52",
			"234,26,261,52", "263,26,290,52", "292,26,319,52", "321,26,348,52",
			"350,26,377,52", "379,26,406,52", "408,26,435,52", "437,26,464,52",
			"466,26,493,52", "495,26,522,52", "524,26,551,52" ];
	var m_symbol_rect = [ "2,2,29,26", "31,2,58,26", "60,2,87,26",
			"89,2,116,26", "118,2,145,26", "147,2,174,26", "176,2,203,26",
			"205,2,232,26", "234,2,261,26", "263,2,290,26", "292,2,319,26",
			"321,2,348,26", "350,2,377,26", "379,2,406,26", "408,2,435,26",
			"437,2,464,26", "466,2,493,26", "495,2,522,26", "524,2,551,26",
			"553,2,580,26", "2,28,29,54", "31,28,58,54", "60,28,87,54",
			"89,28,116,54", "118,28,145,54", "147,28,174,54", "176,28,203,54",
			"205,28,232,54", "234,28,261,54", "263,28,290,54", "292,28,319,54",
			"321,28,348,54", "350,28,377,54", "379,28,406,54", "408,28,435,54",
			"437,28,464,54", "466,28,493,54", "495,28,522,54", "524,28,551,54",
			"553,28,580,54" ];
	var m_arrow_rect = [ "2,2,29,25", "31,2,58,25", "60,2,87,25",
			"89,2,116,25", "118,2,145,25", "147,2,174,25", "176,2,214,25",
			"216,2,254,25", "256,2,294,25", "296,2,323,25", "325,2,352,25",
			"354,2,381,25", "383,2,410,25", "412,2,439,25", "2,27,29,50",
			"31,27,58,50", "60,27,87,50", "89,27,116,50", "118,27,145,50",
			"147,27,174,50", "176,27,214,50", "216,27,254,50", "256,27,294,50",
			"296,27,323,50", "325,27,352,50", "354,27,381,50", "383,27,410,50",
			"412,27,439,50" ];
	var s_algebra = [
			"\\left(x-1\\right)\\left(x+3\\right)",
			"\\sqrt{a^2+b^2}",
			"x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}}",
			"x = a_0 + \\frac{1}{\\displaystyle a_1 + \\frac{1}{\\displaystyle a_2 + \\frac{1}{\\displaystyle a_3 + a_4}}}",
			"\\sqrt{\\frac{x^2}{k+1}}\\qquad\nx^{\\frac{2}{k+1}}\\qquad\n\\frac{\\partial^2f}{\\partial x^2}" ];
	var s_calculus = [ "\\frac{\\partial y}{\\partial x}",
			"\\frac{d}{dx}c^n=nx^{n-1}", "\\frac{d}{dx}e^{ax}=a\\,e^{ax}",
			"\\frac{d}{dx}\\ln(x)=\\frac{1}{x}",
			"\\frac{d}{dx}\\sin x=\\cos x", "a_i^2 + b_j^2 = c_k^2" ];
	var s_stats = [ "{^n}C_r", "\\frac{n!}{r!(n-r)!}", "\\sum_{i=1}^{n}{X_i}",
			"\\sum_{i=1}^{n}{X_i^2}",
			"\\sum_{i=1}^{n}{(X_i - \\overline{X})^2}", "X_1, \\cdots,X_n",
			"\\frac{x-\\mu}{\\sigma}" ];
	var s_set = [ "\\bigcup_{i=1}^{n}{X_i}", "\\bigcap_{i=1}^{n}{X_i}" ];
	var s_trig = [ "\\cos^{-1}\\theta", "\\sin^{-1}\\theta", "e^{i \\theta}",
			"\\left(\\frac{\\pi}{2}-\\theta \\right )",
			"\\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}",
			"\\int_{0}^{\\pi} \\sin x \\, dx = 2" ];
	var s_physics = [ "\\vec{F}=m\\vec{a}", "e=m c^2",
			"\\vec{F}=m \\frac{d \\vec{v}}{dt} + \\vec{v}\\frac{dm}{dt}",
			"\\oint \\vec{F} \\cdot d\\vec{s}=0",
			"\\vec{F}_g=-F\\frac{m_1 m_2}{r^2} \\vec{e}_r" ];
	var s_matrices = [
			"\\begin{pmatrix}\n a_{11} & a_{12} \\\\\n a_{21} & a_{22}\n \\end{pmatrix}",
			"\\begin{pmatrix}\n a_{11} & a_{12} & a_{13}\\\\\n a_{21} & a_{22} & a_{23}\\\\\n a_{31} & a_{32} & a_{33}\n \\end{pmatrix}",
			"\\begin{pmatrix}\n a_{11} & \\cdots & a_{1n}\\\\\n \\vdots & \\ddots & \\vdots\\\\\n a_{m1} & \\cdots & a_{mn}\n \\end{pmatrix}",
			"\\begin{pmatrix}\n 1 & 0 \\\\\n 0 & 1\n \\end{pmatrix}",
			"\\mathbf{X} = \\left(\n\\begin{array}{ccc}\nx_1 & x_2 & \\ldots \\\\\nx_3 & x_4 & \\ldots \\\\\n\\vdots & \\vdots & \\ddots\n\\end{array} \\right)" ];
	var s_chemistry = [ "_{10}^{5}C^{16}",
			"2H_2 + O_2 {\\overset{n,m}{\\longrightarrow}} 2H_2O",
			"A\\underset{b}{\\overset{a}{\\longleftrightarrow}}B",
			"A\\underset{0}{\\overset{a}{\\rightleftharpoons}}B",
			"A\\underset{0^{\\circ}C }{\\overset{100^{\\circ}C}{\\rightleftharpoons}}B" ];
	var samples = [
			"\\left(x-1\\right)\\left(x+3\\right)",
			"\\sqrt{a^2+b^2}",
			"a_i^2 + b_j^2 = c_k^2",
			"\\sum_{i=1}^{n} x_{i}^{2}",
			"x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}}",
			"x = a_0 + \\frac{1}{\\displaystyle a_1 + \\frac{1}{\\displaystyle a_2 + \\frac{1}{\\displaystyle a_3 + a_4}}}",
			"\\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}",
			"\\int_{0}^{\\pi} \\sin x \\, dx = 2",
			"\\frac{d}{d\\theta} \\sin(\\theta) = \\cos(\\theta)",
			"\\mathbf{X} = \\left(\n\\begin{array}{ccc}\nx_1 & x_2 & \\ldots \\\\\nx_3 & x_4 & \\ldots \\\\\n\\vdots & \\vdots & \\ddots\n\\end{array} \\right)" ];
	function insertAtCaret(d, g) {
		if (document.selection) {
			d.focus();
			var e = document.selection.createRange();
			e.text = g;
			d.focus()
		} else {
			if (d.selectionStart || d.selectionStart === 0) {
				if (d.value) {
					g = " " + g + " "
				} else {
					g = g + " "
				}
				var h = d.value.length;
				var b = d.selectionStart;
				var a = d.selectionEnd;
				var f = d.scrollTop;
				d.value = d.value.substring(0, b) + g
						+ d.value.substring(a, d.value.length);
				d.focus();
				d.selectionStart = b + g.length;
				d.selectionEnd = b + g.length;
				d.scrollTop = f
			} else {
				if (d.value) {
					g = " " + g
				}
				var h = d.value.length;
				d.value += g;
				d.focus()
				get_mathimage();
			}
		}
	}
	var make_image_timer;
	
	// 이미지
	function get_mathimage() {
		var e = "";
		if (_getid("latex_enablecolor").checked) {
			var k = _getid("latex_transparent").value;
			var i = "bg,s," + _getid("latex_bgcolor").value;
			if (k == 1) {
				i = "bg,s," + _getid("latex_bgcolor").value + "80"
			} else {
				if (k == 2) {
					i = "a,s," + _getid("latex_bgcolor").value + "80"
				}
			}
			e = "&chf=" + encodeURIComponent(i) + "&chco="
					+ _getid("latex_textcolor").value
		}
		var j = "";
		var g = _getid("latex_height").value;
		if (g > 0) {
			j = "&chs=" + g
		}
		var d = _getid("latex_src");
		if (!d.value) {
			clear_mathimage();
			return
		}
		var f = d.value;
		_getid("latex_length").innerHTML = f.length + " characters";
		if (f.length > 200) {
			_getid("latex_msg").innerHTML = "&nbsp;Exceeds the maximum formula length of 200 characters."
		} else {
			_getid("latex_msg").innerHTML = ""
		}
		var i = "http://chart.apis.google.com/chart?cht=tx&chl="
				+ encodeURIComponent(f) + e + j;
		var c = _getid("latex_img");
		c.src = i;
		
		// 작은 크기로 수식을 입력하면 해상도가 많이 떨어진다. 
		// 이를 보완하기 위해 큰 이미지로 만든 다음 원래 가로세로폭으로 줄이는 방법을 쓴다.
		// 
		//  이미지의 width,height값을 가져오기 위해서는 display가 none이 아니어야함
		
		c.style.display="";
		var i = "http://chart.apis.google.com/chart?cht=tx&chs=100&chl="
			+ encodeURIComponent(f) + e;
				
		var width = c.width ;
		var height = c.height ;
		//alert('width : '+width+' height : '+height);
		
		_getid("latex_imglink").value = i;		
		/* 나중에 저장버튼을 누르면 들어가게될 이미지. 이미지를 크게 한 후 원래 크기로 축소하여 퀄리티를 높임 */
		// vertical-align:middle로 설정한 이유는 이미지 삽입 후 텍스트의 상대위치가 이미지 가운데로 오게 하기 위함이다.
		_getid("latex_link").value = '<img style="vertical-align:middle; width:'+width+'px; height:'+height+'px;"  src="'+i+'">';
		
		_getid("latex_error").style.display = "none";
		_getid("latex_download").href = "#"
					
		_getid("latex_download").style.display = "";
		_getid("btn_short_link").disabled = false
	}
	
	function sendImg(){
				
		var zip1 = _getid("latex_link").value;					
		
		opener.Editor.getCanvas().pasteContent(zip1);
		self.close();
	}
	
	function make_mathimage() {
		if (!_getid("latex_src").value) {
			alert("데이터를 입력하세요!");
			_getid("latex_src").focus();
			return
		}
		get_mathimage()
	}
	function clear_mathimage() {
		_getid("latex_src").value = "";
		_getid("latex_img").style.display = "none";
		_getid("latex_error").style.display = "none";
		_getid("latex_imglink").value = "";
		_getid("latex_link").value = "";
		_getid("latex_download").style.display = "none";
		_getid("btn_short_link").disabled = true;
		_getid("latex_msg").innerHTML = ""
	}
	function proc_imgerror(a) {
		a.src = "http://atomurl.net/math/img/blank.png";
		_getid("latex_img").style.display = "none";
		_getid("latex_error").style.display = ""
	}
	function proc_show(h) {
		setCookie("math_selecttab", h);
		if ((h == "div_useradd") && !math_useradd_added) {
			math_useradd_added = true;
			for (var e = 0; e < math_useradd.length; e++) {
				if (e >= 15) {
					break
				}
				var c = math_useradd[e];
				add_useradd(c)
			}
		}
		_getid("div_sample").style.display = "none";
		_getid("div_useradd").style.display = "none";
		_getid("div_usernote").style.display = "none";
		_getid("div_userdata").style.display = "none";
		var d = document.getElementById(h);
		if (d) {
			d.style.display = "";
			var c = d.getElementsByTagName("*");
			for (var e = 0; e < c.length; e++) {
				if ((c[e].type == "text") || (c[e].type == "textarea")) {
					c[e].focus();
					break
				}
			}
		}
		var d = document.getElementById("tab_select");
		if (d) {
			var c = d.getElementsByTagName("a");
			for (var e = 0; e < c.length; e++) {
				c[e].innerHTML = _getinnertext(c[e])
			}
		}
		var g = document.getElementById("tab_" + h);
		if (g) {
			g.innerHTML = "<b>" + _getinnertext(g) + "<b>"
		}
	}
	function option_onchange() {
		option_setcontrol();
		if (_getid("latex_src").value) {
			get_mathimage()
		}
	}
	function option_setcontrol() {
		var e = _getid("latex_enablecolor").checked;
		if (e) {
			e = false
		} else {
			e = true
		}
		var d = _getid("latex_bgcolor");
		var g = _getid("latex_textcolor");
		d.disabled = e;
		g.disabled = e;
		_getid("latex_transparent").disabled = e;
		if (d.value == g.value) {
			var f = "FFFFFF";
			if (d.value == f) {
				f = "000000"
			}
			g.value = f;
			g.style.backgroundColor = "#" + g.value
		}
		setCookie("math_latex_enablecolor", _getid("latex_enablecolor").checked);
		setCookie("math_latex_bgcolor", _getid("latex_bgcolor").value);
		setCookie("math_latex_textcolor", _getid("latex_textcolor").value);
		setCookie("math_latex_transparent", _getid("latex_transparent").value);
		setCookie("math_latex_height", _getid("latex_height").value)
	}
	var math_useradd = [];
	var math_useradd_id = 0;
	var math_useradd_added = false;
	function add_mathimage() {
		if (!window.localStorage || !window.JSON) {
			alert("이 브라우저는 지원하지 않습니다.");
			return
		}
		if (math_useradd.length >= 15) {
			alert(sprintf("더 이상 추가할 수 없습니다. 최대 가능한 갯수는 %s개 입니다.", 15));
			return
		}
		var e = _getid("latex_src").value;
		if (!e) {
			alert("입력한 데이터가 없습니다.");
			return
		}
		var c = {};
		var f = new Date();
		c.time = f.getTime();
		c.data = e;
		c.enablecolor = _getid("latex_enablecolor").checked;
		c.bgcolor = _getid("latex_bgcolor").value;
		c.textcolor = _getid("latex_textcolor").value;
		c.transparent = _getid("latex_transparent").value;
		c.height = _getid("latex_height").value;
		math_useradd_id++;
		c.id = math_useradd_id;
		math_useradd[math_useradd.length] = c;
		add_useradd(c);
		localStorage[g_storage_name2] = JSON.stringify(math_useradd);
		proc_show("div_useradd");
		var d = _getid("div_useradd");
		d.scrollTop = d.scrollHeight
	}
	function select_useradd(d) {
		for (var c = 0; c < math_useradd.length; c++) {
			var a = math_useradd[c];
			if (a.id == d) {
				_getid("latex_src").value = a.data;
				_getid("latex_enablecolor").checked = a.enablecolor;
				_getid("latex_transparent").value = a.transparent;
				_getid("latex_bgcolor").value = a.bgcolor;
				_getid("latex_bgcolor").style.backgroundColor = "#" + a.bgcolor;
				_getid("latex_textcolor").value = a.textcolor;
				_getid("latex_textcolor").style.backgroundColor = "#"
						+ a.textcolor;
				_getid("latex_height").value = a.height;
				get_mathimage();
				break
			}
		}
	}
	function clear_useradd() {
		var d = confirm("확실합니까?");
		if (!d) {
			return
		}
		math_useradd = [];
		localStorage[g_storage_name2] = JSON.stringify(math_useradd);
		var b = _getid("div_useradd").getElementsByTagName("div");
		for (var c = b.length - 1; c >= 0; c--) {
			_getid("div_useradd").removeChild(b[c])
		}
		_getid("btn_useradd").disabled = true
	}
	function del_useradd(d) {
		for (var c = 0; c < math_useradd.length; c++) {
			if (math_useradd[c].id == d) {
				math_useradd.splice(c, 1);
				break
			}
		}
		var b = _getid("div_useradd").getElementsByTagName("div");
		for (var c = 0; c < b.length; c++) {
			if (b[c].id == d) {
				_getid("div_useradd").removeChild(b[c]);
				break
			}
		}
		localStorage[g_storage_name2] = JSON.stringify(math_useradd);
		if (math_useradd.length == 0) {
			_getid("btn_useradd").disabled = true
		}
	}
	function add_useradd(j) {
		var f = _getid("div_useradd");
		var i = document.createElement("div");
		var d = "";
		if (j.enablecolor) {
			var a = j.transparent;
			var m = "bg,s," + j.bgcolor;
			if (a == 1) {
				m = "bg,s," + j.bgcolor + "80"
			} else {
				if (a == 2) {
					m = "a,s," + j.bgcolor + "80"
				}
			}
			d = "&chf=" + encodeURIComponent(m) + "&chco=" + j.textcolor
		}
		var e = "";
		var g = j.height;
		if (g > 0) {
			e = "&chs=" + g
		}
		var k = j.data;
		if (k.length > 200) {
			k = k.substr(0, 200)
		}
		var l = "http://chart.apis.google.com/chart?cht=tx&chl="
				+ encodeURIComponent(k) + d + e;
		var m = '<table><tr><td valign=top><button onclick="select_useradd('
				+ j.id + ')">Select</button><br><button onclick="del_useradd('
				+ j.id + ')">Del</button><td><img src="'+l+'"></table>';
		i.id = j.id;
		i.innerHTML = m;
		f.appendChild(i);
		_getid("btn_useradd").disabled = false
	}
	var g_storage_name = "math_config";
	var g_storage_name2 = "math_useradd";
	function savestorage() {
		if (!window.localStorage || !window.JSON) {
			return
		}
		var b = {};
		b.latex_src = _getid("latex_src").value + "";
		b.usernote = _getid("usernote").value + "";
		var c = JSON.stringify(b);
		localStorage[g_storage_name] = c
	}
	function loadstorage() {
		if (!window.localStorage || !window.JSON) {
			return
		}
		try {
			var b = JSON.parse(localStorage[g_storage_name])
		} catch (c) {
			return
		}
		if (!b) {
			return
		}
		if (b.latex_src != null) {
			_getid("latex_src").value = b.latex_src
		}
		if (b.usernote != null) {
			_getid("usernote").value = b.usernote
		}
	}
	var last_longurl, last_shorturl;
	function proc_shortlink() {
		var c = _getid("latex_img").src;
		if (!c || (_getid("latex_img").style.display != "")) {
			alert("생성된 이미지가 없습니다.");
			return
		}
		if (last_longurl == c) {
			_getid("latex_short_imglink").value = last_shorturl;
			_getid("latex_short_link").value = '<img src="'+last_shorturl+'">';
			_getid("div_short_link").style.display = "";
			return
		}
		var b = new sack();
		
		var d = "http://atomurl.net/qrcode/shorturl.php?url="+encodeURIComponent(c);
		
		b.requestFile = d;
		b.onCompletion = function() {
			_getid("img_short_link_wait").style.display = "none";
			_getid("btn_short_link").disabled = false;
			 if (b.response == "") {
				alert("오류가 있습니다.");
				return
			} 
			_getid("latex_short_imglink").value = b.response;
			_getid("latex_short_link").value = '<img src="'+b.response+'">';
			_getid("div_short_link").style.display = "";
			last_longurl = c;
			last_shorturl = b.response
		};
		_getid("img_short_link_wait").style.display = "";
		_getid("latex_short_imglink").value = "";
		_getid("latex_short_link").value = "";
		_getid("btn_short_link").disabled = true;
		b.runAJAX()
	}
	function proc_shortlink_close() {
		_getid("div_short_link").style.display = "none"
	}
	function proc_export() {
		if (!window.localStorage || !window.JSON) {
			alert("이 브라우저는 지원하지 않습니다.");
			return
		}
		var d = {};
		d.storage1 = localStorage[g_storage_name];
		d.storage2 = localStorage[g_storage_name2];
		var c = _getid("import");
		c.value = JSON.stringify(d);
		alert("내보낸 데이터를 클립보드등에 복사하세요.");
		c.focus();
		c.select()
	}
	function proc_import() {
		if (!window.localStorage || !window.JSON) {
			alert("이 브라우저는 지원하지 않습니다.");
			return
		}
		var c = _getid("import").value;
		if (!c) {
			alert("데이터를 입력하세요!");
			_getid("import").focus();
			return
		}
		var e = confirm("기존 사용자 정보에 덮어씌워집니다. 가져오기를 계속 진행하시겠습니까?");
		if (!e) {
			return
		}
		try {
			var b = JSON.parse(c)
		} catch (d) {
			alert("오류가 있습니다.\n\n" + d);
			return
		}
		if (!b) {
			return
		}
		if (b.storage1) {
			localStorage[g_storage_name] = b.storage1
		}
		if (b.storage2) {
			localStorage[g_storage_name2] = b.storage2
		}
		alert("가져오기가 성공했습니다. 이 페이지를 다시 읽습니다.");
		location.href = location.href
	}
	function proc_clearall() {
		if (!window.localStorage || !window.JSON) {
			alert("이 브라우저는 지원하지 않습니다.");
			return
		}
		var a = confirm("모든 사용자 정보가 삭제됩니다.\n\n확실합니까?");
		if (!a) {
			return
		}
		localStorage[g_storage_name] = "";
		localStorage[g_storage_name2] = "";
		isinited = false;
		alert("이 페이지를 다시 읽습니다.");
		location.href = location.href
	}
	var isinited = false;
	function init() {
		loadstorage();
		if (window.localStorage && window.JSON) {
			try {
				math_useradd = JSON.parse(localStorage[g_storage_name2]);
				for (var e = 0; e < math_useradd.length; e++) {
					var c = math_useradd[e];
					c.id = e;
					math_useradd_id = e
				}
			} catch (f) {
			}
		}
		if (!math_useradd) {
			math_useradd = []
		}
		_getid("latex_enablecolor").checked = toBool(getCookie(
				"math_latex_enablecolor", "false"));
		_getid("latex_bgcolor").value = getCookie("math_latex_bgcolor",
				"FFFFFF");
		_getid("latex_textcolor").value = getCookie("math_latex_textcolor",
				"000000");
		_getid("latex_transparent").value = getCookie("math_latex_transparent",
				0);
		_getid("latex_height").value = getCookie("math_latex_height", 0);
		_getid("latex_bgcolor").style.backgroundColor = "#"
				+ _getid("latex_bgcolor").value;
		_getid("latex_textcolor").style.backgroundColor = "#"
				+ _getid("latex_textcolor").value;
		_getid("latex_src").onkeyup = function(b) {
			if (ismsie) {
				b = event
			}
			var a = b.keyCode;
			if ((a >= 37) && (a <= 40)) {
				return
			}
			if ((a >= 33) && (a <= 36)) {
				return
			}
			_getid("latex_length").innerHTML = _getid("latex_src").value.length
					+ " characters";
			clearTimeout(make_image_timer);
			make_image_timer = setTimeout(get_mathimage, 50)
		};
		var d = getCookie("math_selecttab");
		if (!d) {
			d = "div_sample"
		}
		if (!_getid(d)) {
			d = "div_sample"
		}
		proc_show(d);
		option_setcontrol();
		_getid("latex_imglink").onclick = function() {
			this.focus();
			this.select()
		};
		_getid("latex_link").onclick = function() {
			this.focus();
			this.select()
		};
		_getid("latex_short_imglink").onclick = function() {
			this.focus();
			this.select()
		};
		_getid("latex_short_link").onclick = function() {
			this.focus();
			this.select()
		};
		get_mathimage();
		isinited = true;
		if (isopera || issafari) {
			setInterval(function() {
				if (window.savestorage) {
					savestorage()
				}
			}, 2000)
		}
	}
	function deinit() {
		if (isinited) {
			savestorage()
		}
	};
</script>

</head>
<body leftmargin=50 onload='get_mathimage();' onunload='deinit()'>
	<script>
		if (self != top) {
			top.location = self.location;
			//self.location="about:blank";
		}
	</script>
	<br>

	<table>
		<tr>
			<!-- <td><a href='./' title='처음으로'><img src='img/logo.jpg' border=0 width=48></a>
<td width=5>	
<td><font style='font-size:25px;font-family:Verdana;color:#1C7E12'>TeX 수식 편집기</font>
<script>
var ischrome=false;
if (navigator.appName=="Netscape"){
	if (navigator.userAgent.indexOf("Chrome")>=0) ischrome=true;
}
//if (ischrome){	
	document.write("<td width=5><td><a style='font-size:13px' href='https://chrome.google.com/webstore/detail/eggdddnmjoomglnkjhcpcnjbieiojini' target='_blank' title='Add apps to Chrome'><img src='http://atomurl.net/img/addtochrome_small.png' border=0></a>");	
//}
</script>		
<td> -->
			<!-- <table><tr>
	<td>
<div id="fb-root"></div>
<div class="fb-like" data-href="http://atomurl.net/math/" data-send="false" data-layout="button_count" data-width="50" data-show-faces="true"></div>
<script>
function init_fb_like_btn(){
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
}
if (window.addEventListener){
	window.addEventListener("load", init_fb_like_btn, false);
}else if (window.attachEvent){
	window.attachEvent("onload", init_fb_like_btn);
}
</script>

<td width=2>
	
<td>
<div class="g-plusone" data-href="http://atomurl.net/math/"></div>
<script type="text/javascript">
  (function() {
  	var blang = window.navigator.userLanguage || window.navigator.language;
  	if (!blang) blang='en';
	window.___gcfg = {
        lang: blang
	};
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
	
</table> -->
	</table>

	<script>
		function latex_func_onchange(f) {
			var s = f.value;
			if (!s)
				return;
			insertAtCaret(_getid('latex_src'), s);
			clearTimeout(make_image_timer);
			make_image_timer = setTimeout(get_mathimage, 500);
			get_mathimage();
		}

		function table_onclick(f) {
			var s = f.title;
			insertAtCaret(_getid('latex_src'), s);
			clearTimeout(make_image_timer);
			make_image_timer = setTimeout(get_mathimage, 500);
			get_mathimage();
		}

		function table_onmouseover(f) {
			f.style.border = "1px solid black";
		}

		function table_onmouseout(f) {
			f.style.border = "1px solid white";
		}

		function make_img_table(arr, arr2, name) {
			var s = '<img src="http://atomurl.net/math/img/latex/'+name+'.png" usemap="#map_'+name+'" border=0>';
			s += '<map name="map_'+name+'">';
			for (var i = 0; i < arr2.length; i++) {
				s += '<area shape="rect" title="'
						+ html_entity_encode(arr[i])
						+ '" coords="'
						+ arr2[i]
						+ '" onclick="table_onclick(this)" href="javascript:void(0);">';
			}
			s += '</map>';
			document.write(s);
		}
	</script>

	<table>
		<tr>
			<td><script type="text/javascript">
				google_ad_client = "ca-pub-1113541014872557";
				google_ad_slot = "1425142893";
				google_ad_width = 728;
				google_ad_height = 90;
			</script>
	</table>

	<table cellspacing=0 cellpadding=0 border=0>
		<tr>
			<td><script>
				make_img_table(m_math, m_math_rect, 'math');
			</script>
		<tr>
			<td><script>
				make_img_table(m_greek, m_greek_rect, 'greek');
			</script>
		<tr>
			<td><table cellspacing=0 cellpadding=0>
					<tr>
						<td><script>
							make_img_table(m_rel, m_rel_rect, 'rel');
						</script>
						<td width=10>
						<td><script>
							make_img_table(m_logic, m_logic_rect, 'logic');
						</script>
				</table>
		<tr>
			<td><table cellspacing=0 cellpadding=0>
					<tr>
						<td><script>
							make_img_table(m_symbol, m_symbol_rect, 'symbol');
						</script>
						<td width=10>
						<td><script>
							make_img_table(m_arrow, m_arrow_rect, 'arrow');
						</script>
				</table>
	</table>

	<table border=0 width=1000>
		<tr>
			<td width=500><textarea id='latex_src' class='textareaedit'></textarea>
				<!--<button onclick='make_mathimage()'>Create</button>//-->
				<button style='font-size: 15px' onclick='clear_mathimage()'>지우기</button>
				<button style='font-size: 15px' onclick='add_mathimage()'>사용자
					수식에 추가</button> <select id='latex_func'
				onchange="latex_func_onchange(this); this.selectedIndex=0;">
					<option selected="selected" value="">함수</option>
					<optgroup label="Logs">
						<option value="\exp">exp</option>
						<option value="\lg">lg</option>
						<option value="\ln">ln</option>
						<option value="\log">log</option>
						<option value="\log_{e}">log e</option>
						<option value="\log_{10}">log 10</option>
					</optgroup>
					<optgroup label="Limits">
						<option value="\lim">limit</option>
						<option value="\liminf">liminf</option>
						<option value="\limsup">limsup</option>
						<option value="\max">maximum</option>
						<option value="\min">minimum</option>
						<option value="\infty">infinite</option>
					</optgroup>
					<optgroup label="Trig">
						<option value="\sin">sin</option>
						<option value="\cos">cos</option>
						<option value="\tan">tan</option>
						<option value="\csc">csc</option>
						<option value="\sec">sec</option>
						<option value="\cot">cot</option>
						<option value="\sinh">sinh</option>
						<option value="\cosh">cosh</option>
						<option value="\tanh">tanh</option>
						<option value="\coth">coth</option>
					</optgroup>
					<optgroup label="Inverse Trig">
						<option value="\arcsin">arcsin</option>
						<option value="\arccos">arccos</option>
						<option value="\arctan">arctan</option>
						<option value="\sin^{-1}">sin-1</option>
						<option value="\cos^{-1}">cos-1</option>
						<option value="\tan^{-1}">tan-1</option>
						<option value="\sinh^{-1}">sinh-1</option>
						<option value="\cosh^{-1}">cosh-1</option>
						<option value="\tanh^{-1}">tanh-1</option>
					</optgroup>
					<optgroup label="Operators">
						<option value="\arg">arg</option>
						<option value="\det">det</option>
						<option value="\dim">dim</option>
						<option value="\gcd">gcd</option>
						<option value="\hom">hom</option>
						<option value="\ker">ker</option>
						<option value="\Pr">Pr</option>
						<option value="\sup">sup</option>
					</optgroup>
			</select> <span id='latex_msg' style='color: green; font-size: 12px'></span>
			<td valign=top>

				<table>
					<tr>
						<td><label><input type=checkbox
								id='latex_enablecolor' onclick='option_onchange()'>색깔 사용</label>
					<tr>
						<td>배경색 <input class="color" id="latex_bgcolor" value=""
							style='width: 90px' onchange='option_onchange()'>
					<tr>
						<td>글자색 <input class="color" id="latex_textcolor" value=""
							style='width: 90px' onchange='option_onchange()'> <a
							style="color: #00E;" href="http://iblogbox.com/devtools/color"
							target="_blank">Color Tools</a>
					<tr>
						<td><select id='latex_transparent'
							onchange='option_onchange()'>
								<option value=0>No transparent
								<option value=1>Background transparent
								<option value=2>Entire image transparent
						</select>
					<tr>
						<td>높이 <input type="text" id="latex_height" value="150"
							style="width: 80px" onchange='option_onchange()'> (0:
							자동크기)
					<tr>
						<td><span id='latex_length' style='color: green'></span>
				</table>
	</table>

	<div id='div_latex'>
		<table height=90>
			<tr>
				<td valign=top><img id='latex_img' style='display: none; '
					src='http://atomurl.net/math/img/blank.png' onerror='proc_imgerror(this)'>
					<div id='latex_error' style='display: none; color: red'>Invalid
						equation</div>
		</table>
	</div>


	
	<table>
		<tr>
			<td>이미지 링크
			<td><input type=text id='latex_imglink' style='width: 500px'>
			<td><a style='display: none' id='latex_download' href='' onclick="sendImg()">저장</a>
		<tr>
			<td>태그 링크
			<td><input type=text id='latex_link' style='width: 500px'>
			<td><button id='btn_short_link' disabled=true
					onclick='proc_shortlink()'>짧은 주소 만들기</button> <img
				id='img_short_link_wait' style='display: none'
				src='http://atomurl.net/img/wait.gif'>
	</table>
	
	<div id='div_short_link' style='display: none'>
		<table>
			<tr>
				<td>이미지 링크
				<td><input type=text id='latex_short_imglink'
					style='width: 500px'>
			<tr>
				<td>태그 링크
				<td><input type=text id='latex_short_link' style='width: 500px'>
				<td><button onclick='proc_shortlink_close()'>닫기</button>
		</table>
	</div>
	<!--
<br>
<script type="text/javascript">
google_ad_client = "ca-pub-1113541014872557";
google_ad_slot = "8920820612";
google_ad_width = 728;
google_ad_height = 15;
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
//-->

	<table border=0 width=750 class='tabletext'>
		<tr>
			<td bgcolor='#E1F3DA'>
				<table cellpadding=3>
					<tr>
						<td>
							<div id='tab_select'>
								<a id='tab_div_sample' href='javascript:void(0)'
									onclick='proc_show("div_sample")'>수식 샘플</a>&nbsp;&nbsp; <a
									id='tab_div_useradd' href='javascript:void(0)'
									onclick='proc_show("div_useradd")'>사용자 수식</a>&nbsp;&nbsp; <a
									id='tab_div_usernote' href='javascript:void(0)'
									onclick='proc_show("div_usernote")'>사용자 메모</a>&nbsp;&nbsp; <a
									id='tab_div_userdata' href='javascript:void(0)'
									onclick='proc_show("div_userdata")'>내보내기,가져오기</a>&nbsp;&nbsp;
							</div>
				</table>
		<tr>
			<td>
				<div id='div_sample' style='display: none'>
					<script>
						function sample_onclick(name, idx) {
							var s = '';
							if (name == 'Algebra')
								s = s_algebra[idx];
							else if (name == 'Calculus')
								s = s_calculus[idx];
							else if (name == 'Stats')
								s = s_stats[idx];
							else if (name == 'Set')
								s = s_set[idx];
							else if (name == 'Trig')
								s = s_trig[idx];
							else if (name == 'Physics')
								s = s_physics[idx];
							else if (name == 'Matrices')
								s = s_matrices[idx];
							else if (name == 'Chemistry')
								s = s_chemistry[idx];

							insertAtCaret(_getid('latex_src'), s);
							clearTimeout(make_image_timer);
							make_image_timer = setTimeout(get_mathimage, 500);
							get_mathimage();
							
						}

						function make_sample(arr, name, name2) {
							var s = '<table border=0 cellspacing=2 cellpadding=1><tr><td width=100>'
									+ name2;
							for (var i = 0; i < arr.length; i++) {
								s += '<td class="tableclick" align=center onmouseover="table_onmouseover(this)" onmouseout="table_onmouseout(this)" onclick="sample_onclick(\''
										+ name
										+ '\','
										+ i
										+ ')"><img src="http://atomurl.net/math/img/sample/'
										+ name.toLowerCase()
										+ '_'
										+ (i + 1)
										+ '.png">';
							}
							document.write(s + '</table>');
						}

						make_sample(s_algebra, 'Algebra', "대수학");
						make_sample(s_calculus, 'Calculus', "계산법");
						make_sample(s_stats, 'Stats', "통계");
						make_sample(s_set, 'Set', "집합");
						make_sample(s_trig, 'Trig', "삼각법");
						make_sample(s_physics, 'Physics', "물리학");
						make_sample(s_matrices, 'Matrices', "행렬");
						make_sample(s_chemistry, 'Chemistry', "화학");
					</script>
				</div>

				<div id='div_useradd'
					style='display: none; width: 100%; height: 400px; overflow: auto'>
					<button id='btn_useradd' disabled=true onclick='clear_useradd()'>모두
						제거</button>
				</div>

				<div id='div_usernote'
					style='display: none; width: 100%; height: 400px'>
					<textarea id='usernote' style='width: 100%; height: 100%'></textarea>
				</div>

				<div id='div_userdata' style='display: none; width: 100%'>
					<table width=100%>
						<tr>
							<td><button onclick='proc_export()'>내보내기</button>
								<button onclick='proc_import()'>가져오기</button>
								<button onclick='proc_clearall()'>모두 제거</button>
						<tr>
							<td><textarea id='import' style='width: 100%; height: 200px'></textarea>
					</table>
				</div>
		<!-- <tr>
			<td>You can generate an image of a mathematical formula using
				the <a href='http://en.wikipedia.org/wiki/TeX' target='_blank'>TeX
					language</a> (pronounced "tek" or "tech"). This is useful for
				displaying complex formulas on your web page.<br> TeX equation
				editor that creates graphical equations. Produces code for directly
				embedding equations into HTML websites, forums or blogs. Images may
				also be dragged into other applications like Word.<br> This TeX
				equation editor uses Google Mathematical Formulas API. The maximum
				formula length is 200 characters. -->
	</table>

	<br>
	<!-- <table>
		<tr>
			<td><script type="text/javascript">
				google_ad_client = "ca-pub-1113541014872557";
				google_ad_slot = "1425142893";
				google_ad_width = 728;
				google_ad_height = 90;
			</script> <script type="text/javascript"
					src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
	
</script>
	</table> -->

	<br>
	<style>
.bottomtext {
	font-size: 14px;
	color: blue;
	text-decoration: none;
}

.bottomtext2 {
	font-size: 15px;
	color: blue;
}

.bottomtextbig {
	font-size: 17px;
	color: blue;
	text-decoration: none;
}
</style>

	<!-- <table cellpadding=0>
		<tr>
			<td>
				<table>
					<tr>
						<td><a href='http://atomurl.net/myip'><img
								src='http://atomurl.net/myip/img/logo20.png' border=0></a>
						<td><a href='http://atomurl.net/myip' class='bottomtext'>What
								is my IP address?</a>
						<td width=5>
						<td><a href='http://atomurl.net/qrcode'><img
								src='http://atomurl.net/qrcode/img/logo_small.png' width=20
								border=0></a>
						<td><a href='http://atomurl.net/qrcode' class='bottomtext'>QR
								Code Generator</a>
						<td width=5>
						<td><a href='http://atomurl.net/math'><img
								src='http://atomurl.net/math/img/logo20.png' border=0></a>
						<td><a href='http://atomurl.net/math' class='bottomtext'>TeX
								equation editor</a>
						<td width=5>
						<td><a href='http://atomurl.net/dynamicicon'><img
								src='http://atomurl.net/dynamicicon/img/logo20.png' border=0></a>
						<td><a href='http://atomurl.net/dynamicicon'
							class='bottomtext'>Dynamic Icons</a>
				</table>
	</table> -->
	<br>
	<br>

	<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-12727572-6']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

	<script>
init();
</script>

</body>
</html>