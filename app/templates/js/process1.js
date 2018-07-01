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

    if(typeof(sessionStorage.xiangqing)!="undefined")
    {
        $("#summernote").summernote('code',sessionStorage.xiangqing);
    }
    if(typeof(sessionStorage.conferenceName)!="undefined")
    {
        $("#conferenceName").val(sessionStorage.conferenceName);
    }
    if(typeof(sessionStorage.shortname)!="undefined")
    {
        $("#shortname").val(sessionStorage.shortname);
    }
    if(typeof(sessionStorage.startTime)!="undefined")
    {
        $("#startTime").val(sessionStorage.startTime);
    }
    if(typeof(sessionStorage.endTime)!="undefined")
    {
        $("#endTime").val(sessionStorage.endTime);
    }
    if(typeof(sessionStorage.city)!="undefined")
    {
        $("#city").val(sessionStorage.city);
    }
    if(typeof(sessionStorage.location)!="undefined")
    {
        $("#location").val(sessionStorage.location);
    }
    if(typeof(sessionStorage.ownerOrganization)!="undefined")
    {
        $("#ownerOrganization").val(sessionStorage.ownerOrganization);
    }
    if(typeof(sessionStorage.supporter)!="undefined")
    {
        $("#supporter").val(sessionStorage.supporter);
    }
    if(typeof(sessionStorage.organizer)!="undefined")
    {
        $("#organizer").val(sessionStorage.organizer);
    }
    if(typeof(sessionStorage.site)!="undefined")
    {
        $("#site").val(sessionStorage.site);
    }
    if(typeof(sessionStorage.checker)!="undefined")
    {
        $("#checker").val(sessionStorage.checker);
    }
    if(typeof(sessionStorage.ownerPeopleName)!="undefined")
    {
        $("#ownerPeopleName").val(sessionStorage.ownerPeopleName);
    }
    if(typeof(sessionStorage.ownerPeopleTel)!="undefined")
    {
        $("#ownerPeopleTel").val(sessionStorage.ownerPeopleTel);
    }
    if(typeof(sessionStorage.ownerPeopleEmail)!="undefined")
    {
        $("#ownerPeopleEmail").val(sessionStorage.ownerPeopleEmail);
    }

});


function nextstep(){

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
    else
    {
        $("#downerPeopleEmail").removeClass("has-error");
        $("#downerPeopleEmail").addClass("has-success");
    }







    //save

    var a=$("#summernote").summernote('code').toString();
    sessionStorage.xiangqing=a;
    sessionStorage.conferenceName=$("#conferenceName").val();
    sessionStorage.shortname=$("#shortname").val();
    sessionStorage.startTime=$("#startTime").val();
    sessionStorage.endTime=$("#endTime").val();
    sessionStorage.city=$("#city").val();
    sessionStorage.location=$("#location").val();
    sessionStorage.ownerOrganization=$("#ownerOrganization").val();
    sessionStorage.supporter=$("#supporter").val();
    sessionStorage.organizer=$("#organizer").val();
    sessionStorage.site=$("#site").val();



    sessionStorage.ownerPeopleName=$("#ownerPeopleName").val();
    sessionStorage.ownerPeopleTel=$("#ownerPeopleTel").val();
    sessionStorage.ownerPeopleEmail=$("#ownerPeopleEmail").val();

    console.log($("#city-picker3").val());

    if(detecter)
    {
        window.location.href="process2";
    }
   //
}