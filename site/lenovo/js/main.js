$(function () {        //头部导航栏
    var rightBoxs = $('.header-bottom .content ul li');
    var ul = $('.list .content ul');
    var list = $('.list');
    var rightUl = $('.header-bottom .content ul');
    var that;
    var isFirst = true;

    rightBoxs.on('mouseover', function () {
        var index = $(this).index();
        if (this == that && index) {
            return
        } else {

            // console.log(index);
            if (index > 3) {
                list.stop(true, true).animate({height: 0}, 300, function () {
                    that = null;
                });
                return
            }
            if (isFirst) {
                list.eq(index).animate({height: 200});

            } else {
                list.css({height: 0})
                list.eq(index).css({height: 200});

            }

            isFirst = false;
            that = this;

        }

    });
    list.on('mouseleave', function (event) {

        list.stop(true, true).animate({height: 0}, 300, function () {
            that = null;
        });
        isFirst = true;
    })

    rightUl.on('mouseleave', function (event) {

        if (event.pageY > 120) {
            return
        }
        list.stop(true, true).animate({height: 0}, 300, function () {
            that = null;
        });
        isFirst = true;
    })
});


function getData(setting) {
    var ul = $(setting.ul);
    var url = setting.url;


    function ask() {
        ul.html('');
        ajax({
            url: url,
            success: function (res) {
                var data = JSON.parse(res).result;
                for (var i = 0, len = data.length; i < len; i++) {
//                    console.log(data.content[i].describe)
                    $('<li><a href=""><img src="' + data[i].img + '" alt=""><p>' + data[i].describe + '</p><p>' + data[i].price + '</p></a></li>').appendTo(ul);
                }
                // 这里的错误属于误报
                // console.log('s')
            }
        })
    }

    ul.html('');
    ask();
    console.log('commit')
}

$(function () {            //大轮播图
    var lis = $('.carousel-opacity .content .left-list ul li');
    var categorys = $('.carousel-opacity .content .left-list .category');
    var categoryLeft = categorys.find('.left');
    var categoryRight = categorys.find('.right');
    var imgboxs = $('.carousel-opacity .box');
    var leftCtrl = $('.left-ctrl');
    var rightCtrl = $('.right-ctrl');
    var olLis = $('.carousel-opacity .content ol li');
    var num = 0; //驱动
    var timer;

    lis.on('mouseover', function () {
        var index = $(this).index();
        categorys.css({visibility: 'visible', display: 'block'});
        // console.log(categoryLeft);

        ajax({
            url: "./leftlist.json?index=" + index,
            success: function (res) {
                var data = JSON.parse(res).result;
                categoryLeft.html('');
                categoryRight.html('');

                if(data.length > 6){

                    for (var i = 0, len = 6; i < len; i++) {
                        $('<li><a href=""><img src="'+ data[i].img +'" alt="">123123123</a></li>').appendTo(categoryLeft);
                    }

                    for (var i = 6, len = data.length; i < len; i++) {
                        $('<li><a href=""><img src="'+ data[i].img +'" alt="">123123123</a></li>').appendTo(categoryRight);
                    }

                }else{
                    for (var i = 0, len = data.length; i < len; i++) {
                        $('<li><a href=""><img src="'+ data[i].img +'" alt="">123123123</a></li>').appendTo(categoryLeft);
                    }
                }

            }
        })

    });

    lis.on('mouseleave', function (event) {

        if((event.clientX + lis.width())>510){
            return
        }
        categorys.css({visibility: 'hidden', display: 'none'});

    });

    categorys.on('mouseleave', function () {

        categorys.css({visibility: 'hidden', display: 'none'});

    });

    //轮播图开始/////////////////////////////////

    for (var i = 0, len = imgboxs.length; i < len; i++) {
        imgboxs.eq(i).css({background: 'url("img/carousel' + (i + 1) + '.jpg?num=123213123213123") center'});
    }

    timer = setInterval(function () {
        autoplay()
    },3500);

    // background: url("../img/carousel1.jpg") center;
    function autoplay() {
        clearInterval(timer);
        timer = setInterval(function () {
            autoplay()
        },3500);

        imgboxs.eq(num).css({zIndex: 3}).animate({opacity: 0});
        num++;

        if (num > imgboxs.length - 1) {
            num = 0;
        }

        olLis.eq(num).addClass('active').siblings().removeClass('active');

        imgboxs.eq(num).css({zIndex: 5, opacity: 0}).animate({opacity: 1})
    }

    function prevplay() {
        imgboxs.eq(num).css({zIndex: 3}).animate({opacity: 0});
        num--;

        if (num < 0) {
            num = imgboxs.length - 1;
        }

        olLis.eq(num).addClass('active').siblings().removeClass('active');

        imgboxs.eq(num).css({zIndex: 5, opacity: 0}).animate({opacity: 1})
    }

    rightCtrl.on('click', function () {
        autoplay();
    });

    leftCtrl.on('click', function () {
        prevplay();
    });


/*    var lis = $('.carousel-opacity .content .left-list ul li');
    var categorys = $('.carousel-opacity .content .left-list .category');
    var categoryLeft = categorys.find('.left');
    var categoryRight = categorys.find('.right');
    var imgboxs = $('.carousel-opacity .box');
    var leftCtrl = $('.left-ctrl');
    var rightCtrl = $('.right-ctrl');
    var olLis = $('.carousel-opacity .content ol li');
    var num = 0; //驱动*/

    olLis.on('click',function () {
        imgboxs.eq(num).css({zIndex: 3}).animate({opacity: 0});

        var index = $(this).index();

        num = index;

        olLis.eq(num).addClass('active').siblings().removeClass('active');

        imgboxs.eq(num).css({zIndex: 5, opacity: 0}).animate({opacity: 1});

        clearInterval(timer);
        timer = setInterval(function () {
            autoplay()
        },3500);
    })

});