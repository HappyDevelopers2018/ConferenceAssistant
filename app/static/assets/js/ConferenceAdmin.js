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

function getConfIdByUrl(){
	var thisURL = document.URL;
    var getval =thisURL.split('?')[1];
	var confid= getval.split("=")[1];
	if(confid[confid.length-1]=='#')
		confid=confid.substring(0,confid.length-1);
	return confid;
}

function updateStatistic(confid){
    $.ajax({
        type:"GET",
        url:"/paperStatic/"+confid,
        dataType:"json",
        success:function(data){
            console.log("return paper static success! data:",data);
            $("#hasPass").html("已通过："+data[1]);
            $("#hasRetrieve").html("已打回："+data[2]);
            $("#hasDeny").html("已拒绝："+data[3]);
            $("#toCheck").html("待审核："+data[4]);
            $("#paperNum").html("总数目："+data[0]);
        },
        error:function(){
            console.log("return paper static fail!");
        }
    });
}

function submitDownload(paper_id){
    window.location.href="/paperDownload/"+ paper_id;
}

function submitDownloadAll(){
    console.log("click download all");
    var confid=getConfIdByUrl();
    console.log("confid: ",confid);
    window.location.href="/multiplePaperDownload/"+ confid;
}

function disableBtn(id){
    $("#btn-pass"+id).attr("disabled", true);            
    $("#btn-retrieve"+id).attr("disabled", true);
    $("#btn-deny"+id).attr("disabled", true);
}

function submitPass(id,paper_id,confid){
    $.ajax({
        type:"POST",
        data:$("#textarea"+id).val(),
        dataType:"json",
        contentType: 'application/json; charset=UTF-8',
        url:"/paperAudit/"+paper_id+"/0",
        success:function(data){
            console.log('submitPass post success');
            disableBtn(id);
            updateStatistic(confid);
        },
        error:function(){
            console.log('submitPass post fail');
        }
    });
}

function submitRetrieve(id,paper_id,confid){
    $.ajax({
        type:"POST",
        data:$("#textarea"+id).val(),
        dataType:"json",
        contentType: 'application/json; charset=UTF-8',
        url:"/paperAudit/"+paper_id+"/1",
        success:function(data){
            console.log('submitRetrieve post success');
            disableBtn(id);
            updateStatistic(confid);
        },
        error:function(){
            console.log('submitRetrieve post fail');
        }
    });
}

function submitDeny(id,paper_id,confid){
    $.ajax({
        type:"POST",
        data:$("#textarea"+id).val(),
        dataType:"json",
        contentType: 'application/json; charset=UTF-8',
        url:"/paperAudit/"+paper_id+"/2",
        success:function(data){
            console.log('submitDeny post success');
            disableBtn(id);
            updateStatistic(confid);
        },
        error:function(){
            console.log('submitDeny post fail');
        }
    });
}

