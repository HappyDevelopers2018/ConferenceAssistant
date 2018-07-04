function getParam () {
	var url = decodeURI(window.location.href);
	var result = url.split("?")[1];
	var keyValue = result.split("&");
	var obj = {};
	for (var i = 0; i < keyValue.length; i++) {
		var item = keyValue[i].split("=");
		obj[item[0]] = item[1];
	}
	return obj;
}