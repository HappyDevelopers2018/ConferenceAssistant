function onload(){
	var id=1;
	$.ajax({
		type:"GET",
		url:"/returnUser/"+id,
		success:function(data){
			$("#name").html(data.name);
			$("#organization").html(data.organization);
		}
	})
}