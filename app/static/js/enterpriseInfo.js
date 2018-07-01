function primary_info(){
	window.location.href="primary_info.html";
}
function conference_manage(){
	window.location.href="conference_manage.html";
}
function money(){
	window.location.href="money.html";
}
function sons_manage(){
	window.location.href="sons_manage.html";
}
$(document).ready(function(){
  $("div.mouseovera").mouseover(function(){
    $(this).find("div:first-child").css("background-color","#2b579a");
	$(this).css("background-color","#e8f1ff");
  });
  $("div.mouseovera").mouseout(function(){
   	$(this).find("div:first-child").css("background-color","white");
	  $(this).css("background-color","white");
  });
});