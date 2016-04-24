
var oxfac_note_idx;       // 노트 index
var oxfac_qtype;          // 문제유형
var oxfac_optCnt;         // 보기 갯수
var question_num;		  // 문제 index
var oxfac_flag = false;   // 문제 만들기 모드


function js_oxfac_init(){	
	
	oxfac_qtype = "b1";
	
	
//	alert(oxfac_flag);	
	// OX 메뉴 클릭
	$("#mainmenu #menu").on("click",function(){
		
		if(!oxfac_flag){
			if($("#side_search").css('display') != 'none'){
			$("#side_search").animate({'left':'-410px','opacity':'0'},400,function(){
	    		$("#side_search").css('display','none');
	    	});	
			}
			
			$("#tx_trex_container").animate({'position':'absolute','left':'-300px'},500);
			$(".right").animate({'position':'absolute','left':'-300px'},500);
			
			$("#iframe").animate({'opacity':'0'},500,function(){ 
				$(this).hide();		
				$("#oxfac-status-tab").css({'display':'normal'});								
				$("#oxfac-status-tab").animate({'opacity':'1'},500);
				
				$("#oxfac-modify").css({'display':'normal'});								
				$("#oxfac-modify").animate({'opacity':'1'},500);
				});
			
			$("#mobilebody").animate({'width':'700px','height':'700px','left':'1164px','top':'100px'}, 500);
			$("#mobile").animate({'width':'600px','height':'600px'}, 500);
			oxfac_flag=true;
			
			
			
		}else{
			if($("#side_search").css('display') == 'none'){
			$("#side_search").css({'left':'-410px','display':'block'});
	    	$("#side_search").animate({'left':'0px','opacity':'1'},500);
			}
			
			$("#tx_trex_container").animate({'left':'0px'},500);
			$("#oxfac-status-tab").css({'display':'none'});
			$("#oxfac-modify").css({'display':'none'});
			$("#iframe").show().animate({'opacity':'1'},500,function(){	});
			
			$("#mobilebody").animate({'width':'364px','height':'550px','left':'1400px','top':'200px'}, 500);
			$("#mobile").animate({'width':'320px','height':'480px'}, 500);
			oxfac_flag=false;
			
			trans_dir(dir, title, seq);
		}
		
		$(document).on("click","#oxfac-status-tab td",function(){
			question_num = $(this).parent("tr").attr('id');
			$("#oxfac-one-content").val($(this).parent("tr").children(".oxfac-tab-content").text());
			$("#oxfac-one-answer").val($(this).parent("tr").children(".oxfac-tab-answer").text());
//			alert($(this).parent("tr").children(".oxfac-tab-content").text());
			if($(this).attr('class')=='oxfac-tab-content'){
				$("#oxfac-one-content").focus();
			}else if($(this).attr('class')=='oxfac-tab-answer'){
				$("#oxfac-one-answer").focus();
			}else{
//				alert($(this).parent("tr").attr("id"));
				var del_idx = $(this).parent("tr").attr("id");
				del_Question(del_idx);
				
			}
		});		
		
			
		
		
		// 문제, 정답 포커스 수정
		$("#oxfac-one-content").keyup(function(){
			var content = $(this).val();
			$.ajax({			
				type:"POST",
				url:"https://www.oxfactory.net:41996/oxfactory/models/exam_update.php" +
						"?content="+escape(encodeURIComponent(content))+
						"&question_num="+question_num,
				dataType:"xml",
				success:function(xml){	
//					alert($("#"+question_num).html());
					$("#"+question_num).children(".oxfac-tab-content").html(content);
					
				 },	// success end   			
		            error: function(e){
		                alert(e.responseText) ;
		         }			
			});			
		});
		$("#oxfac-one-answer").keyup(function(){
			var answer = $(this).val();			
			$.ajax({			
				type:"POST",
				url:"https://www.oxfactory.net:41996/oxfactory/models/exam_update.php" +
						"?answer="+escape(encodeURIComponent(answer))+
						"&question_num="+question_num,
				dataType:"xml",
				success:function(xml){	
					
					$("#"+question_num).children(".oxfac-tab-answer").html(answer);
					
				 },	// success end   			
		            error: function(e){
		                alert(e.responseText) ;
		         }			
			});				
			
		});
		
				
		
		
	});
}

