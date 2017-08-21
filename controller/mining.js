app.controller('mining', function($scope, $rootScope, $state, $http, $localStorage, $sce, $httpParamSerializerJQLike, $filter) {
    $rootScope.menu = "mining"
    $rootScope.title = "Mineração"
    $scope.url = window.api + "mining/"



    $scope.load = function() {
        $http.get(window.api+"home/")
        .then(function(res) {
            $scope.ghs = res.data.thash*1000
            $scope.start_chart()
        })
    };
    $scope.load()



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
                    $scope.load()
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




    $scope.start_chart = function(){
        $scope.chart_data = []
        $scope.chart_labels = []
        for (var i = 30; i >= 0; i--) {
            $scope.chart_data.push(Math.floor((Math.random() * $scope.ghs*0.1) + $scope.ghs))
        }
        for (var i = 30; i >= 0; i--) {
            $scope.chart_labels.push(i)
        }
        var ctx = document.getElementById("canvas").getContext("2d");
        if($(window).width()>748)
            ctx.canvas.height = 80;
        else
            ctx.canvas.height = 160;

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: $scope.chart_labels,
                datasets: [{
                    borderColor: "#66bb6a",
                    fill: false,
                    data: $scope.chart_data,
                    borderWidth: 3
                }]
            },

            options: {
                legend: {
                    display: false,
                    responsive: true,
                    maintainAspectRatio: true
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                            suggestedMax: 50 // minimum will be 0, unless there is a lower value.
                        }
                    }]
                },   
                animation: false,
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {
                        tension: 0
                    }
                }
            }
        })

        function refresh() {
            setTimeout(function() {
                myChart.data.datasets[0].data.shift()
                myChart.data.datasets[0].data.push(Math.floor((Math.random() * $scope.ghs*0.1) + $scope.ghs))
                myChart.update()
                refresh()
            }, 1000);
        };
        refresh()
    }
})