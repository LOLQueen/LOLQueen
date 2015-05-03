'use strict';

export function transform(summoner) {

    const SummonerInstance = this;
    const { RecentGames, MatchHistory, $q } = SummonerInstance.getDependencies();

    summoner.populate = function (relation) {
        if (/recent(\s|-)?games/i.test(relation)) {
            return RecentGames
                    .find({summonerId: summoner.id})
                    .then((games) => summoner.recentGames = games)
                    .then(() => summoner);
        }

        else if (/match(\s|-)?history/i.test(relation)) {
            return MatchHistory
                    .find({summonerId: summoner.id})
                    .then((history) => summoner.matchHistory = history)
                    .then(() => summoner);
        }

        else {
            throw new TypeError('Invalid argument passed to summoner#populate.');
        }
        
    }

    return summoner;
}