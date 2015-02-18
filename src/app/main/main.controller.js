'use strict';

angular.module('lolqueen')
  .controller('MainCtrl', ['Summoner', '$scope', function (Summoner, $scope) {

  $scope.summoners = [];

  $scope.getSummoner = function(summoner){
    Summoner.findOne({summonerName: summoner.name}, function(data){
      $scope.summoners.push(data);
    });
  };
}]);
