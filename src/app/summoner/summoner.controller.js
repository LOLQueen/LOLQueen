'use strict';

angular.module('lolqueen')
  .controller('SummonerCtrl', [
  	'$scope', 
  	'$stateParams',
  	'Summoner', 
  	'MatchHistory', 
  	'Match',
  	function ($scope, $stateParams, Summoner, MatchHistory, Match) {

  	$scope.summonerName = $stateParams.summonerName;

  	Summoner.findOne({summonerName: $scope.summonerName}).$promise
  		.then(function(summoner) {
  			$scope.summoner = summoner;
  			$scope.summonerName = summoner.name;
  			return MatchHistory.find({summonerId: summoner.id}).$promise;
  		})
  		.then(function(recentMatches){
  			$scope.recentMatches = recentMatches.map(function(match){
              var id = match.matchId;

              Match.findOne({matchId: id})
                .$promise
                .then(function(resource){
                  match.data = resource;
                });

              return match;
            });

  		})
  		.catch(function(error){
  			console.log(error);
  		})

}]);
