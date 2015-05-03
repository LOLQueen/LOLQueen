'use strict';

import {
    transform
} from './summoner.transformer';

const store = new WeakMap();

export default class Summoner {

    constructor($http, RecentGames, MatchHistory, $q) {
        store.set(this, {
            $http, RecentGames, MatchHistory, $q
        });
    }

    findOne({ name, id, region = 'na'} = {}) {

        if (! (Boolean(name) ^ Boolean(id))) {
            console.log(name, id);
            throw new TypeError('Summoner#findOne needs exactly one value of key "name" or "id" in the argument object.');
        }

        let location = 'http://localhost:9000';
        
        if (name) {
            location += `/api/lol/${region}/v1.4/summoner/by-name/${name}`;
        }

        if (id) {
            location += `/api/lol/${region}/v1.4/summoner/${id}`;
        }

        const {
            $http
        } = this.getDependencies();

        return $http
            .get(location)
            .then(getResponseData)
            .then(transform.bind(this));

        function getResponseData(response) {
            return response.data[Reflect.ownKeys(response.data)[0]];
        }
    }

    getDependencies() {
        return store.get(this);
    }
}