// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.services'])

.run(function($ionicPlatform, $http, messageService, dateService) {
    var url = "";
    if (ionic.Platform.isAndroid()) {
        url = "/android_asset/www/";
    }

    // if (localStorage.getItem("messageID") === null) {

    $http.get(url + "data/json/messages.json").then(function(response) {
        // localStorageService.update("messages", response.data.messages);
        messageService.init(response.data.messages);

    });
    $http.get(url + "data/json/friends.json").then(function(response){
        console.log(response.data.results);
    });
    // }

    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            views: {
                'tab': {
                    templateUrl: "templates/tabs.html"
                }
            }
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
        .state('tabs.conversation', {
            url: "/conversation",
            views: {
                'home-tab': {
                    templateUrl: "templates/conversation.html"
                }
            }
        })
        .state('tabs.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                    templateUrl: "templates/contact.html"
                }
            }
        })
        .state('tabs.found', {
            url: "/found",
            views: {
                'found-tab': {
                    templateUrl: "templates/found.html"
                }
            }
        })
    $urlRouterProvider.otherwise("/tab/home");
})

.config(function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('top'); // other values: top
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
    $ionicConfigProvider.tabs.style("standard");

})

.controller('messageCtrl', function($scope, $state, $ionicPopup, localStorageService, messageService) {
    $scope.popup = {
        isPopup: false,
        index: 0
    };
    $scope.onSwipeLeft = function () {
        $state.go("tabs.contact");
    };
    $scope.popupMessageOpthins = function ($index) {
        $scope.popup.index = $index;
        //这里通过$ionicPopup.show()方法创建了一个自定义的popup
        $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/popup.html",
            scope: $scope,
        });
        $scope.popup.isPopup = true;
    };
    //实现标为已读/未读, 注意$scope.popup.optionsPopup.close()方法
    //用来关闭弹窗, 我竟然找了很久才发现这个接口
    $scope.markMessage = function () {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        if (message.showHints) {
            message.showHints = false;
            message.noReadMessages = 0;
        } else {
            message.showHints = true;
            message.noReadMessages = 1;
        }
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.updateMessage(message);
    };
})