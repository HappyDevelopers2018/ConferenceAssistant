function getPaperByUrl() {
	    var thisURL = document.URL;
        var getval =thisURL.split('?')[2];
	    var paperId= getval.split("=")[1];
	    if(paperId.paperId[length-1]=='#')
        {
            paperId = paperId.substring(0, paperId.length - 1);
        }
	    return paperId;
    }
function toValid() {
        //paperId=getPaperByUrl();
        //console.log(paperId);
        paperId=document.getElementById('paperID').value;;
        console.log(paperId);
        var name=document.getElementById('newnameA').value;
        var uid = getUserIdByCookie()
        var confId= getConfIdByUrl();
        console.log(paperId);
        $.ajax({
            type:"get",
            url:"/getPaperInfoById/"+paperId,
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                if(data[0].authorList.indexOf(name)==-1){
                    alert('该作者不是本论文的作者，请重新输入');
                    return false;
                }else{
                    var form_data = new FormData($('#formA')[0]);
    		        $.ajax({
				    url: "/registerConference/"+uid+"/"+confId,
        		    type: 'POST',
        		    data: form_data,
        		    contentType: false,
        		    processData: false,
        		    success: function(data){
            				console.log(data);
                            if(data.result==1){
                                alert('注册成功');
                                window.location.reload();
                            }
                            else{
                                alert('您已注册该会议');
                                window.location.reload();

                            }
        			    },
				    });
                }
            },
            error:function () {
                console.log('Error');
                return false;
            }
        })
    }
/*
function add() {
        var confID = getConfIdByUrl();
        var userID = getUserIdByCookie();
        var urlstr = '/registerNonConference/'+userID+'/'+confID;
        var attendiv="<form method=\"post\" enctype='multipart/form-data' action="+urlstr+" onsubmit=\"return toValid()\">\n" +
            "                            <div class=\"special\">\n" +
            "\n" +
            "                            <div class=\"row\">\n" +
            "                                <div class=\"col-6\">\n" +
            "                                   <span>*姓名 </span>\n" +
            "                                    <input type=\"text\" id=\"newname\" name=\"name\">\n" +
            "                                </div>\n" +
            "                                <div class=\"col-6\">\n" +
            "                                    <span>*电话 </span><input type=\"text\" id=\"tel\" name=\"tel\" >\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                            <div class=\"row\">\n" +
            "                                <div class=\"col-6\">\n" +
            "                                    <span>*性别 </span>\n" +
            "                                    <span><input type=\"radio\" id=\"fradio\" value=\"f\" name='gender' style=\"display: inline\" checked=\"checked\"><label>女</label>\n" +
            "                                    <input type=\"radio\" id=\"mradiio\" value=\"m\" name='gender' style=\"display: inline\"><label>男</label></span>\n" +
            "                                </div>\n" +
            "                                <div class=\"col-6\">\n" +
            "                                    <span>*是否住宿 </span>\n" +
            "                                    <span><input type=\"radio\" id=\"yesradio\" name=\"accommodation\" value=\"是\" style=\"display: inline\" checked=\"checked\"><label>是</label>\n" +
            "                                    <input type=\"radio\" id=\"noradiio\" name=\"accommodation\" value=\"否\" style=\"display: inline\"><label>否</label></span>\n" +
            "                                </div>\n" +
            "                                </div>\n" +
            "                            <div class=\"row\">\n" +
            "                                <div class=\"col-12\" >\n" +
            "                                    <span> 说明 </span><input type=\"text\" id=\"sm\" placeholder=\"说明\" style=\"width: 80%\" name=\"remarks\">\n" +
            "                                </div>\n" +
            "\n" +
            "                            </div>\n" +
            "                                <div class=\"row\" style=\"display: table\">\n" +
            "                                    <div class=\"col-6\">\n" +
            "                                        <span style=\"color: #f96332\">上传缴费凭证</span>\n" +
            "                                        <input  type=\"file\" name=\"file\" required>\n" +
            "                                    </div>\n" +
            "                                    <!--<div class=\"col-3\"></div>-->\n" +
            "                                    <div class=\"col-6 \" style=\"display: table-cell;vertical-align: middle\" >\n" +
            "                                        <button class=\"btn btn-new ml-5\" type=\"submit\" style=\"border-radius: 0.8rem\">申请注册</button>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                            </form>"
        $("#attendenceid").append(attendiv);
    }

function onReady() {
        onload();
        userId=getUserIdByCookie();
        confId=getConfIdByUrl();
        $.ajax({
            type: "get",
            url: "/getPapers/"+userId+"/"+confId,
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                console.log(data);
            },
            error:function () {
                console.log('Error');
            }
        });
    }
*/
function getPaperInfo() {
        var id = getUserIdByCookie()
        var confId= getConfIdByUrl();
        $.ajax({
		type:"GET",
		url:"getPaperInfo/"+id+"/"+confId,
		dataType:"json",
		success:function(data){
			console.log(data.length);
			console.log(data);
			console.log(data[0]);
			if(typeof(data)=="undefined")
				var l=0;
			else
				var l=data.length;
			for(var i=0;i<l;i++)
				{

					var a = $("<tr><td>"+data[i].id+"</td><td>"+data[i].title+"</td><td>"+data[i].authorList+"</td></tr>");
					a.appendTo("#paperlist");
				}
		},
		error:function(){
		    console.log("error");
		}
	})
    }

function begin1(){
        onload();
        getPaperInfo();
    }
