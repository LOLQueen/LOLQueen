'use strict';

const store = new WeakMap();

export default class Match {

    constructor($http) {
        store.set(this, { $http });
    }

    findOne({matchId, region = 'na'} = {}){
        const { $http } = store.get(this);

        return $http.get(`http://localhost:9000/api/lol/${region}/v2.2/match/${matchId}`)
                    .then((response) => response.data);
    }
}