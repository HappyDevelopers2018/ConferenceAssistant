function onload1(){
    var id = getUserIdByCookie()
	$.ajax({
		type:"GET",
		url:"/getSonsId/"+id,
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
                    console.log(l);
					var a = $("<tr><td class=\"col-md-3\">"+data[i].name+"</td><td class=\"col-md-2\">"+data[i].email+"</td>  <td class=\"col-md-2\">"+data[i].organization+"</td><td class=\"col-md-2\"></td><td class=\"col-md-2\"></td></tr>")
					a.appendTo("#user");
				}
		},
		error:function(){
		    console.log("error");
		}
	})
}
