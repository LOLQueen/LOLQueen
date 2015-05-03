import champion from './champion.resource';
import match from './match.resource';
import RecentGames from './recent-games.resource';
import summonerSpell from './summoner-spell.resource';
import summoner from './summoner.resource';

export default angular
	.module('shared.resources', [])
	.service(champion.name, champion)
	.service(match.name, match)
	.service(RecentGames.name, RecentGames)
	.service(summonerSpell.name, summonerSpell)
	.service(summoner.name, summoner);