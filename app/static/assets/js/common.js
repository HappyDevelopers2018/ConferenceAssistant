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
function search1() {
    console.log(document.getElementById('searchKey').value);
    var searchKey1=$('#searchKey').val();
   // console.log(searchKey1);
    window.location.href='searchPage?searchKey='+searchKey1;
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
function login() {
    name=getUserNameByCookie();
    //console.log(name);
    if(!name){
        window.location.href="login";

    }
    else{
        $('#login').html(name);
    }
}
function getName() {
    name=getUserNameByCookie();
    //console.log(name);
    if(name){
        $('#login').html(name);
    }
}
