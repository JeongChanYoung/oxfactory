/**
 *  상품상세비교 테이블
 */

function compareTable(xml){

	var innerHTML = "";
	
	    innerHTML += "<div id='modal_submit'>";
		innerHTML += "	<div id='n_popwrapper''>";
		innerHTML += "	<div id='n_pophead'>";
		innerHTML += "	<h1><span class='icon01'>상품비교</span></h1>";
		innerHTML += "</div>";
		innerHTML += "<div id='n_popcontents'>		";
		innerHTML += "	<table id='viewTable' class='n_ptType1' style='width:800px;'>";
		innerHTML += "		<caption>상품 비교하기</caption>";
		innerHTML += "		<colgroup>							";
		
		
		innerHTML += "				<col width='16%' />";
		innerHTML += "				<col width='28%' />";
		innerHTML += "				<col width='28%' />			";	
		if(data.length>2){
		innerHTML += "				<col width='28%' />";
		};		
		
		innerHTML += "</colgroup>";
		innerHTML += "<tbody>";
		innerHTML += "	<tr>";
		innerHTML += "	<th scope='row'>상품명</th>";
		for(var i=0; i< data.length; i++){
			if(data[i].title == null){data[i].title ="";}
			innerHTML += "		<td><a href='#noen' onclick='productDtl('LN000189');'>"+data[i].title+"</a></td>	";	
		}										
		innerHTML += "</tr>";
		innerHTML += "<tr>";
		innerHTML += "<th scope='row'>평점</th>	";	
		for(var i=0; i< data.length; i++){			
			innerHTML += "<td>";
			innerHTML += "	<div class='ratingWp'>";
			innerHTML += "	<div class='ratingbg'>";	
			innerHTML += "		<div style='width:"+(data[i].avg_star*10)+"%;' class='ratingbar'><span class='ov_h'>해당상품의 평점은</span></div>";
			innerHTML += "	</div>";
			innerHTML += "<p class='n_num'>"+data[i].avg_star+"</p>";
			innerHTML += "</div>";
			innerHTML += "</td>		";
		}											
		innerHTML += "</tr>";
		innerHTML += "<tr>";
		innerHTML += "<th scope='row'>상품특징</th>		";		
		for(var i=0; i< data.length; i++){
			if(data[i].specific == null){data[i].specific ="";}
			innerHTML += "<td>"+data[i].specific+"</td>				";
		}					
		innerHTML += "</tr>		";						
		innerHTML += "<tr>";
		innerHTML += "<th scope='row'>상품개요</th>	";	
		for(var i=0; i< data.length; i++){
			if(data[i].intro == null){data[i].intro ="";}
			innerHTML += "<td>"+data[i].intro+"</td>				";
		}							
		innerHTML += "</tr>";
		innerHTML += "<tr>";
		innerHTML += "<th scope='row'>대출신청자격</th>	";	
		for(var i=0; i< data.length; i++){
			if(data[i].qualified == null){data[i].qualified ="";}
			innerHTML += "<td>"+data[i].qualified+"</td>				";
		}							
		innerHTML += "</tr>";
		innerHTML += "<tr>";
		innerHTML += "<th scope='row'>통장자동대출</th>";	
		for(var i=0; i< data.length; i++){
			if(data[i].account_autoloan == null){data[i].account_autoloan ="";}
			innerHTML += "<td>"+data[i].account_autoloan+"</td>				";
		}				
		innerHTML += "</tr>";
		innerHTML += "<tr>";
		innerHTML += "<th scope='row'>대출기간 및<br />상환방법</th>";	
		for(var i=0; i< data.length; i++){
			if(data[i].loan_term == null){data[i].loan_term ="";}
			innerHTML += "<td>"+data[i].loan_term+"</td>				";
		}							
		innerHTML += "</tr>";
		innerHTML += "<tr>";		
		innerHTML += "<th scope='row'>담보</th>	";	
		for(var i=0; i< data.length; i++){
			if(data[i].dambo == null){data[i].dambo ="";}
			innerHTML += "<td>"+data[i].dambo+"</td>				";
		}			
		innerHTML += "</tr>";
		innerHTML += "<tr>";
		innerHTML += "<th scope='row'>가입</th>	";
		for(var i=0; i< data.length; i++){
			if(data[i].tobranch != null){
				innerHTML += "<td>";
				innerHTML += data[i].tobranch;
				innerHTML += "</td>	";
			}else{			
			innerHTML += "<td>";
			innerHTML += "영업점가입";
			innerHTML += "</td>	";
			}
		}
		innerHTML += "</tr>";
		innerHTML += "</tbody>";
		innerHTML += "</table>";
		innerHTML += "<p class='s1'>* 비교하기는 요약된 정보로 자세한내용은 상품상세에서 확인하실 수 있습니다.</p>";

		innerHTML += "<div class='n_popbtnArea'>";
		innerHTML += "<a href='#none' onclick='print();'><img src='https://oimg1.kbstar.com/img/nproduct/btn_popprint.jpg' alt='인쇄' /></a>";
		innerHTML += "</div>";
		innerHTML += "<div id='n_popfooter'>";
		innerHTML += "<p class='btnclose'><span  class='btn large'><a href='#'>닫기</a></span></p>";
		innerHTML += "</div>";
		
		innerHTML += "</div>";
		innerHTML += "</div>";
		innerHTML += "</div>";
		return innerHTML;		
		
	}

