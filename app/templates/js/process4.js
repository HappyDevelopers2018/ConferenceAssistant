$(document).ready(function() {

});
function nextstep(){
    // var a=sessionStorage.startTime.split("-");
    // var startTimedate=new Date(a[0],a[1],a[2]);
    // a=sessionStorage.endTime.split("-");
    // var endTimedate=new Date(a[0],a[1],a[2]);
    // a=sessionStorage.contributionStartTime.split("-");
    // var contributionStartTimedate=new Date(a[0],a[1],a[2]);
    // a=sessionStorage.contributionEndTime.split("-");
    // var contributionEndTimedate=new Date(a[0],a[1],a[2]);

    var data={

        'creatorID': 5000,
        'conferenceName':sessionStorage.conferenceName,
        'shortname':sessionStorage.shortname,
        'startTime':sessionStorage.startTime,
        'endTime':sessionStorage.endTime,
        'city':sessionStorage.city,
        'location':sessionStorage.location,
        'ownerOrganization':sessionStorage.ownerOrganization,
        'supporter':sessionStorage.supporter,
        'organizer':sessionStorage.organizer,
        'site':sessionStorage.site,
        'abstract':sessionStorage.xiangqing,

        'ownerPeopleName':sessionStorage.ownerPeopleName,
        'ownerPeopleTel':sessionStorage.ownerPeopleTel,
        'ownerPeopleEmail':sessionStorage.ownerPeopleEmail,

        //process2
        'contributionStartTime':sessionStorage.contributionStartTime,
        'contributionEndTime':sessionStorage.contributionEndTime,
        'contributionTheme':sessionStorage.contributionTheme,
        'contributionAbstract':sessionStorage.p2_xiangqing,

        //process3
        'authorName':sessionStorage.authorName,
        'authorPrice':Number(sessionStorage.authorPrice),
        'authorNumber':Number(sessionStorage.authorNumber),
        'authorAbstract':sessionStorage.p3_xiangqing1,


        'generalName':sessionStorage.generalName,
        'generalPrice':Number(sessionStorage.generalPrice),
        'generalNumber':Number(sessionStorage.generalNumber),
        'generalAbstract':sessionStorage.p3_xiangqing2,
    }
    if($("#checker").is(':checked'))
    {
        $.ajax({
            type: "POST",
            url: "/registConference",
            data: data,
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                // window.location.href="process1";
                console.log(123);
            }
        });
    }
    else
    {
        alert("请阅读网站的服务条款");
    }


}

function laststep(){

    window.location.href="process3";

}
