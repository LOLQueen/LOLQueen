'use strict';

import { transform } from './summoner.transformer';
const store = new WeakMap();

export default class Summoner {
    
    constructor ($http, RecentGames, MatchHistory, $q) {
        store.set(this, { $http, RecentGames, MatchHistory, $q });
    }

    findOne({name, region = 'na'} = {}){
        const { $http } = store.get(this);

        return $http.get(`http://localhost:9000/api/lol/${region}/v1.4/summoner/by-name/${name}`)
                    .then(getResponseData)
                    .then(transform.bind(this, store));

        function getResponseData(response) {
            return response.data[Reflect.ownKeys(response.data)[0]];
        }
    }
}