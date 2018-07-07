function getUserNameByCookie() {
    var cookies=document.cookie.split(";");
	var l=cookies.length;
	for(var i=0;i<l;i++)
	{
		if($.trim(cookies[i].split("=")[0])=="name")
		{
			name=cookies[i].split("=")[1];
			break;
		}
	}
	return name;
}
function getUserIdByCookie() {
    var cookies=document.cookie.split(";");
	var l=cookies.length;
	var id=0;
	for(var i=0;i<l;i++)
	{
		if($.trim(cookies[i].split("=")[0])=="id")
		{
			id=cookies[i].split("=")[1];
			break;
		}
	}
	return id;
}
function getUserIdentityByCookie() {
    var cookies=document.cookie.split(";");
	var l=cookies.length;
	var identity=0;
	for(var i=0;i<l;i++)
	{
		if($.trim(cookies[i].split("=")[0])=="identity")
		{
			identity=cookies[i].split("=")[1];
			break;
		}
	}
	return identity;
}
function logout(){
	var t=new Date();
	t.setTime(0);
	document.cookie="name=;expires="+t.toGMTString()+";path=/";
	document.cookie="id=;expires="+t.toGMTString()+";path=/";
	document.cookie="identity=;expires="+t.toGMTString()+";path=/";
	window.location.href="/index";
}
