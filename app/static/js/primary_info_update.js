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
                    $("#return-top").css("display","None");
                
            }
        }
        );
    }
    else 
    {
        $("#return-top").css("display","None");
    }
}

function onload(){
        load_notification();
    var id=getUserIdByCookie();
    $.ajax({
        type:"GET",
        url:"/returnUser/"+id,
        dataType:"json",
        success:function(data){
            $("#name").html(data[0].name);
            $("#organization").html(data[0].organization);
        }
    })
}
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
function logout(){
    var t=new Date();
    t.setTime(0);
    document.cookie="name=;expires="+t.toGMTString()+";path=/";
    document.cookie="id=;expires="+t.toGMTString()+";path=/";
    document.cookie="identity=;expires="+t.toGMTString()+";path=/";
    window.location.href="/index";
}

function save(){
    var detecter = 0;
    var id=getUserIdByCookie();

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
                    detecter=10;
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
                    detecter=10;
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

    window.location.href="primary_info";

    if(detecter == 0)
    {
        alert("修改成功")
    }
    else if(detecter>=100)
    {
        alert("修改TEL失败")
    }
    else
    {
        alert("修改Email失败")
    }

}