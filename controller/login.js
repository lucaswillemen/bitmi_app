app.controller('login', function($scope, $rootScope, $state, $httpParamSerializerJQLike, $localStorage, $http) {
	

	$scope.url = window.api+"auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    if ($localStorage.auth) {
        $state.go("app.home")
    }

	
    $scope.$on('$viewContentLoaded', function() {
        setTimeout(function() {
            $(".loading").fadeOut()
        }, 1000);
        $('#FormLogin').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post($scope.url+"login",$httpParamSerializerJQLike($scope.data))
            .then(function(res){
                $localStorage.auth = res.data
                $state.go("app.home")
            }, function(){
                swal("Oops...", "Dados de acesso incorretos!", "error");
            })            
        })
    })
    
})