function onload(){
	var confid= getConfIdByUrl();
	var usrid=getUserIdByCookie();
    console.log('onload. confid: '+confid+' usrid: '+usrid);
    updateStatistic(confid);

    $.ajax({
        type:"GET",
        url:"/returnConference/"+confid,
        dataType:"json",
        success:function(data){
            console.log("return conference success! data:",data);
            if(data.result!=0){
                $("#dynamicText").html(data[0].abstract);
                $("#contributiondate").html("<p>初稿截稿日期："+data[0].contributionEndTime+"</p>");   //初稿截稿日期：2018-06-29
                $("#conferenceName").html(data[0].conferenceName);   //中国 · 北京 北京市
                $("#city").html(data[0].location);   //中国 · 北京 北京市
                $("#startTime").html(data[0].startTime);   //中国 · 北京 北京市
                $("#contributionAbstract").html("<p>"+data[0].contributionAbstract+"</p>");      //征稿简介 听众免费
                $("#ownerName").html(data[0].ownerPeopleName);   ///钟金成
                $("#ownerEmail").html(data[0].ownerPeopleEmail);   // connorzhong@qq.com
                $("#ownerTEL").html(data[0].ownerPeopleTel);   // 18508126686
                $("#ownerOrganization").html(data[0].ownerOrganization);   //北航软件学院
                $("#supporter").html(data[0].supporter);   //快乐开发项目组
            }
			
       },
       error: function(){
            console.log("return conference error");
       }
   });

   $.ajax({
       type:"GET",
       url:"/returnALLContributions/"+confid,
       dataType:"json",
       success:function(data){
           console.log("return all contributions success! data:",data);
           for(var i=0;i<data.length;i++){
               var paperdiv="<div>"+data[i].filePath+"</div>";
               var contribution_state=data[i].contributionStatus==0?"&ensp;&ensp;初稿":"&ensp;&ensp;修改稿";
               var check_state=data[i].checkStatus;
               if(check_state==0){
                   check_state="已通过";
               }else if(check_state==1){
                   check_state="已打回";
               }else if(check_state==2){
                   check_state="已拒绝";
               }else{
                   check_state="待审核";
               }
               var paperdiv="<div class=\"container onePaper\">\n"+
                                    "<div class=\"row\">\n"+
                                        "<h4 class=\"TobeCenter\" style=\"color: #2b579a\">"+data[i].title+"</h4>\n"+
                                        "<span  style=\"font-size: 12pt\"><strong>"+check_state+"</strong></span>\n"+
                                    "</div>\n"+
                                    "<div class=\"row\">\n"+
                                        "<div class=\"TobeCenter\">\n"+
                                            "<span >\n"+
                                                "<strong>作者： </strong>\n"+
                                            "</span>\n"+
                                            "<span class=\"badge badge-info\">"+data[i].authorList+"</span>\n"+
                                            "<span>"+contribution_state+"</span>\n"+
                                        "</div>\n"+
                                    "</div>\n"+
                                    "<div class=\"row\">\n"+
                                        "<div class=\"col-3\">\n"+
                                            "<img src=\"assets/images/paper4.png\" width=\"100\" height=\"100\">\n"+
                                        "</div>\n"+
                                        "<div class=\"col-9\">\n"+
                                            "<div class=\"row\">\n"+
                                                "<p>"+data[i].abstract+"</p>\n"+
                                            "</div>\n"+
                                            "<div class=\"row\">\n"+
                                                "<button class=\"btn ml-2\" style=\"background-color: #2b579a\" onclick=\"submitDownload("+data[i].id.toString()+")\">下载附件</button>\n"+
                                                "<button id=\"btn-pass"+i.toString()+"\" class=\"btn ml-2\" style=\"background-color: #2b579a\" onclick=\"submitPass("+i+","+data[i].id.toString()+","+confid+")\">通过</button>\n"+
                                                "<button id=\"btn-retrieve"+i.toString()+"\" class=\"btn ml-2\" style=\"background-color: #2b579a\" onclick=\"submitRetrieve("+i+","+data[i].id.toString()+","+confid+")\">打回</button>\n"+
                                                "<button id=\"btn-deny"+i.toString()+"\" class=\"btn ml-2\" style=\"background-color: #2b579a\" onclick=\"submitDeny("+i+","+data[i].id.toString()+","+confid+")\">拒绝</button>\n"+
                                            "</div>\n"+
                                        "</div>\n"+
                                    "</div>\n"+
                                    "<div class=\"row \"><h6 class=\"mt-2 remarksSpan ml-3\">修改意见:</h6></div>\n"+
                                    "<div class=\"row\">\n"+
                                        "<textarea id=\"textarea"+i.toString()+"\" class=\"form-control pl-2 pr-2 ml-2 ml-2\" placeholder=\"请输入修改意见\" rows=\"2\"></textarea>\n"+
                                    "</div>\n"+
                                "</div>";
               $('#papersdiv').append(paperdiv);
               if(data[i].checkStatus!=3){
                    disableBtn(i)
               }
           }
       },
       error:function(){
            console.log("return all conference error");
       }
   })
}

