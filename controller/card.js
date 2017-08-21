app.controller('card', function($scope, $rootScope, $state, $http, $localStorage, $sce, $httpParamSerializerJQLike, $filter) {
    $rootScope.menu = "card"
    $rootScope.title = "Cartões"
    $scope.url_holder = window.api + "card/"
    $scope.url_card = window.api + "card/"
    $scope.url_user = window.api + "home/"

    $scope.load_holder = function() {
        $http.get($scope.url_holder+"holder/")
        .then(function(res) {
            $scope.data_holder = res.data
            $scope.start_select($scope.data_holder)
        })
    };

    $scope.load_card = function() {
        $http.get($scope.url_card+"card/")
        .then(function(res) {
            console.log(res.data)
            $scope.data_card = res.data
        })
    };


    $scope.load_user()


    $scope.cotar = function(){
        $.get("https://blockchain.info/pt/ticker?cors=true")
        .done(function(res) {
            $scope.cota = res
            $scope.$apply()
        })
    }
    $scope.cotar()

    $scope.pan_format = function(pan){
        var a = pan.substring(0, 4);
        var b = pan.substring(4, 8);
        var c = pan.substring(8, 12);
        var d = pan.substring(12, 16);
        pan = a+" "+b+" "+c+" "+d
        return pan
    }

    $scope.expiration_format = function(date){
        return new Date(date)
    }

    $scope.$on('$viewContentLoaded', function() {


        $scope.start_select = function (res) {    
        console.log(res)        
            $("#user_select").select2({
                placeholder: 'Selecione um titular',
                data: res,
                width: '100%'
            }).change(function(e) {
                $('#formCliente').formValidation('revalidateField', 'loja_id');
            })
        };

        $scope.load_user()
        $scope.load_holder()
        $scope.load_card()


        $('#modalHolder').on('hide.bs.modal', function(e) {
            $('#holderForm')[0].reset()
            $("#holderForm").data('formValidation').resetForm();
        })
        $('#holderForm').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post($scope.url_holder + "holder/add", $httpParamSerializerJQLike($scope.form_holder))
            .then(function(res) {
                console.log(res)
                $scope.load_holder()
                $('#modalHolder').modal('hide')
            }, function(res) {
                console.log(res)
                if (res.status === 404) {
                    swal("Oops...", "Código inválido!", "error")
                    $('#holderForm')[0].reset()
                    $("#holderForm").data('formValidation').resetForm()
                }
            })
        })


        $('#modalCard').on('hide.bs.modal', function(e) {
            $('#cardForm')[0].reset()
            $("#cardForm").data('formValidation').resetForm();
        })
        $('#cardForm').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $scope.form_card.holder_id = $("#user_select").val()
            $http.post($scope.url_card + "card/add", $httpParamSerializerJQLike($scope.form_card))
            .then(function(res) {
                console.log(res)
                $scope.load_card()
                $('#modalCard').modal('hide')
            }, function(res) {
                console.log(res)
                if (res.status === 404) {
                    swal("Oops...", "Código inválido!", "error")
                    $('#cardForm')[0].reset()
                    $("#cardForm").data('formValidation').resetForm()
                }
            })
        })
    })
})