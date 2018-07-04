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