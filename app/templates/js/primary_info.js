function onload(){
	var id=getUserIdByCookie();
	$.ajax({
		type:"GET",
		url:"/returnUser/"+id,
		dataType:"json",
		success:function(data){
			$("#name").html(data[0].name);
			$("#organization").html(data[0].organization);
			if(data[0].email!='')
				$("#inputEmail3").html(data[0].email);
			else
				$("#inputEmail3").html("无");
			if(!data[0].TEL)
				$("#inputTEL").html(data[0].TEL);
			else
				$("#inputTEL").html("无");
		}
	})
}
function primary_info(){
	window.location.href="/primary_info";
}
function conference_manage(){
	window.location.href="/conference_manage";
}
function money(){
	window.location.href="";
}
function sons_manage(){
	window.location.href="/sons_manage";
}