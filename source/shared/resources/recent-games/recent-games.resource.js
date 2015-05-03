'use strict';

import { default as transform } from './recent-games.transformer';

const store = new WeakMap();

export default class RecentGames {
    
    constructor($http, Match, Champion, SummonerSpell) {
        store.set(this, { $http, Match, Champion, SummonerSpell });
    }

    find({summonerId, region = 'na'} = {}) {

        const { $http } = this.getDependencies();

        return $http.get(`http://localhost:9000/api/lol/${region}/v1.3/game/by-summoner/${summonerId}/recent`)
                    .then((response) => response.data.games)
                    .then(transform.bind(this, store));
    }

    getDependencies() {
        return store.get(this);
    }

}