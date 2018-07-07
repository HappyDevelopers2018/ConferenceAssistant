$(document).ready(function() {
    $('#summernote').summernote({
        lang: 'zh-CN',
        height:180,
        toolbar:[
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['table','hr','picture','link']]
        ]
    });
    $('#summernote2').summernote({
        lang: 'zh-CN',
        height:180,
        toolbar:[
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['table','hr','picture','link']]
        ]
    });

    if(typeof(sessionStorage.p3_xiangqing1)!="undefined")
    {
        $("#summernote").summernote('code',sessionStorage.p3_xiangqing1);
    }
    if(typeof(sessionStorage.authorName)!="undefined")
    {
        $("#authorName").val(sessionStorage.authorName);
    }
    if(typeof(sessionStorage.registerStartTime)!="undefined")
    {
        $("#registerStartTime").val(sessionStorage.registerStartTime);
    }
    if(typeof(sessionStorage.registerEndTime)!="undefined")
    {
        $("#registerEndTime").val(sessionStorage.registerEndTime);
    }
    if(typeof(sessionStorage.p3_xiangqing2)!="undefined")
    {
        $("#summernote2").summernote('code',sessionStorage.p3_xiangqing2);
    }

});

function checker(a,b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes >= lktimes) {

        return false;
    }
    else
        return true;

}

function nextstep(){

    var detecter=true;

    //判断逻辑
    if($("#authorName").val()=='')
    {
        detecter=false;
        $("#dauthorName").addClass("has-error");
        window.location.href="#dauthorName";
    }
    else
    {
        $("#dauthorName").removeClass("has-error");
        $("#dauthorName").addClass("has-success");
    }

    if($("#registerStartTime").val()=='')
    {
        detecter=false;
        $("#dregisterStartTime").addClass("has-error");
        window.location.href="#dauthorPrice";
    }
    else
    {
        $("#dregisterStartTime").removeClass("has-error");
        $("#dregisterStartTime").addClass("has-success");
    }

    if($("#registerEndTime").val()=='')
    {
        detecter=false;
        $("#dregisterEndTime").addClass("has-error");
        window.location.href="#dauthorNumber";
    }
    else
    {
        $("#dregisterEndTime").removeClass("has-error");
        $("#dregisterEndTime").addClass("has-success");
    }
    if(!checker($("#registerStartTime").val(),$("#registerEndTime").val())){
        detecter=false;
        $("#dregisterStartTime").addClass("has-error");
        $("#dregisterEndTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("截止日期不可早于开始日期");
    }
    if(!checker($("#registerEndTime").val(),sessionStorage.startTime)){
        detecter=false;
        $("#dregisterStartTime").addClass("has-error");
        $("#dregisterEndTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("注册截止日期不得晚于会议开始日期");
    }
    if(!checker(sessionStorage.contributionEndTime,$("#registerStartTime").val())){
        detecter=false;
        $("#dregisterStartTime").addClass("has-error");
        $("#dregisterEndTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("注册开始日期不得早于投稿截止日期");
    }

    //存储
    sessionStorage.authorPrice=$("#authorPrice").val();
    sessionStorage.registerStartTime=$("#registerStartTime").val();
    sessionStorage.registerEndTime=$("#registerEndTime").val();
    sessionStorage.p3_xiangqing1=$("#summernote").summernote('code').toString();
    sessionStorage.p3_xiangqing2=$("#summernote2").summernote('code').toString();

    if(detecter)
    {
       // console.log("sucess");
        window.location.href="process4";
    }

}

function laststep(){
    

    window.location.href="process2";
}
