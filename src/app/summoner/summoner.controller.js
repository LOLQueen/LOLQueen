'use strict';

angular.module('lolqueen')
  .controller('SummonerCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

  	console.log($stateParams);

  	$scope.summonerName = $stateParams.summonerName;

}]);
