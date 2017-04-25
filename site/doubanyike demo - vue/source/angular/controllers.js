angular.module('controllers', [])
    .controller('todayController', ['$scope', '$rootScope', '$routeParams', '$http', function ($scope, $rootScope,$routeParams, $http) {
        $rootScope.loaded = false;
        $rootScope.title = "今日一刻";
        $http({
            method: 'get',
            url: './api/stream.php'
        })
            .success(function (data) {
                $scope.data = data.result;

                $rootScope.loaded = true;
                console.log($rootScope)
            })
            .error(function (error) {
                // console.log('eeeeeeeeeeeeeeeeeeeeerrorrrrrrrrrrrrr' + error)
            })
    }])
    .controller('authorController', ['$scope', '$rootScope', '$routeParams', '$http', function ( $scope,$rootScope, $routeParams, $http) {
        $rootScope.loaded = false;
        $rootScope.title = '热门作者';
        $http({
            method: 'get',
            url: './api/author.php',
            params: {}
        })
            .success(function (data) {
                $scope.alls = data.all.authors;
                $scope.recs = data.rec.authors;

                $rootScope.loaded = true;
                console.log($rootScope)
            })
            .error(function (error) {
                // console.log('eeeeeeeeeeeeeeeeeeeeerrorrrrrrrrrrrrr' + error)
            })
    }]);




    /*.controller('NavController',['$scope', '$rootScope', '$routeParams', '$http', function ($rootScope, $scope, $routeParams, $http){

    }])*/

