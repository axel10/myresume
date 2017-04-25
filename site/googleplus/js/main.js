// 点击更多发生位移
$(function () {
    var more = $('.click-more');
    var column = $('.column');
    var rightMain = $('#main');
    var wrap = $('.right-main .wrap');
    var route = $('#route');
    var box;
    var scrollY;
    // var pointX;
    var animated;

    more.on('click', function (event) {
        scrollY = $(window).scrollTop();
        // console.log(scrollY);
        if (!animated) {

            box = $(this).parents('.box');
            // var boxWidth = box.width() / 2
            /*            y = box.get(0).offsetTop;
             x = box.get(0).offsetLeft;*/
            rightMain.animate({opacity: 0, top: 100}, function () {
                rightMain.css({display: 'none'});
                route.css({display: 'block'});
                // pointX = (route.width() / 2) - boxWidth;
                // console.log((box));
                // console.log(pointX);
                route.css({marginTop: 200, opacity: 0}).animate({
                    marginTop: 0,
                    opacity: 1
                }).find('.wrap').css({margin: '0 auto', float: 'none'}).append(box.clone().css({
                    top: 20,
                    left: -40,
                    right: 0
                }));
                // box.css({marginTop:200,opacity:0}).animate({marginTop:0,opacity:1});
                route.find('.text-more').css({display: 'none'});
                route.find('.box').children('p').css({maxHeight: 'none'});
                $('body').scrollTop(0);
            });


            animated = true;
            event.stopPropagation();
        }
    });
    route.on('click', function (event) {
        if (animated) {
            var target = $(event.target);
            if (target.parents('.box').length == 0 && !target.hasClass('box')) {
                // console.log(1);
                route.animate({marginTop: 200, opacity: 0}, function () {
                    route.css({display: 'none'});
                    route.find('.wrap').html('');
                    rightMain.css({display: 'block'}).animate({opacity: 1, top: 0});
                    $(window).scrollTop(scrollY);
                });

                // console.log(scrollY)
                animated = false;
                event.stopPropagation();
            }

        }
    })


});

// 点击文本省略号展示更多
$(function () {
    var textMore = $('.text-more');
    var boxs = textMore.parents('.box');
    var p = boxs.children('p');

    for (var i = 0, len = p.length; i < len; i++) {
        var thatP = $(p[i]);
        if (thatP.height() < 180) {

            thatP.find('img').css({display: 'none'})
        }
    }

    textMore.on('click', function (event) {
        // console.log($(this).parent('p'));
        $(this).parent('p').css({maxHeight: 'none'});
        $(this).css({display: 'none'});
        event.stopPropagation();
    })
});

// 点击修改弹出修改层
$(function () {
    var darkLayout = $('.dark-layout');
    var editBtn = $('.edit');
    var edit = $('.alert');

    editBtn.on('click', function () {
        darkLayout.css({display: 'block'}).animate({opacity: 1});
        edit.animate({top: 0})
    })

    darkLayout.on('click', function (event) {
        // console.log(event.target);
        if ($(event.target).parents('.dark-layout').length == 0 || $(event.target).html() == '取消') {
            darkLayout.animate({opacity: 0}, function () {
                darkLayout.css({display: 'none'})
            });
            edit.animate({top: '100%'})
        }
    })
});


// 点击按钮进行左菜单移动
$(function () {
    var rightMain = $('.right-main');
    var collapse = $('.collapse');
    var leftList = $('.left-list');
    collapse.on('click', function () {

        var windowWidth = $(window).width();
        var mainWidth = rightMain.width();

        // console.log((windowWidth / 2) - (mainWidth / 2));

        var right = (windowWidth / 2) - (mainWidth / 2);

        console.log(leftList.css('left'));
        if (leftList.css('left') == '0px') {
            leftList.animate({left: -230});
            rightMain.animate({right: right}, function () {

            })
        } else {
            if ($(window).width() < 830) {
                leftList.animate({left: 0});
                rightMain.animate({right: 0})
            } else {
                leftList.animate({left: 0});
                rightMain.animate({right: 0}, function () {
                    rightMain.css({right: ''});
                    leftList.css({left: ''})
                })
            }
        }
    });
    $(window).on('resize', function () {
        setTimeout(function () {
            // console.log($(window).width());
            if ($(window).width() > 830) {
                rightMain.css({right: ''});
                leftList.css({left: ''})
            }
        }, 20)
    })
});
