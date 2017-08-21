app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('app', {
            abstract: true,
            url: "",
            views: {
                "menu": {
                    templateUrl: "template/menu.html?" + window.version,
                    controller: "menu"
                },
                "header": {
                    templateUrl: "template/header.html?" + window.version
                },
                "root": {
                    template: ' <ng-view ui-view="view"></ng-view>',
                    controller: "Main"
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "header": {
                    templateUrl: "template/auth_header.html?" + window.version,
                    controller: "menu"
                },
                "root": {
                    templateUrl: "template/login.html?" + window.version,
                    controller: "login"
                }
            }
        })
        .state('cadastro', {
            url: "/cadastro",
            views: {
                "header": {
                    templateUrl: "template/auth_header.html?" + window.version,
                    controller: "menu"
                },
                "root": {
                    templateUrl: "template/cadastro.html?" + window.version,
                    controller: "cadastro"
                }
            }
        })
        .state('app.home', {
            url: "/home",
            views: {
                "view": {
                    templateUrl: "template/home.html?" + window.version,
                    controller: "home"
                }
            }
        })
        .state('app.perfil', {
            url: "/perfil",
            views: {
                "view": {
                    templateUrl: "template/perfil.html?" + window.version,
                    controller: "perfil"
                }
            }
        })
        .state('app.card', {
            url: "/card",
            views: {
                "view": {
                    templateUrl: "template/card.html?" + window.version,
                    controller: "card"
                }
            }
        })
        .state('app.mining', {
            url: "/mining",
            views: {
                "view": {
                    templateUrl: "template/mining.html?" + window.version,
                    controller: "mining"
                }
            }
        })
        
    $urlRouterProvider.otherwise("/login")
    if (!window.mobile) {
        $locationProvider.html5Mode(true);
    }
})