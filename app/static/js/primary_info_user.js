var id=getUserIdByCookie();
function GetChinese(str) {  
  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
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
function toxiangqing(e)
{
	window.location.href="/ConferenceIndex?id="+e;
}
function primary_info(){
	
}
function conference_manage(){
	window.location.href="/myJoinedConference"
}
function tougao_manage(){
	window.location.href="/myTougao"
}

function messageBox(){
    window.location.href="messageBox"
}

function onload(){
	$.ajax({
		type:"GET",
		url:"/returnUser/"+id,
		dataType:"json",
		success:function(data){
            $("#name").html(data[0].name);
            $("#realname").html(data[0].realname);
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
	$.ajax({
		type:"GET",
		url:"/getCollection/"+id,
		dataType:"json",
		success:function(data){
			if(typeof(data)=="undefined")
				var l=0;
			else
				var l=data.length;
			for(var i=0;i<l;i++)
				{
					var a=$("<div class='mouseovera' style='overflow: hidden;float:left; width:95%;height:200px;border:1px solid grey;'>\
						<div style='width:1%;height:99%;float:left;margin: 0.1%'></div><div style='width:90%;height:100%;float:left;margin:2%'>\
						<p>会议名称:&nbsp<b><a href='/ConferenceIndex?id="+data[i].id+"'>"+data[i].conferenceName+"</a></b>&nbsp&nbsp&nbsp&nbsp&nbsp\
						&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\
						&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp会议时间：&nbsp "+data[i].startTime+"</p><br><p>会议简介："+unescape(unescape((data[i].abstract)))+
						"</p></div></div>");
					a.appendTo("#showblock");
				}
			changecolor();
		}
	})
}
function update(){
    window.location.href="primary_info_user_update";
}