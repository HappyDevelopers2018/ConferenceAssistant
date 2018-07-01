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
