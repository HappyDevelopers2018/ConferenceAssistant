var id=getUserIdByCookie();
function GetChinese(strValue) {  
    if(strValue!= null && strValue!= ""){  
        var reg = /[\u4e00-\u9fa5]/g;   
        return strValue.match(reg).join("");  
    }  
    else  
        return "";  
}  
function changecolor(){
	$("div.mouseovera").mouseover(function(){
    	$(this).find("div:first-child").css("background-color","#2b579a");
		$(this).css("background-color","#e8f1ff");
  		});
	$("div.mouseovera").mouseout(function(){
		$(this).find("div:first-child").css("background-color","white");
	  	$(this).css("background-color","white");
  		});
}
function toxiangqing(e)
{
	window.location.href="/ConferenceIndex?id="+e;
}
function primary_info(){
	window.location.href="/primary_info_user"
}
function conference_manage(){
}
function tougao_manage(){
	window.location.href="/myTougao"
}
function onload(){
	$.ajax({
		type:"GET",
		url:"/attendConferenceList/"+id,
		dataType:"json",
		success:function(data){
			if(typeof(data)=="undefined")
				var l=0;
			else
				var l=data.length;
			for(var i=0;i<l;i++)
				{
					var a=$("<div onclick='toxiangqing("+data[i].id+")'class='mouseovera' style='overflow: hidden;float:left; width:95%;height:200px;border:1px solid grey;'><div style='width:1%;height:99%;float:left;margin: 0.1%'></div><div style='width:90%;height:100%;float:left;margin:2%'><p>会议名称:&nbsp<b>"+data[i].conferenceName+"</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp会议时间：&nbsp "+data[i].startTime+"</p><br><p>会议简介："+GetChinese(data[i].abstract.toString())+"</p></div></div>");
					a.appendTo("#showblock");
				}
			changecolor();
		}
	})
}