function template_qtype(){
	
	var qtype = "";	
	qtype += "<ul id='qtype'>";		
	qtype += "	<li>객관식</li>	";	 
	qtype += "</ul>";
	
	
//	qtype += "<select name='drop1' id='Select1'>";
//	qtype += "  <option value='volvo'>Volvo</option>";
//	qtype += "  <option value='saab'>Saab</option>";
//	qtype += "  <option value='mercedes'>Mercedes</option>";
//	qtype += "  <option value='audi'>Audi</option>";
//	qtype += "</select>";
	
	return qtype;
}

function template_qtype_short(){
	
	var qtype = "";	
	qtype += "<ul id='qtype'>";	
	qtype += "	<li>OX형</li>	";	
	qtype += "	<li>단답형</li>	";		
	qtype += "</ul>";
	
	return qtype;
	
}

function template_qtype_ox(){
	
	var text = "";
	
	
	text += "<table class='txc-table quiz template_qtype_ox' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:16px'>" +
			"<tbody>" +
			"<tr>" +
			"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td>" +
			"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='2' rowspan='1'><p>&nbsp;123123</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td  style='width: 27px; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1' rowspan='4'><p>보기</p></td>" +
			"<td class='txc-table-option-number answer' style='color:red; width: 50%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p class='txc-table-option' style='text-align: center;'>O<br></p></td>" +
			"<td class='txc-table-option-number' style='width: 50%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p class='txc-table-option' style='text-align: center;'>X<br></p></td>" +
			"</tr>" +			
			"</tbody>" +
			"</table><p><br></p>";
		
	
	return text;
}

function template_qtype_write(){
	
	var text = "";
	
	
	text += "<table class='txc-table quiz template_qtype_write' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:16px'>" +
			"<tbody>" +
			"<tr>" +
			"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td>" +
			"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='2' rowspan='1'><p>&nbsp;123123</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td  style='width: 27px; height: 49px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1' rowspan='4'><p>보기</p></td>" +
			"<td class='txc-table-option txc-table-option-number answer' style='color:red; width: 50%; height: 26px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p style='text-align: center;'>O<br></p></td>" +
			"</tr>" +			
			"</tbody>" +
			"</table><p><br></p>";
				
	
	return text;
}

