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

        // Commented this out for now since there was a problem reading the match
        // data in the game directive while the promise thingy was going on
        // Instead now we read the match Info the directive and abstract info there
        // Still keeping the comment incase we need to revert in the near future
        
/*  			$scope.recentMatches = recentMatches.map(function(match){
              var id = match.gameId;

              Match.findOne({matchId: id})
                .$promise
                .then(function(resource){
                  match.data = resource;
                });
                
              return match;
            });*/

        $scope.recentMatches = recentMatches;
        console.log(recentMatches);
  		})
  		.catch(function(error){
  			console.log(error);
  		})

}]);
