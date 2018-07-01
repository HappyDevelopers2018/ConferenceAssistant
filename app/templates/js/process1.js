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
    window.location.href="process2";
}