function GetChinese(str) {  
  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}  
function primary_info(){
	window.location.href="/primary_info";
}
function manage_conference(id){
	window.location.href="/ConferenceUpdate?id="+id;
}
function manage_conference2(id){
	window.location.href="/ConferenceAdmin?id="+id;
}
function money(){
	window.location.href="";
}
function sons_manage(){
	window.location.href="/sons_manage";
}
function changecolor(){
	$("div.mouseovera").mouseover(function(){
    	$(this).find("div:first-child").css("background-color","#2b579a");
		$(this).css("background-color","#e8f1ff");
  		});
	$("div.mouseovera").mouseout(function(){
		$(this).find("div:first-child").css("background-color","white");
	  	$(this).css("background-color","transparent");
  		});
}
function onload(){
	var id=getUserIdByCookie();
	$.ajax({
		type:"GET",
		url:"/userConference/"+id,
		dataType:"json",
		success:function(data){
			console.log(data.length);
			console.log(data);
			console.log(data[0]);
			if(typeof(data)=="undefined")
				var l=0;
			else
				var l=data.length;
			for(var i=0;i<l;i++)
				{
					//onclick='toxiangqing("+data[i].id+")'
					var a=$("<div class='mouseovera' style='overflow: hidden;float:left; width:95%;height:200px;border:1px solid grey;'>\
						<div style='width:1%;height:99%;float:left;margin: 0.1%'></div><div style='width:90%;height:100%;float:left;margin:2%'>\
						<p>会议名称:&nbsp<a style='text-decoration:none' href='ConferenceIndex?id="+data[i].id+"'><span style='color: #2b579a;'>\
						<b>"+data[i].conferenceName+"</b></span></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\
						&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp会议时间：&nbsp "+
						data[i].startTime+" <button style='float:right' type='button;' class='btn btn-default' onclick='manage_conference("+
						data[i].id+")'>修改信息</button><button style='float:right' type='button;' class='btn btn-default' onclick='manage_conference2("+
						data[i].id+")'>管理会议</button> </p><br><p>会议简介："+unescape(unescape((data[i].abstract)))+"</p></div></div>");
					a.appendTo("#showblock");
				}
			changecolor();
		}
	})
}
function toxiangqing(e)
{
	window.location.href="/ConferenceIndex?id="+e;
}
function logout(){
	var t=new Date();
	t.setTime(0);
	document.cookie="name=;expires="+t.toGMTString()+";path=/";
	document.cookie="id=;expires="+t.toGMTString()+";path=/";
	document.cookie="identity=;expires="+t.toGMTString()+";path=/";
	window.location.href="/index";
}
