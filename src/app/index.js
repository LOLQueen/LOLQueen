'use strict';

angular.module('lolqueen', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingCtrl'
      })
      .state('summoner', {
      	url: '/summoner/:region/:summonerName',
      	templateUrl: 'app/summoner/summoner.html',
      	controller: 'SummonerCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
