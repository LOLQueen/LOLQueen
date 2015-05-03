import Champion from './champion.resource';
import Match from './match.resource';
import MatchHistory from './match-history.resource';
import SummonerSpell from './summoner-spell.resource';
import Summoner from './summoner/summoner.module';
import RecentGames from './recent-games/recent-games.module';

export default angular
	.module('shared.resources', [
        Summoner.name,
        RecentGames.name
    ])
	.service(Champion.name, Champion)
	.service(Match.name, Match)
	.service(SummonerSpell.name, SummonerSpell)
    .service(MatchHistory.name, MatchHistory);