var Douban = angular.module('Douban',['ngRoute','controllers']);

Douban.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/:category/:page',{
        templateUrl:'views/in_theaters.html',
        controller:'theatersController'
    })
        .otherwise({
            redirectTo:'/in_theaters/1'
        })
}]);
console.log(2);


/*
Douban.controller('searchController',['$scope','$',function ($scope) {

}])*/
