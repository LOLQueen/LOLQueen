'use strict';

angular.module('lolqueen', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingCtrl'
      })
      .state('home', {
      	url: '/home',
      	templateUrl: 'app/home/home.html',
      	controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
