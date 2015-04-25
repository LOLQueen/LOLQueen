import angular from 'angular';
import champion from './champion.resource';
import match from './match.resource';
import matchHistory from './match-history.resource';
import summonerSpell from './summoner-spell.resource';
import summoner from './summoner.resource';

export default angular
	.module('shared.resources', [])
	.service(champion.name, champion)
	.service(match.name, match)
	.service(matchHistory.name, matchHistory)
	.service(summonerSpell.name, summonerSpell)
	.service(summoner.name, summoner);