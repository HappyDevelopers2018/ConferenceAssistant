

function onload(){
    var thisURL = document.URL;
    var getval =thisURL.split('?')[1];
	var id= getval.split("=")[1];
    //var id=25;
    $.ajax({
        type:"GET",
        url:"/returnConference/"+id,
        dataType:"json",
        success:function(data){
            //论文摘要生成
    // var data={"id": 23, "creatorID": 1, "conferenceName": "1", "shortname": "1", "startTime": "-1", "endTime": "-1", "location": "1", "ownerOrganization": "ownerOrganization", "supporter": "supporter", "organizer": "1", "site": "1", "abstract": "1", "ownerPeopleName": "ownerPeopleName", "ownerPeopleTel": "ownerPeopleTel", "ownerPeopleEmail": "ownerPeopleEmail", "contributionStartTime": "1", "contributionEndTime": "1-1-1", "contributionTheme": "-1", "contributionAbstract": "1", "authorName": "1", "authorPrice": "1", "authorNumber": 1, "authorAbstract": 1, "generalName": "1", "generalPrice": "1", "generalNumber": 1, "generalAbstract": 1}
            var a=data.abstract;
            var b=$(a);
            b.appendTo("#dynamicText");

            $("#contributiondate").html("<p>初稿截稿日期："+data[0].contributionEndTime+"</p>");   //初稿截稿日期：2018-06-29
            $("#contributionAbstract").html("<p>"+data[0].contributionAbstract+"</p>");      //征稿简介 听众免费
            $("#ownerName").html(data[0].ownerPeopleName);   ///钟金成
            $("#ownerEmail").html(data[0].ownerPeopleEmail);   // connorzhong@qq.com
            $("#ownerTEL").html(data[0].ownerPeopleTel);   // 18508126686
            $("#ownerOrganization").html(data[0].ownerOrganization);   //北航软件学院
            $("#supporter").html(data[0].supporter);   //快乐开发项目组


            console.log(data[0])



       },
       error: function(data){
            alert("error");
       }
   })
}


function getUserIdByCookie() {
    var cookies=document.cookie.split(";");
    var l=cookies.length;
    for(var i=0;i<l;i++)
    {
        if($.trim(cookies[i].split("=")[0])=="id")
        {
            id=cookies[i].split("=")[1];
            break;
        }
    }
    return id;
}

function submitFavorite(){
	let usrid=getUserIdByCookie();
	let thisURL = document.URL;
    let getval =thisURL.split('?')[1];
    let confid= getval.split("=")[1];
	console.log('usrid = '+usrid+' confid = '+confid);

	$.ajax({
		type: "get",
      	url:"/addCollection/"+usrid+"/"+confid,
		dataType: "json",
      contentType: 'application/json; charset=UTF-8',
      success: function(data){
			console.log("success!")
      		console.log(data)
       }
    });	




}

