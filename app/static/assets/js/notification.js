function load_notification()
{
    var id =getUserIdByCookie();
    if (id != 0) 
    {
    
        $.ajax({
            type:"GET",
            url:"/countMessage/"+id,
            dataType:"json",
            success:function(data){
                if (data[0].count ==  0)
                    $("#return-top").css("display","None")
                
            }
        }
        );
    }
    else 
    {
        $("#return-top").css("display","None")
    }
}