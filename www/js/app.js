// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.routes', 'starter.services', 'starter.directives', 'monospaced.elastic'])

.config(function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('top'); // other values: top
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
    $ionicConfigProvider.tabs.style("standard");

})

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
        //console.log(response.data.results);
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