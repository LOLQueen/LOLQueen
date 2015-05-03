'use strict';

export default class SummonerController {
    constructor($stateParams, Summoner) {
        const self = this;
        Summoner
            .findOne({ name: $stateParams.summonerName})
            .then((summoner) => summoner.populate('recent games'))
            .then((summoner) => summoner.populate('match history'))
            .then((summoner) => {
                Object.assign(self, summoner);
            });
    }
}