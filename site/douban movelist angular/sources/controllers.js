angular.module('controllers', [])
    .controller('theatersController', ['$rootScope', '$scope', '$http', '$routeParams','$route', function ($rootScope, $scope, $http, $routeParams,$route) {
        $rootScope.index = 0;
        $rootScope.loaded = false;
        $rootScope.title = '正在热映';
        var category = $routeParams.category;
        var page = $routeParams.page;
        $rootScope.category = category;
        $rootScope.page = page;
        var start = (page -1) * 20;
        var q = $routeParams.q;
        $scope.q = q;

        $scope.jump = function () {
                console.log('jump');
                $route.updateParams({
                    category: category,
                    q: q,
                    page:page
                });


        }

        ajax({
            url: 'https://api.douban.com/v2/movie/'+category + '?start='+start +'&q=' + q,
            dataType:'jsonp',
            success:function (data) {

                $rootScope.loaded = true;
                $scope.total = data.total;
                $scope.subjects = data.subjects;
                var total = data.total;
                var count = data.count;
                var pages = Math.ceil(total / count);
                $scope.page = $routeParams.page;
                $scope.total = pages;
                $scope.pages = [];

                /*                for (var i = 0; i < pages; i++) {
                 $scope.pages.push(i + 1)
                 }*/

                if (pages > 100) {
                    $scope.total = 100;
                    pages = 100;
                } else {
                    $scope.total = pages;
                }

                if (pages > 7) {
                    if ($routeParams.page > 3) {
                        if ($routeParams.page >= pages - 3) {
                            for (var i = 6; i >= 0; i--) {
                                $scope.pages.push(pages - i);
                            }
                        } else {
                            for (var i = -3; i <= 3; i++) {
                                $scope.pages.push(parseInt($routeParams.page) + i);
                            }
                        }

                    } else {
                        for (var i = 0; i < 7; i++) {
                            $scope.pages.push(i + 1);
                        }
                    }
                } else {
                    for (var i = 0; i < pages; i++) {
                        $scope.pages.push(i + 1);
                    }
                }




                $rootScope.activepage = $routeParams.page;
                $scope.$apply();
            }
        })

    }])
    .controller('searchController',['$rootScope','$scope','$http','$routeParams','$route',function ($rootScope, $scope, $http, $routeParams,$route) {
        $scope.searchWord = '';
        $scope.search = function () {

            $route.updateParams({
                category: 'search',
                q: $scope.searchWord
            });
            // console.log($routeParams.q);
        }
    }]);
