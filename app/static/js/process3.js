$(document).ready(function() {
    $('#summernote').summernote({
        lang: 'zh-CN',
        height:180,
        toolbar:[
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['table','hr','picture','link']]
        ]
    });
    $('#summernote2').summernote({
        lang: 'zh-CN',
        height:180,
        toolbar:[
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['table','hr','picture','link']]
        ]
    });

    if(typeof(sessionStorage.p3_xiangqing1)!="undefined")
    {
        $("#summernote").summernote('code',sessionStorage.p3_xiangqing1);
    }
    if(typeof(sessionStorage.authorName)!="undefined")
    {
        $("#authorName").val(sessionStorage.authorName);
    }
    if(typeof(sessionStorage.authorPrice)!="undefined")
    {
        $("#authorPrice").val(sessionStorage.authorPrice);
    }
    if(typeof(sessionStorage.authorNumber)!="undefined")
    {
        $("#authorNumber").val(sessionStorage.authorNumber);
    }

    if(typeof(sessionStorage.p3_xiangqing2)!="undefined")
    {
        $("#summernote2").summernote('code',sessionStorage.p3_xiangqing2);
    }
    if(typeof(sessionStorage.generalName)!="undefined")
    {
        $("#generalName").val(sessionStorage.generalName);
    }
    if(typeof(sessionStorage.generalPrice)!="undefined")
    {
        $("#generalPrice").val(sessionStorage.generalPrice);
    }
    if(typeof(sessionStorage.generalNumber)!="undefined")
    {
        $("#generalNumber").val(sessionStorage.generalNumber);
    }

});
function nextstep(){

    sessionStorage.authorName=$("#authorName").val();
    sessionStorage.authorPrice=$("#authorPrice").val();
    sessionStorage.authorNumber=$("#authorNumber").val();
    sessionStorage.p3_xiangqing1=$("#summernote").summernote('code').toString();

    sessionStorage.generalName=$("#generalName").val();
    sessionStorage.generalPrice=$("#generalPrice").val();
    sessionStorage.generalNumber=$("#generalNumber").val();
    sessionStorage.p3_xiangqing2=$("#summernote2").summernote('code').toString();

    window.location.href="process4";
}

function laststep(){

    window.location.href="process2";
}
