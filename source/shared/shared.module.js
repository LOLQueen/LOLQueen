import gameCard from './game-card/game-card.module';
import resources from './resources/resources.module';

export default angular.
	module('shared', [
		gameCard.name,
		resources.name
	]);