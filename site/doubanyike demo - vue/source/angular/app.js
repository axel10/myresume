var douban = angular.module('douban', ['ngRoute', 'controllers']);

douban.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/today', {
            templateUrl: 'views/today.html',
            controller: 'todayController'
        })
        .when('/author', {
            templateUrl: 'views/author.html',
            controller: 'authorController'
        })
        .when('/module', {
            templateUrl: 'views/module.html',
            // controller:'moduleController'
        })
        .when('/setting', {
            templateUrl: 'views/setting.html',
            // controller: 'settingController'
        })xx
        .otherwise({
            redirectTo: '/today'
        })
}]);

douban.run(['$rootScope', function ($rootScope) {
    // $rootScope.loaded = false;
    // $rootScope.demo = '123123123123123';


    var toggleButton = document.querySelector('.navbar-toggle');
    var leftBox = $('.leftBox');
    var leftBoxNative = leftBox.get(0);
    var mainBox = $('.mainBox');
    var mainBoxNative = document.querySelector('.mainBox');
    var touchArea = $('.touchArea');
    var tocuhAreaNative = touchArea.get(0);
    var lis = $('.leftBox .containe ul li');
    var isToggle = false;


    function moveRight() {

        if (!isToggle) {

            animate({
                el: leftBoxNative,
                translateX: '0rem',
                duration: '.3s'
            });

            animate({
                el: mainBoxNative,
                translateX: '12.25rem',
                duration: '.3s'
            });

            animate({
                el: tocuhAreaNative,
                translateX: '12.25rem',
                duration: '.3s'
            });

            touchArea.css('display', 'block');

        }

        document.documentElement.style.overflow = "hidden";
        isToggle = true;
    }

    function moveLeft() {

        animate({
            el: leftBoxNative,
            translateX: '-12.25rem',
            duration: '.3s'
        });

        animate({
            el: mainBoxNative,
            translateX: '0rem',
            duration: '.3s'
        });

        animate({
            el: tocuhAreaNative,
            translateX: '0rem',
            duration: '.3s'
        });

        touchArea.css('display', 'none');

        document.documentElement.style.overflow = "scroll";
        isToggle = false;
    }

    ontap(toggleButton, moveRight);

    ontap(tocuhAreaNative, moveLeft)

    $('.leftBox a').each(function () {
        ontap(this, moveLeft)
    })

    lis.each(function () {
        ontap(this, function () {
            lis.removeClass('active');
            $(this).addClass('active');
        })
    })


}])