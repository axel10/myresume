function carousel(imgboxs,ctrls,duration,bDuration,distance) {
    /*    var imgboxs = $('.big-wrap');
     var ctrls = $('.ctrl span');
     var  duration = 500;
     var bDuration = 300;*/

    var imgboxs = $(imgboxs);
    var ctrls = $(ctrls);
    var duration = duration || 500;
    var bDuration = bDuration || 300;
    var distance = distance || 5;

    var imgWidth = imgboxs.width();
    var num = 0;
    var x, checkMove;
    var down = false;
    var mx;
    var timer;

    var imgArr = ['http://i4.buimg.com/567571/e6f195d70c2e93a8.jpg','http://i2.muimg.com/567571/85ec3d5ff34c77e0.jpg','http://i4.buimg.com/567571/8c80f01bf0788297.jpg','http://i4.buimg.com/567571/5d5dc1f86c257268.jpg'];

    for (var i = 0, len = imgboxs.length; i < len; i++) {
        imgboxs.eq(i).css('backgroundImage', 'url("'+ imgArr[i] +'")')
    }

    function autoplay() {
        imgboxs.eq(num)
            .animate({
                left: -imgWidth
            }, duration);

        num++;


        if (num >= imgboxs.length) {
            num = 0;
        }

        ctrls.eq(num).addClass('active').siblings().removeClass('active');

        imgboxs.eq(num)
            .css({
                left: imgWidth,
                zIndex: 5
            })
            .animate({
                left: 0
            }, duration, function () {
                imgboxs.eq(num).siblings().css('zIndex', 3);

            })
    }

/*    function prevplay() {
        imgboxs.eq(num)
            .animate({
                left: imgWidth
            }, duration);
        num--;

        if (num < 0) {
            num = imgboxs.length - 1;
        }

        ctrls.eq(num).addClass('active').siblings().removeClass('active');

        imgboxs.eq(num)
            .css({
                left: -imgWidth,
                zIndex: 5
            })
            .animate({
                left: 0
            }, duration, function () {
                imgboxs.eq(num).siblings().css('zIndex', 3)
            })
    }*/


    $('#btn').on('click', function () {
        prevplay()
    });

    $('#btn2').on('click',function () {
        autoplay()
    })

     timer = setInterval(function () {
        autoplay();
     },3500);

    // 检查左移右移
    /*    function check(event) {
     checkMove = event.pageX;
     }*/

    imgboxs.bind('mousedown', function (event) {
        x = event.pageX;

        down = true;
    });
    imgboxs.bind('mousemove', function (event) {

        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()

        if (down) {
            mx = event.pageX - x;

            // console.log(mx,checkMove - x);


            imgboxs.eq(num - 1).css({left: -imgWidth + mx, zIndex: 5})

            if (num == imgboxs.length - 1) {

                imgboxs.eq(0).css({left: imgWidth + mx, zIndex: 5})

            } else {
                imgboxs.eq(num + 1).css({left: imgWidth + mx, zIndex: 5})
            }


            imgboxs.eq(num).css({left: mx})


        }
    });
    imgboxs.bind('mouseup', function () {
        down = false;
        if(mx == 0){
            return
        }
        if (Math.abs(mx) > (imgWidth / distance) && mx < 0) {
            imgboxs.eq(num).animate({left: -imgWidth}, duration);
            num++;
            if (num >= imgboxs.length) {
                num = 0;
            }
            imgboxs.eq(num).animate({left: 0}, duration);
        }

        if (Math.abs(mx) > (imgWidth / distance) && mx > 0) {
            imgboxs.eq(num).animate({left: imgWidth}, duration);
            num--;
            if (num < 0) {
                num = imgboxs.length - 1;
            }
            imgboxs.eq(num).animate({left: 0}, duration);
        }

        if (Math.abs(mx) <= (imgWidth / distance)) {

            imgboxs.eq(num).stop().animate({left: 0},bDuration);

            if (mx < 0) {
                if (num < imgboxs.length - 1) {
                    imgboxs.eq(num + 1).stop().animate({left: imgWidth},bDuration)
                } else {
                    imgboxs.eq(0).stop().animate({left: imgWidth},bDuration)
                }
            }

            if (mx > 0) {
                imgboxs.eq(num - 1).stop().animate({left: -imgWidth},bDuration)
            }

        }

        mx = 0;

        ctrls.eq(num).addClass('active').siblings().removeClass('active');

    });


    ctrls.on('click', function () {

        var index = $(this).index();
        if (index > num) {
            imgboxs.eq(index).siblings().css({zIndex: 3});
            imgboxs.eq(num).css({zIndex: 5}).animate({left: -imgWidth}, duration);
            imgboxs.eq(index).css({left: imgWidth, zIndex: 5}).animate({left: 0}, duration);

            num = index;

        }
        if (index < num) {
            imgboxs.eq(index).siblings().css({zIndex: 3});
            imgboxs.eq(num).css({zIndex: 5}).animate({left: imgWidth}, duration);
            imgboxs.eq(index).css({left: -imgWidth, zIndex: 5}).animate({left: 0}, duration);

            num = index;
        }
        ctrls.eq(num).addClass('active').siblings().removeClass('active');
        clearInterval(timer)
        timer = setInterval(function () {
            autoplay();
        },3500);
    })

}

