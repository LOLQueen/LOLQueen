'use strict';

angular.module('lolqueen')
  .controller('SummonerCtrl', [
  	'$scope', 
  	'$stateParams',
  	'Summoner', 
  	'RecentMatches', 
  	function ($scope, $stateParams, Summoner, RecentMatches) {

  	$scope.summonerName = $stateParams.summonerName;

  	Summoner.findOne({summonerName: $scope.summonerName}).$promise
  		.then(function(summoner) {
  			$scope.summoner = summoner;
  			return RecentMatches.find({summonerId: summoner.id}).$promise;
  		})
  		.then(function(recentMatches){
  			$scope.recentMatches = recentMatches.games;
  			return recentMatches;
  		})
  		.catch(function(error){
  			console.log(error);
  		})

}]);
