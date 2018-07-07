var cid,id,idd;
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
function onload()
{
	id=getUserIdByCookie();
	name=getUserNameByCookie();
    console.log(name);
    if(name){
        var identity=''
        if(name =="admin")identity="管理员"
        idd = getUserIdentityByCookie()
        if(idd==1)identity="个人用户"
        else if(idd == 3)identity="单位用户"
        else if(idd==2)identity="审核中"
        else if(idd==4)identity="审核失败"
        //alert(identity)
        $('#login').html(name+" ("+identity+")");
        // $("#alarm").css("display",'block')
    }
	cid=getParam().cid;
	$.ajax({
        type:"GET",
        url:"/returnConference/"+cid,
        dataType:"json",
        success:function(data){
            // var a=data[0].abstract;
            // var b=$(a);
            // b.appendTo("#dynamicText");
            $("#conferenceName").html(data[0].conferenceName);   //中国 · 北京 北京市
            $("#city").html(data[0].location);   //中国 · 北京 北京市
            $("#startTime").html(data[0].startTime);   //中国 · 北京 北京市
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
					if(data=='1'){
						obj.innerText="取消收藏";
					}else{
						obj.innerText="收藏";
					}
				}
			})
       }
}
$(function() {
	$(".tags_enter").blur(function() { //焦点失去触发 
		var txtvalue=$(this).val().trim();
		if(txtvalue!=''){
			addTag($(this));
			$(this).parents(".tags").css({"border-color": "#d5d5d5"})
		}
	}).keydown(function(event) {
		var key_code = event.keyCode;
		var txtvalue=$(this).val().trim(); 
		if (key_code == 13&& txtvalue != '') { //enter
			addTag($(this));
		}
		if (key_code == 32 && txtvalue!='') { //space
			addTag($(this));
		}
	});
	$(document).on("click",".close", function() {
		$(this).parent(".tag").remove();
	});
	$(".tags").click(function() {
		$(this).css({"border-color": "#6c89e3"})
	}).blur(function() {
		$(this).css({"border-color": "#d5d5d5"})
	})
})
function addTag(obj) {
	var tag = obj.val();
	if (tag != '') {
		var i = 0;
		$(".tag").each(function() {
			if ($(this).text() == tag + "×") {
				$(this).addClass("tag-warning");
				setTimeout("removeWarning()", 400);
				i++;
			}
		})
		obj.val('');
		if (i > 0) { //说明有重复
			return false;
		}
		$("#form-field-tags").before("<span class='tag'>" + tag + "<button class='close' type='button'>×</button></span>"); //添加标签
	}
}
function removeWarning() {
	$(".tag-warning").removeClass("tag-warning");
}





function getAuthor()
{
	var res="";
	var l=$(".tag").length;
	for(var i=0;i<l;i++)
		{
			var t=$($(".tag")[i]).text().slice(0,-1);
			res+=t;
			if(i!=l-1)
				res+=',';
		}
	return res;
}

function check_1()
{
	if(getAuthor()==""||$("#title").val().toString()==""||$("#abstract").val().toString()=="")
	{
		alert("必填项不能为空");
	}
	else
		{
			var data={"title":$("#title").val().toString(),"author":getAuthor(),"abstract":$("#abstract").val().toString()};
			$("#realform").attr("action","/userContribute/"+id.toString()+"/"+cid.toString()+"/"+data.author);
			var form_data = new FormData($('#realform')[0]);
    		$.ajax({
				url: "/userContribute/"+id.toString()+"/"+cid.toString()+"/"+data.author,
        		type: 'POST',
        		data: form_data,
        		contentType: false,
        		processData: false,
        		success: function(data){
            				if(data.result.toString()=='1')
								{
									alert("投稿成功");
									window.location.href="/ConferenceIndex?id="+cid.toString();
								}
							else{
								window.location.reload();
							}
        			},
				});
		}
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
                urlstr='/registerConference?id='+confId;
                window.location.href=urlstr;
            }
        },
        error:function () {
            console.log('Error');
        }
    });

}
function toTougao()
{
	window.location.href="/tougao?cid="+getConfIdByUrl().toString();
}	
	
	
	
	
	
	
	
	
	
	
	