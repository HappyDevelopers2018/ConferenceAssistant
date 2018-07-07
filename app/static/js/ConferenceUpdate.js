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

    $('#summernote2').summernote({
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

    // $('#summernote3').summernote({
    //     lang: 'zh-CN',
    //     height:300,
    //     toolbar:[
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['fontsize', ['fontsize']],
    //         ['color', ['color']],
    //         ['para', ['ul', 'ol', 'paragraph']],
    //         ['height', ['height']],
    //         ['insert',['table','hr','picture','link']]
    //     ]
    // });
    //
    // $('#summernote4').summernote({
    //     lang: 'zh-CN',
    //     height:300,
    //     toolbar:[
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['fontsize', ['fontsize']],
    //         ['color', ['color']],
    //         ['para', ['ul', 'ol', 'paragraph']],
    //         ['height', ['height']],
    //         ['insert',['table','hr','picture','link']]
    //     ]
    // });


});

function getConfIdByUrl(){
    var thisURL = document.URL;
    var getval =thisURL.split('?')[1];
    var confid= getval.split("=")[1];
    if(confid[confid.length-1]=='#')
        confid=confid.substring(0,confid.length-1);
    return confid;
}

function onload(){


    var confid= getConfIdByUrl();
    // document.getElementById("conferenceName").value="xxxx";
    // console.log('onload. confid: '+confid+' usrid: '+usrid);
    $.ajax({
        type:"GET",
        url:"/returnConference/"+confid,
        dataType:"json",
        success:function(data){
            // var a=data.abstract;
            // var b=$(a);
            // b.appendTo("#dynamicText");
            // $("#contributiondate").html("<p>初稿截稿日期："+data[0].contributionEndTime+"</p>");   //初稿截稿日期：2018-06-29
            // $("#conferenceName").html(data[0].conferenceName);   //中国 · 北京 北京市
            // $("#city").html(data[0].location);   //中国 · 北京 北京市
            // $("#startTime").html(data[0].startTime);   //中国 · 北京 北京市
            // $("#contributionAbstract").html("<p>"+data[0].contributionAbstract+"</p>");      //征稿简介 听众免费
            // $("#ownerName").html(data[0].ownerPeopleName);   ///钟金成
            // $("#ownerEmail").html(data[0].ownerPeopleEmail);   // connorzhong@qq.com
            // $("#ownerTEL").html(data[0].ownerPeopleTel);   // 18508126686
            // $("#ownerOrganization").html(data[0].ownerOrganization);   //北航软件学院
            // $("#supporter").html(data[0].supporter);   //快乐开发项目组
            //
            //
            //
           // console.log(data);
           // console.log(data[0].conferenceName);


            // var markupStr = '<h1>ssssssssss</h1>';
            // $('#summernote').summernote('code', markupStr);




            $("#conferenceNamexx").html(data[0].conferenceName);
            document.getElementById("conferenceName").value=data[0].conferenceName;
            document.getElementById("startTime").value=data[0].startTime;
            document.getElementById("endTime").value=data[0].endTime;
            $("#city").citypicker("reset");
            $("#city").citypicker("destroy");
            document.getElementById("city").value=data[0].city;
            document.getElementById("ownerOrganization").value=data[0].ownerOrganization;
            document.getElementById("supporter").value=data[0].supporter;
            // document.getElementById("summernote").value=data[0].abstract;

            //**********
            console.log("地点");
            console.log(data[0].city);
            var tem=unescape(unescape(data[0].abstract));
            var b=$(tem);
            $('#summernote').summernote('code', b);

            sessionStorage.tem=tem;
            sessionStorage.b=b;

            document.getElementById("ownerPeopleName").value=data[0].ownerPeopleName;
            document.getElementById("ownerPeopleTel").value=data[0].ownerPeopleTel;
            document.getElementById("ownerPeopleEmail").value=data[0].ownerPeopleEmail;
            document.getElementById("contributionStartTime").value=data[0].contributionStartTime;
            document.getElementById("contributionEndTime").value=data[0].contributionEndTime;

            //*****************
            tem=unescape(unescape(data[0].contributionAbstract));
            b=$(tem);
            $('#summernote2').summernote('code', b);

            // document.getElementById("summernote2").value=data[0].contributionAbstract;
            document.getElementById("registerStartTime").value=data[0].registerStartTime;
            document.getElementById("registerEndTime").value=data[0].registerEndTime;


        },
        error: function(data){
            alert("error");
        }
    })
}

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