function submitFavorite(){
    var confid= getConfIdByUrl();
	var usrid=getUserIdByCookie();
	console.log('onclick. confid: '+confid+' usrid: '+usrid);
    var obj=document.getElementById('conf-favorite-btn');
	if(obj.innerText=='收藏'){
		$.ajax({
			type: "get",
			url: "/addCollection/"+usrid+"/"+confid,
			dataType: "json",
			contentType: 'application/json; charset=UTF-8',
			success: function(data){
			  console.log('add Collection');
			  obj.innerText="取消收藏";
			}
		});
    }else{
		$.ajax({
			type: "get",
			url: "/removeCollection/"+usrid+"/"+confid,
			dataType: "json",
			contentType: 'application/json; charset=UTF-8',
			success: function(data){
			  console.log('remove Collection!');
			  obj.innerText="收藏";
			}
		});
	}
}


function add() {
    var confID = getConfIdByUrl();
    var userID = getUserIdByCookie();
    var urlstr = '/registerNonConference/'+userID+'/'+confID;
    var attendiv="<form method=\"post\" enctype='multipart/form-data' action="+urlstr+" >\n" +
        "                            <div class=\"special\">\n" +
        "\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                   <span>*姓名 </span>\n" +
        "                                    <input type=\"text\" id=\"newname\" name=\"name\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <span>*电话 </span><input type=\"text\" id=\"tel\" name=\"tel\" >\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <span>*性别 </span>\n" +
        "                                    <span><input type=\"radio\" id=\"fradio\" value=\"f\" name='sex' style=\"display: inline\" checked=\"checked\"><label>女</label>\n" +
        "                                    <input type=\"radio\" id=\"mradiio\" value=\"m\" name='sex' style=\"display: inline\"><label>男</label></span>\n" +
        "                                </div>\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <span>*是否住宿 </span>\n" +
        "                                    <span><input type=\"radio\" id=\"yesradio\" name=\"accommodation\" value=\"是\" style=\"display: inline\" checked=\"checked\"><label>是</label>\n" +
        "                                    <input type=\"radio\" id=\"noradiio\" name=\"accommodation\" value=\"否\" style=\"display: inline\"><label>否</label></span>\n" +
        "                                </div>\n" +
        "                                </div>\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-12\" >\n" +
        "                                    <span> 说明 </span><input type=\"text\" id=\"sm\" placeholder=\"说明\" style=\"width: 80%\" name=\"remarks\">\n" +
        "                                </div>\n" +
        "\n" +
        "                            </div>\n" +
        "                                <div class=\"row\" style=\"display: table\">\n" +
        "                                    <div class=\"col-6\">\n" +
        "                                        <span style=\"color: #f96332\">上传缴费凭证</span>\n" +
        "                                        <input  type=\"file\" name=\"file\" required>\n" +
        "                                    </div>\n" +
        "                                    <!--<div class=\"col-3\"></div>-->\n" +
        "                                    <div class=\"col-6 \" style=\"display: table-cell;vertical-align: middle\" >\n" +
        "                                        <button class=\"btn btn-new ml-5\" type=\"submit\" style=\"border-radius: 0.8rem\">申请注册</button>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            </form>"
    $("#attendenceid").append(attendiv);

}
function minus() {
    $(".special:last").remove()
}
function toRegister() {
    identity=getUserIdentityByCookie();
    if(identity==0){
        alert('您无权限参加会议，请先注册为本网站用户');
        return;
    }
    userId=getUserIdByCookie();
    if(userId==0){
        alert('您无权限参加会议，请先注册为本网站用户')
    }
    var confId= getConfIdByUrl();

    $.ajax({
        type: "get",
        url: "/getUserIfSubPaper/"+userId+"/"+confId,
        dataType: "json",
        contentType: 'application/json; charset=UTF-8',
        success: function(data){
            console.log(data.result);
            if(data.result==0){
                urlstr = '/registerConference?id='+confId;
                window.location.href=urlstr;
            }
            else{
                urlstr='/usrRegConf?id'+confId;
                window.location.href=urlstr;
            }
        },
        error:function () {
            console.log('Error');
        }
    });

}
