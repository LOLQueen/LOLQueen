'use strict';

angular
	.module('lolqueen')
	.controller('LandingCtrl', ['$state', '$scope', function ($state, $scope) {

		$scope.goto = function(summoner){
			$state.go('home');
		}

	}]
);