function save(){
    var confid= getConfIdByUrl();
    // var a=sessionStorage.startTime.split("-");
    // var startTimedate=new Date(a[0],a[1],a[2]);
    // a=sessionStorage.endTime.split("-");
    // var endTimedate=new Date(a[0],a[1],a[2]);
    // a=sessionStorage.contributionStartTime.split("-");
    // var contributionStartTimedate=new Date(a[0],a[1],a[2]);
    // a=sessionStorage.contributionEndTime.split("-");
    // var contributionEndTimedate=new Date(a[0],a[1],a[2]);

    // var name=getUserIdByCookie();


    var detecter=true;

    //detect
    if($("#conferenceName").val()=='')
    {
        detecter=false;
        $("#dconferenceName").addClass("has-error");
        window.location.href="#dconferenceName";
    }
    else
    {
        $("#dconferenceName").removeClass("has-error");
        $("#dconferenceName").addClass("has-success");
    }
    if($("#startTime").val()=='')
    {
        detecter=false;
        $("#dstartTime").addClass("has-error");
        window.location.href="#dstartTime";
    }
    else
    {
        $("#dstartTime").removeClass("has-error");
        $("#dstartTime").addClass("has-success");
    }

    if($("#endTime").val()=='')
    {
        detecter=false;
        $("#dendTime").addClass("has-error");
        window.location.href="#dendTime";
    }
    else
    {
        $("#dendTime").removeClass("has-error");
        $("#dendTime").addClass("has-success");
    }
    if($("#city").val()=='')
    {
        detecter=false;
        $("#dcity").addClass("has-error");
        window.location.href="#dcity";
    }
    else
    {
        $("#dcity").removeClass("has-error");
        $("#dcity").addClass("has-success");
    }

    if($("#location").val()=='')
    {
        detecter=false;
        $("#dlocation").addClass("has-error");
        window.location.href="#dlocation";
    }
    else
    {
        $("#dlocation").removeClass("has-error");
        $("#dlocation").addClass("has-success");
    }
    if($("#ownerOrganization").val()=='')
    {
        detecter=false;
        $("#downerOrganization").addClass("has-error");
        window.location.href="#downerOrganization";
    }
    else
    {
        $("#downerOrganization").removeClass("has-error");
        $("#downerOrganization").addClass("has-success");
    }


    if($("#ownerPeopleName").val()=='')
    {
        detecter=false;
        $("#downerPeopleName").addClass("has-error");
        window.location.href="#downerPeopleName";
    }
    else
    {
        $("#downerPeopleName").removeClass("has-error");
        $("#downerPeopleName").addClass("has-success");
    }

    if($("#ownerPeopleTel").val()=='')
    {
        detecter=false;
        $("#downerPeopleTel").addClass("has-error");
        window.location.href="#downerPeopleTel";
    }
    else
    {
        $("#downerPeopleTel").removeClass("has-error");
        $("#downerPeopleTel").addClass("has-success");
    }
    if($("#ownerPeopleEmail").val()=='')
    {
        detecter=false;
        $("#downerPeopleEmail").addClass("has-error");
        window.location.href="#downerPeopleEmail";
    }
    else {
        $("#downerPeopleEmail").removeClass("has-error");
        $("#downerPeopleEmail").addClass("has-success");
    }
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

    if(!checker($("#startTime").val(),$("#endTime").val())){
        detecter=false;
        $("#dstartTime").addClass("has-error");
        $("#dendTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("会议截止日期不可早于开始日期");
    }
    if(!checker($("#contributionStartTime").val(),$("#contributionEndTime").val())){
        detecter=false;
        $("#dstartTime").addClass("has-error");
        $("#dendTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("投稿截止日期不可早于开始日期");
    }
    if(!checker($("#registerStartTime").val(),$("#registerEndTime").val())){
        detecter=false;
        $("#dstartTime").addClass("has-error");
        $("#dendTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("注册截止日期不可早于开始日期");
    }
    if(!checker($("#contributionEndTime").val(),$("#registerStartTime").val())){
        detecter=false;
        $("#dstartTime").addClass("has-error");
        $("#dendTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("注册开始日期不得早于投稿截止日期");
    }
    if(!checker($("#registerEndTime").val(),$("#startTime").val())){
        detecter=false;
        $("#dstartTime").addClass("has-error");
        $("#dendTime").addClass("has-error");
        window.location.href="#dstartTime";
        alert("注册截止日期不得晚于会议开始日期");
    }


    var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
    var emailAnaly=patten.test($("#ownerPeopleEmail").val());

    if(!detecter){

    }
    else if(!emailAnaly){
        // detecter=false;
        $("#downerPeopleEmail").addClass("has-error");
        alert("请输入正确的邮箱地址");
        window.location.href="#downerPeopleEmail";
    }
    else{
        $("#downerPeopleEmail").removeClass("has-error");
        $("#downerPeopleEmail").addClass("has-success");
        var data={

            'id':confid,
            'conferenceName':$("#conferenceName").val(),
            'startTime':$("#startTime").val(),
            'endTime':$("#endTime").val(),
            'city':$("#city").val(),
            'ownerOrganization':$("#ownerOrganization").val(),
            'supporter':$("#supporter").val(),
            'abstract':escape($("#summernote").summernote('code').toString()),

            'ownerPeopleName':$("#ownerPeopleName").val(),
            'ownerPeopleTel':$("#ownerPeopleTel").val(),
            'ownerPeopleEmail':$("#ownerPeopleEmail").val(),

            //process2
            'contributionStartTime':$("#contributionStartTime").val(),
            'contributionEndTime':$("#contributionEndTime").val(),
            'contributionAbstract':escape($("#summernote2").summernote('code').toString()),

            //process3
            'registerStartTime':$("#registerStartTime").val(),
            'registerEndTime':$("#registerEndTime").val(),
        }
        // console.log("my data:");
        // console.log(data);

        $.ajax({
            type: "POST",
            url: "/conf_info_upd_API",
            data: data,
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                if(data.result=="0")
                {
                    console.log("error");
                    console.log(data);
                    window.location.href="/primary_info";
                }
                else {
                    console.log("/ConferenceIndex?id=" + data.result);
                    window.location.href ="/ConferenceIndex?id="+ data.result;
                }

            }
        });
    }


}
