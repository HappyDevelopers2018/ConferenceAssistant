var id=getUserIdByCookie();
function GetChinese(strValue) {  
    if(strValue!= null && strValue!= ""){  
        var reg = /[\u4e00-\u9fa5]/g;   
        return strValue.match(reg).join("");  
    }  
    else  
        return "";  
}  
function changecolor(){
	$("div.mouseovera").mouseover(function(){
    	$(this).find("div:first-child").css("background-color","#2b579a");
		$(this).css("background-color","#e8f1ff");
  		});
	$("div.mouseovera").mouseout(function(){
		$(this).find("div:first-child").css("background-color","white");
	  	$(this).css("background-color","white");
  		});
}
function toxiangqing(e)
{
	window.location.href="/ConferenceIndex?id="+e;
}
function primary_info(){
	window.location.href="/primary_info_user"
}
function conference_manage(){
	window.location.href="/myJoinedConference"
}
function tougao_manage(){
	
}