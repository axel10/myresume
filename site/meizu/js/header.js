$(function () {
    var rightBoxs = $('.right-box');
    var productBox = $('.product-box');
    var ul = $('.product-list-wrap ul');
    var listWrap = $('.product-list-wrap');
    var url;
    var that;
    var toggle = true;

    rightBoxs.on('mouseenter', function () {

        if (this == that) {
            return
        } else {

            var index = $(this).index();
            console.log(index);
            switch (index) {
                case 0:
                    return;
                case 3:
                    url = './product2.json';
                    listWrap.css('paddingLeft', '500px');
                    break;
                default:
                    url = './tsconfig.json';
            }

            that = this;

            productBox.stop(true, true).animate({height: 212}, 300, function () {
                toggle = false;
            });


            getData({ul: ul, url: url})
        }

    });
    productBox.on('mouseleave', function (event) {
        var y = event.clientY;
        if (y < 200) {
            return
        }
        productBox.stop(true, true).animate({height: 0}, 300, function () {
            ul.html('');
            that = null;
        });

    })
})


function getData(setting) {
    var check = $(setting.area);
    var ul = $(setting.ul);
    var url = setting.url;


    function ask() {
        ul.html('');
        ajax({
            url: url,
            success: function (res) {
                var data = JSON.parse(res);
                for (var i = 0, len = data.content.length; i < len; i++) {
//                    console.log(data.content[i].describe)
                    $('<li class="active" style="animation-delay: '+ (i*0.15) +'s;"><a href=""><img src="' + data.content[i].img + '" alt=""><p>' + data.content[i].describe + '</p></a></li>').appendTo(ul);
                }
                // 这里的错误属于误报
                // console.log('s')
            }
        })
    }

    ul.html('');
    ask();


}