/*home scroll*/
new IScroll(".home");

var Data = null,
    arr = ['yunqian', 'yunzhong', 'chanqian', 'chanhou','chengzhang','fangzhi'];
function bindEvent(){
    /*get data*/
    $.ajax({
        url:"data/data.json",
        dataType:"json",
        type:"get",
        success:function(data){
            Data = data;
        }
    })

    /*footer navigation*/
    $(".container").on("touchend",'a',function(e){
        e.preventDefault();
        var that = $(this).attr("href"),
            id = $(this).attr("id");
        $(that).css({
            "transition":"all .5s",
            "transform":"translate3d(0,0,0)"
        }).siblings().css({
            "transform":"translate3d(100%,0,0)"
        })
        if (e.target.parentNode.nodeName==="NAV"||e.target.parentNode.parentNode.nodeName==="NAV"){
            var index = $(this).index();
            $("mark").animate({
                left:index*25+"%"
            })
        }
        into($(this));

        /*是否进入列表页*/
        if (that==="#list"){
            getId(id);
        }
    })
}
bindEvent();

/*get id*/
function getId(id) {
    if ($.inArray(id,arr)>-1){
        getLoad(id);
    }
}
function getLoad(id) {
    var category = Data[id]['fenlei'],
        str = '';
    $.each(category, function (ind,val) {
        str+="<a href=''><img src='img/tu/"+ val.img +"' alt=''><p>"+ val.title +"</p></a>"
    })
    $('#listIscroll').html(str);
    new IScroll(".list");
}

/*into categorises*/
function into(that){
    var href = that.attr("href");
    var title = that.attr("title");
    if (href==="#list"){
        $("#back").show().attr("href","#home");
        $('.header-main').html(title);
    }else if (href==="#home"){
        $("#back").hide();
        $('.header-main').html("Supernova");
    }
}

