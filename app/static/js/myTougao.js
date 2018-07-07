var id=getUserIdByCookie();
function GetChinese(strValue) {  
  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}  
function toxiangqing(e)
{
	window.location.href="/ConferenceIndex?id="+e;
}
function primary_info(){
	window.location.href="/primary_info_user"
}
function conference_manage(){
	window.location.href="/myJoinedConference"
}
function tougao_manage(){
	
}
function messageBox(){
    window.location.href="messageBox"
}

function returnstatus(e){
	if(e==0)
		return "通过审核";
	else if(e==1)
		return "需要修改";
	else if(e==2)
		return "未通过审核";
	else if(e==3)
		return "审核中";
	else
		return "未知状态";
}
function recontribute(e){
	var form_data = new FormData($('#form'+e)[0]);
	$.ajax({
				url: "/updateContribution/"+e.toString(),
        		type: 'POST',
        		data: form_data,
        		contentType: false,
        		processData: false,
        		success: function(data){
						$("#form"+e).hide();
						$("#status"+e).html("审核中");
        			},
				});
}
function onload(){
	$.ajax({
		type:"GET",
		url:"/returnContribution/"+id,
		dataType:"json",
		success:function(data){
			var l=data.length;
			for(var i=0;i<l;i++){
				if(data[i].checkStatus==0)
					$("<tr><th scope=\"row\">"+(i+1).toString()+"</th><td>"+data[i].title+"</td><td><a href='/ConferenceIndex?id="+data[i].conferenceID+"'>"+data[i].conferenceName+"</a></td><td>通过</td><td></td></tr>").appendTo("#tbody");
				else if(data[i].checkStatus==1)
					$("<tr><th scope=\"row\">"+(i+1).toString()+"</th><td>"+data[i].title+"</td><td><a href='/ConferenceIndex?id="+data[i].conferenceID+"'>"+data[i].conferenceName+"</a></td><td id='status"+data[i].id.toString()+"' ><a onclick=\"javascript:alert('"+data[i].modificationAdvise+"')\">需要修改</a></td><td><form id='form"+data[i].id.toString()+"'style=\"display: inline\"><input type=\"file\" name='file' style=\"display: inline;font-size:12px\"><input  onclick='recontribute("+data[i].id.toString()+")' type=\"button\" style=\"font-size:12px\" class=\"btn btn-primary\" value=\"重新提交\"></form></td></tr>").appendTo("#tbody");
				else if(data[i].checkStatus==2)
					$("<tr><th scope=\"row\">"+(i+1).toString()+"</th><td>"+data[i].title+"</td><td><a href='/ConferenceIndex?id="+data[i].conferenceID+"'>"+data[i].conferenceName+"</a></td><td>未通过</td><td></td></tr>").appendTo("#tbody");
				else if(data[i].checkStatus==3)
					$("<tr><th scope=\"row\">"+(i+1).toString()+"</th><td>"+data[i].title+"</td><td><a href='/ConferenceIndex?id="+data[i].conferenceID+"'>"+data[i].conferenceName+"</a></td><td>审核中</td><td></td></tr>").appendTo("#tbody");
				else
					continue;
			}
		}
	})
}
