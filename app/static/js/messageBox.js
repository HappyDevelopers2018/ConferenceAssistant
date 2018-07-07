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
	  	$(this).css("background-color","white");
  		});
}

function toxiangqing(e)
{
    // window.location.href="/ConferenceIndex?id="+e;
}

function primary_info(){
	window.location.href="/primary_info_user"
}
function conference_manage(){
}
function tougao_manage(){
	window.location.href="/myTougao"
}

function detectType(type){
	if(type==2)
		return "会议投稿开始日期"
    else if(type==3)
        return "会议投稿截止日期"
    else if(type==4)
        return "会议注册开始日期"
    else
        return "会议注册截止日期"
}

function deleteMessage(id){

    $.ajax({
        type:"GET",
        url:"/deleteMessage/"+id,
        dataType:"json",
        success:function(){
            alert("即将删除该消息");
            console.log(id);
            console.log("#messageDiv"+id);
            $("#messageDiv"+id).remove();
        }
    })
}

function read(id) {
    $.ajax({
        type:"GET",
        url:"/changeRead/"+id,
        dataType:"json",
        success:function(){
            // alert("即将删除该消息");
            console.log(id);
            console.log("#messageDiv"+id);

            $("#button"+id).attr("style","margin-right:1%;float: right;background-color: #C4C4C4");

            // $("#messageDiv"+id).remove();
        }
    })
}

function readAll() {
	useId=getUserIdByCookie();
    console.log(useId);
    $.ajax({
        type:"GET",
        url:"/changeALLRead/"+useId,
        dataType:"json",
        success:function(){
            // alert("即将删除该消息");
            console.log(useId);
            // console.log("#messageDiv"+useId;

            $(".wait").attr("style","margin-right:1%;float: right;background-color: #C4C4C4");

            // $("#messageDiv"+id).remove();
        }
    })
}
function onload(){
    $("#xxx").html(detectType(2));   ///钟金成
    changecolor();
	$.ajax({
		type:"GET",
		url:"/returnMessages/"+id,
		dataType:"json",
		success:function(data){
			if(typeof(data)=="undefined")
				var l=0;
			else
				var l=data.length;
			for(var i=0;i<l;i++)
				{
					// var a=$("<div onclick='toxiangqing("+data[i].id+")'class='mouseovera' style='overflow: hidden;float:left; width:95%;height:200px;border:1px solid grey;'><div style='width:1%;height:99%;float:left;margin: 0.1%'></div><div style='width:90%;height:100%;float:left;margin:2%'><p>会议名称:&nbsp<b>"+data[i].conferenceName+"</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp会议时间：&nbsp "+data[i].startTime+"</p><br><p>会议简介："+GetChinese(data[i].abstract.toString())+"</p></div></div>");
					// a.appendTo("#showblock");
					if(data[i].type>1){
					    var e=data[i].conferenceID;
                        if(data[i].isRead)
                        {
                        	// 已读过的消息  onclick='toxiangqing("+data[i].id+")'
                            var b=$("<div class=\"mouseovera\" style=\"overflow: hidden;float:left; width:95%;border:1px solid grey;\" id='messageDiv"+data[i].id+"'>\n" +
                                "    <div style=\"width:1%;height:99%;float:left;margin: 0.1%\"></div>\n" +
                                "    <div style=\"width:90%;height:100%;float:left;margin:2%\">\n" +
                                "        <a style='text-decoration:none' href='ConferenceIndex?id="+e+"'><b><span style='color: #2b579a;'>[提醒]</span>"+detectType(data[i].type)+"</b></a>\n" +
                                "        <p>会议名称:&nbsp<b>"+data[i].content+"</b></p>\n" +
                                "        <p>日期:&nbsp<b>"+data[i].time+"</b></p>\n" +
                                "        <button onclick='deleteMessage("+data[i].id+")' type=\"button\" class=\"btn btn-primary\" style=\"float: right;background-color: #2b579a\">删除</button>\n" +
                                "        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right:1%;float: right;background-color: #C4C4C4\" >已读</button>\n" +
                                "    </div>\n" +
                                "</div>");
                            b.appendTo("#showblock");
                        }
                        else
                        {
                            var b=$("" +
                                "<div class=\"mouseovera\" style=\"overflow: hidden;float:left; width:95%;border:1px solid grey;\" id='messageDiv"+data[i].id+"'>\n" +
                                "    <div style=\"width:1%;height:99%;float:left;margin: 0.1%\"></div>\n" +
                                "    <div style=\"width:90%;height:100%;float:left;margin:2%\">\n" +
                                "        <a style='text-decoration:none' href='ConferenceIndex?id="+e+"'><b><span style='color: #2b579a;'>[提醒]</span>"+detectType(data[i].type)+"</b></a>\n" +
                                "        <p>会议名称:&nbsp<b>"+data[i].content+"</b></p>\n" +
                                "        <p>日期:&nbsp<b>"+data[i].time+"</b></p>\n" +
                                "        <button onclick='deleteMessage("+data[i].id+")' type=\"button\" class=\"btn btn-primary\" style=\"float: right;background-color: #2b579a\">删除</button>\n" +
                                "        <button onclick='read("+data[i].id+")' type=\"button\" class=\" wait btn btn-primary\" style=\"margin-right:1%;float: right;background-color: #2b579a\"id='button"+data[i].id+"'>已读</button>\n" +
                                "    </div>\n" +
                                "</div>");
                            b.appendTo("#showblock");
                        }
					}



				}
		}
	})
}
