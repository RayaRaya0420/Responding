/*home scroll*/
new IScroll(".home");

var Data = null,
    arr = ['yunqian', 'yunzhong', 'chanqian', 'chanhou','chengzhang','fangzhi'],
    brr = ['孕前准备','孕中知识','产前知识','分娩产后','幼儿成长指标','幼儿常见病防止'];
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

        if (that==="#list"){
            /*进入列表页*/
            getId(id);
        }else if (that==="#article"){
            /*进入文章页面*/
            getRender($(this));
        }
    })
}
bindEvent();

/*详情页*/
function getRender(el) {
    var crr = el.attr("data-content").split("_");
    var str="";
    str = Data[crr[0]]["fenlei"][crr[1]];
    $(".article-content").html(str.content);
    $(".header-main").html(str.title);
    new IScroll("#article");
}

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
        str+="<a href='#article' data-content='"+id+"_"+ind+"'><img src='img/tu/"+ val.img +"' alt=''><p>"+ val.title +"</p></a>"
    })
    $('#listIscroll').html(str);
    new IScroll(".list");
}

/*into categorises*/
function into(that){
    var href = that.attr("href");
    var title = that.attr("title");
    var fav = $(".header-right");
    var back = $("#back");
    if (href==="#list"){
        back.show().attr("href","#home");
        $('.header-main').html(title);
        fav.hide();
    }else if (href==="#home"){
        back.hide();
        $('.header-main').html("孕育宝典");
    }else if (href==="#article"){
        fav.show();
        back.attr("href","#list");
        var splits = that.attr("data-content").split("_")[0];
        var index = $.inArray(splits,arr);
        back.attr("title",brr[index]);
    }
}

