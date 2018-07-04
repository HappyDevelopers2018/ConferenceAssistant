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
	
}
function conference_manage(){
	window.location.href="/myJoinedConference"
}
function tougao_manage(){
	window.location.href="/myTougao"
}
function register_conference(e){
	$.ajax({
		type:"GET",
		url:"/attendConference/"+id+"/"+e,
		dataType:"json",
		success:function(data){
			alert("参加会议成功");
		}
	}
	)
}
function onload(){
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
	$.ajax({
		type:"GET",
		url:"/userCollection/"+id,
		dataType:"json",
		success:function(data){
			if(typeof(data)=="undefined")
				var l=0;
			else
				var l=data.length;
			for(var i=0;i<l;i++)
				{
					var a=$("<div onclick='toxiangqing("+data[i].id+")'class='mouseovera' style='overflow: hidden;float:left; width:95%;height:200px;border:1px solid grey;'><div style='width:1%;height:99%;float:left;margin: 0.1%'></div><div style='width:90%;height:100%;float:left;margin:2%'><p>会议名称:&nbsp<b>"+data[i].conferenceName+"</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp会议时间：&nbsp "+data[i].startTime+" <button style='float:right' type='button;' class='btn btn-default' onclick='register_conference("+data[i].id+")'>参加会议</button> </p><br><p>会议简介："+GetChinese(data[i].abstract.toString())+"</p></div></div>");
					a.appendTo("#showblock");
				}
			changecolor();
		}
	})
}