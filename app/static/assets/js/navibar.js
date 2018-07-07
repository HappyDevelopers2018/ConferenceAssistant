function toMy() {
    namee = getUserNameByCookie();
    console.log(namee)
    identity=getUserIdentityByCookie();
    
    id = getUserIdByCookie();
    if(namee=="admin"){
        window.location.href='/admin';
        return;
    }
    else if(identity==3){
        window.location.href='primary_info?id='+id;
    }
    else if(identity==1){
        window.location.href='primary_info_user?id='+id;
    }
    else if(identity==4){
        alert('您的机构用户认证被拒绝')
    }
    else if(identity==2){
        alert('您的机构用户账号正在审核中')
    }
    else{
        alert("请注册")
    }
}

function search1() {
    // alert("search1")
    console.log(document.getElementById('searchKey').value);
    var searchKey1=$('#searchKey').val();
   // console.log(searchKey1);
    var url = 'searchPage?searchKey='+searchKey1;

    window.location.href=url;
}
function submitConf() {
    identity=getUserIdentityByCookie();
    if(identity==3) {
        window.location.href = 'process1'
    }
    else if(identity==2){
        alert('该单位用户申请正在审核中')
    }
    else if(identity==4){
        alert('该单位用户申请被拒绝')
    }else{
        alert('您没有权限创建会议，请注册为机构用户')
    }
}
function getName() {
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

}
function login() {
    name=getUserNameByCookie();
    //console.log("name"+name)
    if(!name){
        window.location.href="login";

    }
    else{
        var identity=''
        if(name =="admin")identity="管理员"
        idd = getUserIdentityByCookie()
        if(idd==1)identity="个人用户"
        else if(idd == 3)identity="单位用户"
        else if(idd==2)identity="审核中"
        else if(idd==4)identity="审核失败"
        //alert(identity)
        $('#login').html(name+" ("+identity+")");
    }


}
function logout() {
    var t=new Date();
    t.setTime(0);
    document.cookie="name=;expires="+t.toGMTString()+";path=/";
    document.cookie="id=;expires="+t.toGMTString()+";path=/";
    name="";
    $('#login').html("登录");
    window.location.href="index";
}
function myFunction() {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}

