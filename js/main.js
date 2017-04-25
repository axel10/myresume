//    滚动效果
$(function () {
    $('#dowebok').fullpage({
        afterLoad: function (anchor, index) {
            $('.section').removeClass('current');
            setTimeout(function () {
                $('.section').eq(index - 1).addClass('current')
            }, 100)
        },
        scrollingSpeed: 400
//            navigation: true,
//            navigationPosition:'right'

    });
});

//    第四屏
$(function () {
    var box = $('.section .wrap .box');
    var more = box.find('.more');
    var textBox = box.find('.text');
    // console.log(more);

    more.on('click',function (event) {


        textBox.css({visibility:'hidden',opacity:0});
        var index = $(this).parent('.box').css({zIndex:5}).index();
        textBox.eq(index - 1).css({visibility:'visible',opacity:1});
        event.stopPropagation();
    });

    $('body').on('click',function () {

        textBox.css({visibility:'hidden',opacity:0});
        box.css({zIndex:3})
    });

    box.on('mouseleave',function () {
        textBox.css({visibility:'hidden',opacity:0});
        box.css({zIndex:3})
    })
});

//第六屏 点击显示图片

$(function () {
    var imgLayer = $('.imgLayer');
    var cancel = $('.cancel');
    var imgs = $('.img');
    var clicks = $('.click');
    var imgContrainer = $('.img-container');

    clicks.on('click',function (event) {
        var index = $(this).index();
        $('.scroll').css({height:imgs.height()});
        imgLayer.css({display:'block'});
        imgContrainer.css({display:'block'});
        imgs.eq(index - 1).css({display:'block'});
        cancel.css({display:'block'});
        $.fn.fullpage.setAllowScrolling(false);
        event.stopPropagation();

    });
    $('body').on('click',function () {
        imgLayer.css({display:'none'});
        imgs.css({display:'none'});
        cancel.css({display:'none'});
        imgContrainer.css({display:'none'});
        $.fn.fullpage.setAllowScrolling(true);
    });

    $('#dowebok').on('scroll',function () {
        console.log('scroll');
    })

})