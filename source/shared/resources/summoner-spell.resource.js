'use strict';

const store = new WeakMap();

export default class SummonerSpell {
    constructor ($http) {
        store.set(this, { $http });
    }

    findOne({ spellId, region = 'na'} = {}) {
        const { $http } = this.getDependencies();

        return $http.get(`http://localhost:9000/api/lol/static-data/${region}/v1.2/summoner-spell/${spellId}`)
                    .then((response) => response.data);
    }

    getDependencies() {
        return store.get(this);
    }
}
