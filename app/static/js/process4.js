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
   var name=getUserIdByCookie();

    var data={

        'creatorID': name,
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
        'abstract':escape(sessionStorage.xiangqing),

        'ownerPeopleName':sessionStorage.ownerPeopleName,
        'ownerPeopleTel':sessionStorage.ownerPeopleTel,
        'ownerPeopleEmail':sessionStorage.ownerPeopleEmail,

        //process2
        'contributionStartTime':sessionStorage.contributionStartTime,
        'contributionEndTime':sessionStorage.contributionEndTime,
        'contributionTheme':sessionStorage.contributionTheme,
        'contributionAbstract':escape(sessionStorage.p2_xiangqing),

        //process3
        'authorPrice':Number(sessionStorage.authorPrice),
        'registerStartTime':sessionStorage.registerStartTime,
        'registerEndTime':sessionStorage.registerEndTime,
        'schedule':escape(sessionStorage.p3_xiangqing1),
        'hotelAndTraffic':escape(sessionStorage.p3_xiangqing2),
    }
    // console.log("my data:");
    // console.log(data);
    if($("#checker").is(':checked'))
    {
        $.ajax({
            type: "POST",
            url: "/registConference",
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
    else
    {
        alert("请阅读网站的服务条款");
    }
}

function laststep(){

    window.location.href="process3";

}
