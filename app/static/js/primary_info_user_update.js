function load_notification()
{
    var id =getUserIdByCookie();
    var flag = false;
    if (id != 0) 
    {
    
        $.ajax({
            type:"GET",
            url:"/countMessage/"+id,
            dataType:"json",
            success:function(data){
                if (data[0].count ==  0)
                    $("#return-top").css("display","None")
                
            }
        }
        );
    }
    else 
    {
        $("#return-top").css("display","None")
    }
}
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

function messageBox(){
    window.location.href="messageBox"
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
    load_notification();
    $.ajax({
        type:"GET",
        url:"/returnUser/"+id,
        dataType:"json",
        success:function(data){
            $("#name").html(data[0].name);
            // $("#organization").html(data[0].organization);
            // if(data[0].email!='')
            //     $("#inputEmail3").html(data[0].email);
            // else
            //     $("#inputEmail3").html("无");
            // if(!data[0].TEL)
            //     $("#inputTEL").html(data[0].TEL);
            // else
            //     $("#inputTEL").html("无");
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


function save(){
    var detecter = 0;
    var id=getUserIdByCookie();

    if($("#name_update").val()!="")
    {
        sessionStorage.name_update=$("#name_update").val();
        var data={
            "id" : id,
            'realName': sessionStorage.name_update /*******************************************/
        };
        $.ajax({
            type: "POST",
            url: "/primary_info_name_upd_API",
            data: data,
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                if(data.result=="0")
                {
                    console.log("organization_sucess");
                    detecter=1;
                }
                else
                {
                    console.log("organization_error");
                }

            }
        });
    }

    if($("#organization_update").val()!="")
    {
        sessionStorage.organization_update=$("#organization_update").val();
        var data={
            "id" : id,
            'organization': sessionStorage.organization_update /*******************************************/
        };
        $.ajax({
            type: "POST",
            url: "/primary_info_organization_upd_API",
            data: data,
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                if(data.result=="0")
                {
                    console.log("organization_sucess");
                    detecter=detecter+10;
                }
                else
                {
                    console.log("organization_error");
                }

            }
        });
    }

    if($("#Email_update").val()!="")
    {
        sessionStorage.Email_update=$("#Email_update").val();
        var data={
            'id' : id,
            'email': sessionStorage.Email_update /*******************************************/
        };
        console.log(id);
        console.log(sessionStorage.Email_update);
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/primary_info_email_upd_API",
            data: data,
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                if(data.result=="0")
                {
                    console.log("email_sucess");
                    detecter=detecter+100;
                }
                else
                {
                    console.log("email_error");
                }
            },
            error: function () {

                console.log("inerror_email_error");
            }
        });
    }

    window.location.href="primary_info_user";

    if(detecter == 0)
    {
        alert("修改成功")
    }
    else if(detecter>=100)
    {
        alert("修改TEL失败")
    }
    else if(detecter>=10)
    {
        alert("修改Email失败")
    }
    else
    {
        alert("修改账户名失败")
    }

}