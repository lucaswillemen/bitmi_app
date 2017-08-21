app.controller('cadastro', function($scope, $rootScope, $state, $httpParamSerializerJQLike, $localStorage, $http) {

	$scope.url = window.api+"auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


	console.log($localStorage.auth)
    $scope.$on('$viewContentLoaded', function() {

        setTimeout(function() {
            $(".loading").fadeOut()
        }, 1000);
    	setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 200)
		$('#FormCadastro').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post($scope.url+"cadastro",$httpParamSerializerJQLike($scope.data))
            .then(function(res){
            	$localStorage.auth = res.data
            	$state.go("app.home")
            },function(){
                swal("Oops...", "Já existe um cadastro com esse email!", "error");
            })          
        })
    })
    
})