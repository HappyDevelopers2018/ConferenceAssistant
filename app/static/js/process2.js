$(document).ready(function() {
    $('#summernote').summernote({
        lang: 'zh-CN',
        height:300,
        toolbar:[
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['table','hr','picture','link']]
        ]
    });

    if(typeof(sessionStorage.p2_xiangqing)!="undefined")
    {
        $("#summernote").summernote('code',sessionStorage.p2_xiangqing);
    }
    if(typeof(sessionStorage.contributionStartTime)!="undefined")
    {
        $("#contributionStartTime").val(sessionStorage.contributionStartTime);
    }
    if(typeof(sessionStorage.contributionEndTime)!="undefined")
    {
        $("#contributionEndTime").val(sessionStorage.contributionEndTime);
    }
    if(typeof(sessionStorage.contributionTheme)!="undefined")
    {
        $("#contributionTheme").val(sessionStorage.contributionTheme);
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

    if($("#contributionStartTime").val()=='')
    {
        detecter=false;
        $("#dcontributionStartTime").addClass("has-error");
        window.location.href="#dcontributionStartTime";
    }
    else
    {
        $("#dcontributionStartTime").removeClass("has-error");
        $("#dcontributionStartTime").addClass("has-success");
    }
    if($("#contributionEndTime").val()=='')
    {
        detecter=false;
        $("#dcontributionEndTime").addClass("has-error");
        window.location.href="#dcontributionEndTime";
    }
    else
    {
        $("#dcontributionEndTime").removeClass("has-error");
        $("#dcontributionEndTime").addClass("has-success");
    }

    if($("#contributionTheme").val()=='')
    {
        detecter=false;
        $("#dcontributionTheme").addClass("has-error");
        window.location.href="#dcontributionTheme";
    }
    else
    {
        $("#dcontributionTheme").removeClass("has-error");
        $("#dcontributionTheme").addClass("has-success");
    }
    if(!checker($("#contributionStartTime").val(),$("#contributionEndTime").val())){
        detecter=false;
        $("#dcontributionStartTime").addClass("has-error");
        $("#dcontributionEndTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("截止日期不可早于开始日期");
    }
    if(!checker($("#contributionEndTime").val(),sessionStorage.startTime)){
        detecter=false;
        $("#dcontributionStartTime").addClass("has-error");
        $("#dcontributionEndTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("投稿截止日期不得晚于会议开始日期");
    }

    sessionStorage.contributionStartTime=$("#contributionStartTime").val();
    sessionStorage.contributionEndTime=$("#contributionEndTime").val();
    sessionStorage.contributionTheme=$("#contributionTheme").val();
    sessionStorage.p2_xiangqing=$("#summernote").summernote('code').toString();

    if(detecter)
    {
        window.location.href="process3";
    }

}

function laststep(){

    window.location.href="process1";
}
