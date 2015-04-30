export default class SummonerController {
    constructor($stateParams, Summoner, SummonerSpell, MatchHistory) {
        const self = this;
        Summoner
            .findOne({ name: $stateParams.summonerName})
            .then((summoner) => summoner.populate('match history'))
            .then((summoner) => {
                self.summoner = summoner;
            })

    }
}