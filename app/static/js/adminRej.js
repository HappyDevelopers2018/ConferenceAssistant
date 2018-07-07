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
function download(filename,postfix){
    var fname = filename+"."+postfix
    console.log(fname)
    /*
    $.ajax({
        type:"GET",
        url:"/download/"+fname,
        success:function(data){
            console.log("sucess")
            console.log(data)
        }

        error:function(data)
        {
            console.log("error")
            console.log(data)
        }

    })
    */
    window.location.href="/download/"+fname
}
function pass(id){
    $.ajax({
        type:"GET",
        url:"/passIdentity/"+id,
        dataType:"json",
        success:function(){
            console.log("sucess")
            $("div#org"+id).remove()
        },
        error:function()
        {
            console.log("error")
        }
    })




}
function reject(id){
    $.ajax({
        type:"GET",
        url:"/rejectIdentity/"+id,
        dataType:"json",
        success:function(){
            console.log("sucess")
            $("div#org"+id).remove()
        },
        error:function()
        {
            console.log("error")
        }
    })
}
function onload(){
    name=getUserNameByCookie();
    console.log(name)
    if(!name){
         window.location.href="login";
    }
    else if(name!="admin")
    {
        alert("抱歉，你不是管理员！");
        window.location.href="index";
    }
    else{
	$.ajax({
		type:"GET",
		url:"/returnRejectOrg",
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
					//var a=$("<div onclick='toxiangqing("+data[i].id+")'class='mouseovera' style='float:left; width:95%;height:200px;border:1px solid grey;'><div style='width:1%;height:99%;float:left;margin: 0.1%'></div><div style='width:90%;height:100%;float:left;margin:2%'><p>会议名称:&nbsp<b>"+data[i].conferenceName+"</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp会议时间：&nbsp "+data[i].startTime+" <button style='float:right' type='button;' class='btn btn-default' onclick='manage_conference()'>管理会议</button> </p><br><p>会议简介："+data[i].abstract+"</p></div></div>");
					var all = data[i].filepath.split('/')
					var le = all.length
					var fname = all[le-1]
					//fname = "\""+fname+"\""
					fl = fname.split('.')
					var filename = fl[0]
					var postfix = fl[1]
					console.log(filename)
                    console.log(postfix)
					var a = $("<div class='mouseovera' id = 'org"+data[i].id+"' style='float:left; width:95%;height:180px;border:1px solid grey;'><div style=width:1%;height:99%;float:left;margin: 0.1%></div><div style='width:90%;height:100%;float:left;margin:2%'><p>认证机构用户名:<b>"+data[i].name+"</b><button style=\"float:right\" type=\"button;\" class=\"btn btn-default\" onclick=\"pass("+data[i].id+")\">通过</button></p><p>认证机构负责人真实姓名:<b>"+data[i].realname+"</b></p><p>认证机构机构名:<b>"+data[i].organization+"</b></p><p>认证机构邮箱:<b>"+data[i].email+"</b></p><p><button style=\"float:right\" type=\"button;\" class=\"btn btn-default\" onclick=\"download('"+filename+"','"+postfix+"')\">下载认证资料</button></p></div></div>")
					a.appendTo("#showblock");
				}
			changecolor();
		},
		error:function(){
		    console.log("error");
		}
	})
	}

}

function admin(){
	window.location.href="/admin";
}
function adminAC(){
	window.location.href="/adminAC";
}
function adminRej(){
	window.location.href="/adminRej";
}
/*
function conference_manage(){
	window.location.href="/conference_manage";
}
function money(){
	window.location.href="";
}
function sons_manage(){
	window.location.href="/sons_manage";
}
*/
