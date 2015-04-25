import angular from 'angular';
import directive from './game-card.directive';

export default angular
	.module('shared.game', [])
	.directive(directive.name, directive);