angular.module('starter.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/home.html",
                    controller: "messageCtrl"
                }
            }
        })
        .state('conversation', {
            url: "/conversation/:messageId",
            templateUrl: "templates/conversation.html",
            controller: "conversationDetailCtrl"
        })
        .state('tabs.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                    templateUrl: "templates/contact.html",
                    controller: "contactCtrl"
                }
            }
        })
        .state('tabs.found', {
            url: "/found",
            views: {
                'found-tab': {
                    templateUrl: "templates/found.html",
                    controller: "foundCtrl"
                }
            }
        })
    $urlRouterProvider.otherwise("/tab/home");
});