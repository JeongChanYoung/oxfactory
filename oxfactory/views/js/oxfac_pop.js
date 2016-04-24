var oxfac_status;

$(document).on("click","#oxfac_make_menu li",function(){
	
//	alert($(this).attr('id'));
	ox_type = $(this).attr('id');
	$("#oxfac_make_menu").toggle();
});

function oxfac_question(selectNode){

	var innerHTML = "<table id='tbl_oxfac_pop'>";
	innerHTML += "<tr>";
	innerHTML += "<td id='second'>"+selectNode+"</td>";
	innerHTML += "</tr>";
	innerHTML += "</table>";
	
	
	
	if(oxfac_status == null){
		oxfac_status = "question";
	}
//	alert(oxfac_status);
	switch(oxfac_status){
	case "question":
		innerHTML += "<ul id='oxfac_question'>";
		innerHTML += "<li class='question_add'>문제</li>";
		innerHTML += "</ul>";
		
		
	break;
	case "option":
		innerHTML += "<ul id='oxfac_question'>";		
		innerHTML += "<li class='answer_wrong'>맞는 보기로 추가</li>";
		innerHTML += "<li class='answer_right'>틀린 보기로 추가</li>";
		innerHTML += "<li class='question_reset'>다시 만들기</li>";
		innerHTML += "</ul>";	
		
		
		break;
	default:
//		alert('default');
		break;
	}	
//	alert(innerHTML);
	return innerHTML;
	
}

$(document).on("click","#oxfac_question li",function(){
	$("#tbl_oxfac_pop").css({"display":"none"});
	$(this).parent("#oxfac_question").css({"display":"none"});
	
	var li_type = $(this).attr('class');
	
	switch(li_type){
	case 'question':
//		alert('question');
		set_status("option");
		addQuestion();
		break;
	case 'answer_wrong':
		addWrongOption();
//		alert('answer_wrong');
		break;
	case 'answer_right':
		addRightOption();
//		alert('answer_right');
		break;
		
	
	
	
	
	}
});

function get_status(){
	
	return oxfac_status;
	
}
function set_status(status){
	
	oxfac_status = status;
	
}