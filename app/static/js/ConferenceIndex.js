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

function UnicodeToUtf8(unicode) {
  var uchar;
  var utf8str = "";
  var i;
  for(i=0; i<unicode.length;i+=2){
    uchar = (unicode[i]<<8) | unicode[i+1];        //UNICODE为2字节编码，一次读入2个字节
    utf8str = utf8str + String.fromCharCode(uchar);  //使用String.fromCharCode强制转换
  }
  return utf8str;
}

function onload(){
	var confid= getConfIdByUrl();
	var usrid=getUserIdByCookie();
	console.log('onload. confid: '+confid+' usrid: '+usrid);
    $.ajax({
        type:"GET",
        url:"/returnConference/"+confid,
        dataType:"json",
        success:function(data){
            // var a=data[0].abstract;
            // var b=$(a);
            // b.appendTo("#dynamicText");
            $("#dynamicText").html(unescape(unescape(data[0].abstract)));
            $("#contributiondate").html("<p><strong>投稿开始日期</strong>："+data[0].contributionStartTime+"</p>" +
                                        "<p><strong>投稿截止日期</strong>："+data[0].contributionEndTime+"</p>" +
                                        "<p><strong>注册开始日期</strong>："+data[0].registerStartTime+"</p>" +
                                        "<p><strong>注册截止日期</strong>："+data[0].registerEndTime+"</p>"

            );   //初稿截稿日期：2018-06-29

            $("#conferenceName").html(data[0].conferenceName);   //中国 · 北京 北京市
            $("#city").html(data[0].location);   //中国 · 北京 北京市
            $("#startTime").html(data[0].startTime);   //中国 · 北京 北京市
            $("#contributionAbstract").html(unescape(unescape(data[0].contributionAbstract)));      //征稿简介 听众免费
            $("#ownerName").html(data[0].ownerPeopleName);   ///钟金成
            $("#ownerEmail").html(data[0].ownerPeopleEmail);   // connorzhong@qq.com
            $("#ownerTEL").html(data[0].ownerPeopleTel);   // 18508126686
            $("#ownerOrganization").html(data[0].ownerOrganization);   //北航软件学院
            $("#supporter").html(data[0].supporter);   //快乐开发项目组
			console.log(data[0]);
			$.ajax({
				type:"get",
				url:"/judgeCollection/"+usrid+"/"+confid,
				dataType:"json",
				success:function(data){
					console.log('collection state: '+data);
					var obj=document.getElementById('conf-favorite-btn');
                    if(!obj){
                        return
                    }
					if(data=='1'){
						obj.innerText="取消收藏";
					}else{
						obj.innerText="收藏";
					}
				}
			})
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
function postFun() {
    var name=document.getElementById('newname').value;
    var tel=document.getElementById('telForm').value;
    var file=document.getElementById('fileForm').value;
    if(name==""|| tel=="" || file==""){
        alert('请完善表单');
        return;
    }
    var confId = getConfIdByUrl();
    var userId = getUserIdByCookie();
    console.log(userId);
    console.log(confId);
    var form_data=new FormData($('#form1')[0]);
    $.ajax({
        type:'post',
        url:'/registerNonConference/'+userId+'/'+confId,
        data:form_data,
        contentType: false,
        processData: false,
        success:function (data) {
            console.log(data);
            if(data.result==1){
                alert('注册成功!');
                urlstr='ConferenceIndex?id='+confId;
                window.location.href=urlstr;

              //  window.location.reload();
            }
            else{
                alert('您已注册该会议');
                urlstr='ConferenceIndex?id='+confId;
                window.location.href=urlstr;

            }
        },
        error:function () {
            alert('注册成功');
            urlstr='ConferenceIndex?id='+confId;
            window.location.href=urlstr;
        }

    })
}

function add() {

    //var urlstr = '/registerNonConference/'+userID+'/'+confID;
    var attendiv="<form role='form' id='form1' method=\"post\" enctype='multipart/form-data'>\n" +
        "                            <div class=\"special\">\n" +
        "\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                   <span>*姓名 </span>\n" +
        "                                    <input type=\"text\" id=\"newname\" name=\"newname\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <span>*电话 </span><input type=\"text\" id=\"telForm\" name=\"telForm\" >\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <span>*性别 </span>\n" +
        "                                    <span><input type=\"radio\" id=\"fradio\" value=\"f\" name='gender' style=\"display: inline\" checked=\"checked\"><label>女</label>\n" +
        "                                    <input type=\"radio\" id=\"mradiio\" value=\"m\" name='gender' style=\"display: inline\"><label>男</label></span>\n" +
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
        "                                        <input  type=\"file\" name=\"fileForm\" id=\'fileForm\' required>\n" +
        "                                    </div>\n" +
        "                                    <!--<div class=\"col-3\"></div>-->\n" +
        "                                    <div class=\"col-6 \" style=\"display: table-cell;vertical-align: middle\" >\n" +
        "                                        <button class=\"btn btn-new ml-5\" style=\"border-radius: 0.8rem\" onclick=\'postFun()\'>申请注册</button>\n" +
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
        url: "/getIfPaper/"+userId+"/"+confId,
        dataType: "json",
        contentType: 'application/json; charset=UTF-8',
        success: function(data){
            console.log(data.result);
            if(data.result==0){
                //urlstr = '/registerConference?id='+confId;
                //window.location.href=urlstr;
                $.ajax({
                    type: "get",
                    url: "/getUserIfSubPaper/" + userId + "/" + confId,
                    dataType: "json",
                    contentType: 'application/json; charset=UTF-8',
                    success: function (data) {
                        console.log(data.result);
                        if (data.result == 1) {
                            alert('您已注册此会议');
                            window.location.reload();
                        }
                        else if (data.result == 0) {
                            urlstr = '/registerConferencePage?id='+confId;
                            window.location.href=urlstr;
                        }
                    },
                    error:function () {
                        console.log('error');
                    }
                })
            }
            else if(data.result==1){
                $.ajax({
                    type: "get",
                    url: "/getUserIfSubPaper/" + userId + "/" + confId,
                    dataType: "json",
                    contentType: 'application/json; charset=UTF-8',
                    success: function (data) {
                        console.log(data.result);
                        if (data.result == 1) {
                            alert('您已注册此会议');
                            window.location.reload();
                        }
                        else if (data.result == 0) {
                            urlstr = '/usrRegConf?id=' + confId;
                            window.location.href = urlstr;
                        }
                    },
                    error:function () {
                        console.log('error');
                    }
                })
            }
        },
        error:function () {
            console.log('error');
        }
    });

}
function toTougao()
{
	window.location.href="/tougao?cid="+getConfIdByUrl().toString();
}




