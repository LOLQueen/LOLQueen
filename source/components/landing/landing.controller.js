'use strict';

export default class LandingController {
	constructor ($state, $scope) {
		$scope.goto = goTo;
        console.log('hoe');
		function goTo(summoner){
			$state.go('summoner', {
				region: "na", 
				summonerName: summoner.name
			});
		}
	}
}
