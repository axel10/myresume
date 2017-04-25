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
        })
        .otherwise({
            redirectTo: '/today'
        })
}]);

douban.run(['$rootScope', function ($rootScope) {
    // $rootScope.loaded = false;
    // $rootScope.demo = '123123123123123';





}])