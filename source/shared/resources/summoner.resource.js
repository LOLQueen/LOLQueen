const store = new WeakMap();

export default class Summoner {
    
    constructor ($http, MatchHistory) {
        store.set(this, { $http, MatchHistory });
    }

    findOne({name, region = 'na'} = {}){
        const { $http } = store.get(this);

        return $http.get(`http://localhost:9000/api/lol/${region}/v1.4/summoner/by-name/${name}`)
                    .then((response) => response.data[Reflect.ownKeys(response.data)[0]])
                    .then(decorate.bind(this));
    }
}

function decorate(summoner) {
    const self = this;
    const { MatchHistory } = store.get(self);

    summoner.populate = function (relation) {
        if (/match(\s|-)?history/i.test(relation)) {

            return MatchHistory.find({summonerId: summoner.id})
                .then(function (history){
                    summoner.matchHistory = history;
                    return summoner;
                });
        }
    }

    return summoner;
}