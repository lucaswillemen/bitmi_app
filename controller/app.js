if (window.mobile) {
    window.api = "https://bitmi.com.br/app/api/"
}else{
    window.api = "api/"
}
window.version = 0.1
var app = angular.module('App', ['ui.router', 'ngStorage']);

//App principal
app.controller('Main', function($scope, $rootScope, $state, $localStorage, $http, $sce) {
  
    setTimeout(function() {
        $(".loading").fadeOut()
    }, 1000);


	$rootScope.logout = function(){
		localStorage.clear()
        setTimeout(function() {
            location.href = "#!login"
        }, 100);
	}


    $rootScope.cotar = function(){
        $.get("https://blockchain.info/pt/ticker?cors=true")
        .done(function(res) {
            console.log(res.BRL)
            $scope.cota = res
            $scope.$apply()
        })
    }
    $scope.cotar()
    setInterval(function() {$scope.cotar()}, 10000)


    $rootScope.load_user = function() {
    $http.get(window.api + "home/")
        .then(function(res) {
            $localStorage.auth = res.data
            $rootScope.user_data = $localStorage.auth
        })
    };

    
    if (!$localStorage.auth) {
        $rootScope.logout()
    }else{
        $http.defaults.headers.common.Authorization  = $localStorage.auth.token;
        $http.defaults.headers.post.Authorization = $localStorage.auth.token;
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $rootScope.user_data = $localStorage.auth

    }
})



app.service('authInterceptor', function($q, $rootScope) {
    this.responseError = function(response) {
        if (response.status == 401){
            $rootScope.logout();
        }
        return $q.reject(response);
    };
})
app.config(['$httpProvider', function($httpProvider, $rootScope) {
    $httpProvider.interceptors.push('authInterceptor');
}])
app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self'
  ]);
  $sceDelegateProvider.resourceUrlBlacklist();
});