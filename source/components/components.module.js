import angular from 'angular';
import landing from './landing/landing.module';
import summoner from './summoner/summoner.module';
import shared from '../shared/shared.module';

export default angular.
	module('components', [
		landing.name,
		summoner.name,
		shared.name
	]);