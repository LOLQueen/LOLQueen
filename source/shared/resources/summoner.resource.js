const store = new WeakMap();

export default class Summoner {
    
    constructor ($http, RecentGames) {
        store.set(this, { $http, RecentGames });
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
    const { RecentGames } = store.get(self);

    summoner.populate = function (relation) {
        if (/recent(\s|-)?games/i.test(relation)) {

            return RecentGames.find({summonerId: summoner.id})
                .then(function (recentGames){
                    summoner.recentGames = recentGames;
                    return summoner;
                });
        }
    }

    return summoner;
}