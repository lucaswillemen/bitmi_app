app.controller('perfil', function($scope, $rootScope, $state, $http, $localStorage, $sce, $httpParamSerializerJQLike, $filter) {
    $rootScope.menu = "perfil"
    $rootScope.title = "Conta"
    $scope.url = window.api + "home/"
    $scope.load_user()
    CheckInputs()
})
