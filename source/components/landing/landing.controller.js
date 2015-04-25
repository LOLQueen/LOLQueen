'use strict';

export default class LandingController {
	constructor ($state, $scope) {
		$scope.goto = goTo;

		function goTo(summoner){
			$state.go('summoner', {
				region: "na", 
				summonerName: summoner.name
			});
		}
	}
}
