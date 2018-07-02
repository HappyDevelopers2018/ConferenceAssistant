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
function onload(){
	var id=1;
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
					var a=$("<div class='mouseovera' style='float:left; width:95%;height:200px;border:1px solid grey;'><div style='width:1%;height:99%;float:left;margin: 0.1%'></div><div style='width:90%;height:100%;float:left;margin:2%'><p>会议名称:&nbsp<b>"+data[i].conferenceName+"</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp会议时间：&nbsp "+data[i].startTime+" <button style='float:right' type='button;' class='btn btn-default' onclick='manage_conference()'>管理会议</button> </p><br><p>会议简介："+data[i].abstract+"</p></div></div>");
					a.appendTo("#showblock");
				}
			changecolor();
		}
	})
}
