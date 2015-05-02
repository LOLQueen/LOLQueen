import gameCard from './game-card/game-card.module';
import resources from './resources/resources.module';
import ddragonImg from './ddragon-img/ddragon-img.module';

export default angular.
	module('shared', [
		gameCard.name,
		resources.name,
        ddragonImg.name
	]);