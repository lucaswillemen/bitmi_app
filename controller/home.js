app.controller('home', function($scope, $rootScope, $state, $http, $localStorage, $sce, $httpParamSerializerJQLike, $filter) {
    $rootScope.menu = "home"
    $rootScope.title = "Dashboard"
    $scope.url = window.api + "home/"

    $scope.cnf = {
        createAddress: $sce.trustAsHtml('Gerar endereço para pagamento')
    }


    $scope.load_user()


    $.get("https://api.blockchain.info/charts/market-price?cors=true&timespan=60days&lang=pt")
        .done(function(res) {
            var ctx = document.getElementById("canvas").getContext("2d");
             if($(window).width()>748)
                ctx.canvas.height = 80;
            else
                ctx.canvas.height = 160;
            var config = {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        backgroundColor:"rgba(54, 162, 235, 0.5)",

                        label: 'Valor em USD ',
                        data: []
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function(value, index, values) {
                                    return $filter('currency')(value, "$ ")
                                }
                            }
                        }]
                    }
                }

            };
            angular.forEach(res.values, function(v) {
                config.data.datasets[0].data.push(v.y)
                config.data.labels.push(moment(v.x * 1000).format("DD/MM"))
            })

            $scope.myLine = new Chart(ctx, config);
        })


    $('#modalBTC').on('shown.bs.modal', function() {
        function check() {
            if ($rootScope.auth.address) {
                $http.get(window.api + "bitcoin/check")
                    .then(function(res) {
                        $scope.addressData = res.data
                        if (!res.data) {
                            clearInterval($scope.checkInterval)
                        }
                    })
            }
        };
        check()
        $scope.checkInterval = setInterval(function() {
            check()
        }, 10000)
    }).on('hide.bs.modal', function() {
        clearInterval($scope.checkInterval)
    })



    $scope.getAddress = function() {
        $scope.cnf.createAddress = $sce.trustAsHtml('<i class="fa fa-circle-o-notch fa-spin"></i>')
        $http.get(window.api + "bitcoin/create")
            .then(function(res) {
                $scope.auth.address = res.data
            })
    }
    $scope.$on('$viewContentLoaded', function() {
        $('#modalAdsPly').on('hide.bs.modal', function(e) {
            $('#voucher')[0].reset()
            $("#voucher").data('formValidation').resetForm();
        })
        $('#voucher').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post(window.api + "voucher", $httpParamSerializerJQLike($scope.data_cupom))
            .then(function(res) {
                console.log(res)
                $scope.load_user()
                $('#modalAdsPly').modal('hide')
            }, function(res) {
                console.log(res)
                if (res.status === 404) {
                    swal("Oops...", "Código inválido!", "error");
                    $('#voucher')[0].reset()
                    $("#voucher").data('formValidation').resetForm();
                }
            })
        })

    })
})