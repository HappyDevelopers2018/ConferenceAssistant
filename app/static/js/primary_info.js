function onload(){
	var id=getUserIdByCookie();
	$.ajax({
		type:"GET",
		url:"/returnUser/"+id,
		dataType:"json",
		success:function(data){
			$("#name").html(data[0].name);
			if(data[0].email!='')
				$("#inputEmail3").html(data[0].email);
			else
				$("#inputEmail3").html("无");
			if(data[0].organization!='')
				$("#organization").html(data[0].organization);
			else
				$("#organization").html("无");
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
function logout(){
	var t=new Date();
	t.setTime(0);
	document.cookie="name=;expires="+t.toGMTString()+";path=/";
	document.cookie="id=;expires="+t.toGMTString()+";path=/";
	document.cookie="identity=;expires="+t.toGMTString()+";path=/";
	window.location.href="/index";
}

function update(){
    window.location.href="primaryInfoUpdate";
}