function template_qtype_multi(){
	
	var qtype = "";	
	qtype += "<ul id='qtype'>";	
	qtype += "	<li>OX형</li>	";
	qtype += "	<li>2지선다</li>	";	
	qtype += "	<li>3지선다</li>	";		
	qtype += "	<li>4지선다</li>	";	 
	qtype += "</ul>";
	
	return qtype;
	
}
function template_qtype_multi_2(){
	
	var text = "";
	
	
	text += "<table class='txc-table quiz template_qtype_multi_2' width='664' cellspacing='0' cellpadding='0' border='0' border-radius='10px' style='border-collapse:collapse;font-family:바탕;font-size:16px'>" +
			"<tbody>" +
			"<tr>" +
			"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td>" +
			"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='2' rowspan='1'><p>&nbsp;123123</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td  style='width: 27px; height: 64px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1' rowspan='4'><p>보기</p></td>" +
			"<td class='txc-table-option-number answer' style='color:red; width: 26px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p style='text-align: center;'>①<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p style='text-align: center;'>②<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"</tbody>" +
			"</table><p><br></p>";
		
	
	return text;
	
}
function template_qtype_multi_3(){
	
	var text = "";
	
	
	text += "<table class='txc-table quiz template_qtype_multi_3' width='664' cellspacing='0' cellpadding='0' border='0' style='border:none;border-collapse:collapse;;font-family:바탕;font-size:16px'>" +
			"<tbody>" +
			"<tr>" +
			"<td unselectable='on' style='width: 37px; height: 26px; border: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td>" +
			"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);' colspan='2' rowspan='1'><p>&nbsp;123123</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td  style='width: 27px; height: 96px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204); border-left-width: 1px; border-left-style: solid; border-left-color: rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1' rowspan='4'><p>보기</p></td>" +
			"<td class='txc-table-option-number answer' style='color:red; width: 26px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p style='text-align: center;'>①<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p style='text-align: center;'>②<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: none; border-right-color: rgb(124, 132, 239);' colspan='1'><p style='text-align: center;'>③<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
				
			"</tbody>" +
			"</table><p><br></p>";
		
	
	
	return text;
	
}
function template_qtype_multi_4(){
	
	var text = "";
	
	
	text += "<table class='txc-table quiz template_qtype_multi_4' style='font-family: 바탕; font-size: 16px; opacity: 1; left: 0px; border:1px solid rgb(204, 204, 204); border-collapse:collapse; ''>" +
			"<tbody>" +
			"<tr>" +
			"<td unselectable='on' style='width: 37px; height: 26px; border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td>" +
			"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); ' colspan='2' rowspan='1'><p>&nbsp;123123</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td  style='width: 27px; height: 128px; border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);  background-color: rgb(255, 255, 255);' colspan='1' rowspan='4'><p>보기</p></td>" +
			"<td class='txc-table-option-number answer' style='color:red; width: 26px; height: 24px;' colspan='1'><p style='text-align: center;'>①<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; ' colspan='1'><p style='text-align: center;'>②<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; ' colspan='1'><p style='text-align: center;'>③<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204); ' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 26px; ' colspan='1'><p style='text-align: center;'>④<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 26px;  ' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +		
			"</tbody>" +
			"</table><p><br></p>";
		
	
	
	return text;
	
}
function template_qtype_multi_5(){
	
	var text = "";
	
	
	text += "<table class='txc-table quiz template_qtype_multi_5' style='font-family: 바탕; font-size: 16px; opacity: 1; left: 0px; border:1px solid rgb(204, 204, 204); border-collapse:collapse; ''>" +
			"<tbody>" +
			"<tr>" +
			"<td unselectable='on' style='width: 37px; height: 26px; border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);' colspan='1'><p>문제<br></p></td>" +
			"<td class='question-cell'style='width: 626px; height: 27px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); ' colspan='2' rowspan='1'><p>&nbsp;123123</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td  style='width: 27px; height: 128px; border-right-width: 1px; border-right-style: solid; border-right-color: rgb(204, 204, 204);  background-color: rgb(255, 255, 255);' colspan='1' rowspan='4'><p>보기</p></td>" +
			"<td class='txc-table-option-number answer' style='color:red; width: 26px; height: 24px;' colspan='1'><p style='text-align: center;'>①<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; ' colspan='1'><p style='text-align: center;'>②<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204);' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; ' colspan='1'><p style='text-align: center;'>③<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204); ' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 24px; ' colspan='1'><p style='text-align: center;'>④<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 24px; border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204); ' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +
			"<tr>" +
			"<td class='txc-table-option-number' style='width: 26px; height: 26px; ' colspan='1'><p style='text-align: center;'>⑤<br></p></td>" +
			"<td class='txc-table-option' style='width: 600px; height: 26px;  ' colspan='1'><p>&nbsp;</p></td>" +
			"</tr>" +	
			
			"</tbody>" +
			"</table><p><br></p>";
		
	
	
	return text;
	
}
// 문제 index 설정
function oxfac_setQuestionNum(number){
	
	question_num = number;
}
// 문제 목록 리스트
function oxfac_getQuestions(note_idx){
	oxfac_note_idx = note_idx;
	$.ajax({			
		type:"POST",
		url:"https://www.oxfactory.net:41996/oxfactory/models/exam.php?note_idx="+note_idx,	
		dataType:"xml",
		success:function(xml){	
						
			
//			alert("문제가져오기 성공");
//			alert($(xml).find('data').find('rownum').text());
			var oxfacHTML = "";
			if(oxfac_flag){
				oxfacHTML += "<table id='oxfac-status-tab' style='display:normal' > ";				
			}else{
				oxfacHTML += "<table id='oxfac-status-tab' style='display:none' > ";
			}
			
			switch(oxfac_qtype)
			{
			case "b1" :
				
				oxfacHTML += "<tr id='oxtabl_first_row'>";
				oxfacHTML += "	<th>번호</th>";
				oxfacHTML += "	<th>내용</th>";
				oxfacHTML += "	<th>정답</th>";
				oxfacHTML += "  <th>삭제</th>";
				oxfacHTML += "</tr>";				
				
				$(xml).find('data').each(function(){
					
					if($(this).find('qtype').text() == "b1"){
					
					oxfacHTML += "<tr id='"+ $(this).find('question_num').text() +"'>";
					oxfacHTML += "	<td class='oxfac-tab-rownum'>"+ $(this).find('rownum').text() +"</td>";
					oxfacHTML += "	<td class='oxfac-tab-content'>"+ $(this).find('content').text() +"</td>";
					oxfacHTML += "	<td class='oxfac-tab-answer'>"+ $(this).find('answer').text() +"</td>";
					oxfacHTML += "  <td class='oxfac-tab-del'>" + "<i class='glyphicon glyphicon-remove'></i></td>";
					oxfacHTML += "</tr>";
					
					}
					
				});
				
				break;
			
			case "c1" :
					
				oxfacHTML += "<tr>";
				oxfacHTML += "	<th style='width:20px'>번호</th>";
				oxfacHTML += "	<th>내용</th>";
				oxfacHTML += "  <th style='width:10px'>삭제</th>";
				oxfacHTML += "</tr>";			
				
//				$(xml).find('data').each(function(){
					
				var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
				
				if(isEmpty(rownum)) {
					rownum = 1;
				}else{
					rownum = parseInt(rownum) + 1;
				}	
				
				oxfacHTML += "<tr id='"+ $(this).find('question_num').text() +"'>";
				oxfacHTML += "	<td class='oxfac-tab-rownum' rowspan='"+ (oxfac_optCnt+3) +"'>"+ rownum +"</td>";
				oxfacHTML += "	<td >문제</td>";
				oxfacHTML += "  <td class='oxfac-tab-del' rowspan='"+ (oxfac_optCnt+3) +"'>" + "<i class='fa fa-times-circle-o fa-2x'></i></td>";
				oxfacHTML += "</tr>";			
								
//				}
				
				oxfacHTML += "<tr>";
				oxfacHTML += "	<td class='oxfac-tab-question' id='oxfac-tab-question'>"+ "문제 들어갈 곳" + "</td>";
				oxfacHTML += "</tr>";
				oxfacHTML += "<tr>";
				oxfacHTML += "	<td>"+ "보기" + "</td>";
				oxfacHTML += "</tr>";
				
				for ( var int = 0; int < oxfac_optCnt; int++) {
					
					oxfacHTML += "<tr>";
					oxfacHTML += "	<td class='oxfac-tab-option' id='oxfac-tab-option'>"+ int.toString() +"</td>";
					oxfacHTML += "</tr>";
					
				}				
				
				break;
			}	
			
			oxfacHTML += "</table>";
			
			
			if(oxfac_flag){
				oxfacHTML += "<div id='oxfac-modify' style='display:normal'>";
				
			}else{
				oxfacHTML += "<div id='oxfac-modify' style='display:none'>";	
			}
			
			oxfacHTML += "<div>문제 : <textarea id='oxfac-one-content' name='content'>"+ $(xml).find('data').last().find('content').text() +"</textarea></div>";
			oxfacHTML += "<div>정답 : <textarea id='oxfac-one-answer' name='answer'>"+ $(xml).find('data').last().find('answer').text() +"</textarea></div>";
			oxfacHTML += "</div>";
			
			$("#ox #oxfac-tab").html(oxfacHTML);
			question_num = $(xml).find('data').last().find('question_num').text();
		 },	// success end   			
            error: function(e){
                alert(e.responseText) ;
         }			
	});
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
// 문제 삭제
function del_Question(del_idx){
	
	$.ajax({			
		type:"POST",
		url:"https://www.oxfactory.net:41996/oxfactory/models/del_question.php" +
				"?del_idx="+del_idx,				
		dataType:"xml",
		success:function(xml){	
			
			oxfac_getQuestions(oxfac_note_idx);
			
			var rownum = $("#oxfac-status-tab tr:last-child .oxfac-tab-rownum").text();
//			alert(rownum);
			if(rownum == 1) {
				$("#"+oxfac_note_idx+" .exam").html("");
			}else{
				$("#"+oxfac_note_idx+" .exam").html("문제"+(rownum-1));
			}
			
			
		 },	// success end   			
            error: function(e){
                alert(e.responseText) ;
         }			
	});	
	
}
// 문제 유형 설정
function set_qtype(type){	
	oxfac_qtype = type;
}
// 보기 설정
function set_optionCnt(count){
	oxfac_optCnt = count;
}
// 보기 갯수 
function get_optionCnt(){
	return oxfac_optCnt;
}
