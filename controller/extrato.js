app.controller('extrato', function($scope, $rootScope, $state, $http, $localStorage, $sce, $httpParamSerializerJQLike, $filter) {
    $rootScope.menu = "extrato"
    $rootScope.title = "Extrato"
    $scope.url = window.api + "extrato/"
    $scope.load_user()
    CheckInputs()

    $scope.getAddress = function() {
        $http.get(window.api + "extrato")
            .then(function(res) {
                console.log(res.data)
            })
    }
    $scope.getAddress()
    var dt = $("#datatable").DataTable({
        responsive: true,
        'ajax': {
            'url': $scope.url,
            'type': 'GET',
            "dataSrc": "",
            'beforeSend': function(request) {
                request.setRequestHeader("Authorization", $localStorage.auth.token)
            }
        },
        rowId: 'staffId',
        "columns": [{
                "data": "data"
            },
            {
                "data": "valor",
                render: function(a){
                    return $filter('currency')(a, "R$ ")
                }
            },
            {
                "data": "btc"
            },
            {
                render: function(d, l, u){
                    return $filter('currency')(u.valor / u.btc , "R$ ")
                }
            },
            {
                render: function(d, l, u) {
                    if (u.status == "0") {
                        return "<button class='btn btn-xs btn-warning'>Em processamento</button>"
                    }
                    if (u.status == "1") {
                        return "<button class='btn btn-xs btn-success'>Investido</button>"
                    }
                    if (u.status == "2") {
                        return "<button class='btn btn-xs btn-primary'>Retirado</button>"
                    }
                }
            },
            {
                "data": "descricao"
            }
        ]
    })




    $scope.cnf = {
        createAddress: $sce.trustAsHtml('Entendi, quero gerar um endereço')
    }
    $('#modalBTC')
    .on('shown.bs.modal', function() {
        console.log("show")
        function check() {
            $http.get(window.api + "bitcoin/check?address=" + $scope.user_data.address)
                .then(function(res) {
                    $scope.addressData = res.data
                    if (!res.data) {
                        clearInterval($scope.checkInterval)
                    }
                })
        };
        $scope.checkInterval = setInterval(function() {
            check()
        }, 10000)
    })
    .on('hide.bs.modal', function() {
        clearInterval($scope.checkInterval)
        delete $scope.user_data.address
        $scope.cnf = {
            createAddress: $sce.trustAsHtml('Entendi, quero gerar um endereço')
        }
    })



    $scope.getAddress = function() {
        $scope.cnf.createAddress = $sce.trustAsHtml('<i class="fa fa-circle-o-notch fa-spin"></i>')
        $http.get(window.api + "bitcoin/create")
            .then(function(res) {
                $scope.user_data.address = res.data
                dt.ajax.reload(null, false); // user paging is not reset on reload
            })
    }
})