const store = new WeakMap();

export default class MatchHistory {
    
    constructor($http) {
        store.set(this, { $http });
    }

    find({summonerId, region = 'na'} = {}) {
        const { $http } = store.get(this);

        return $http.get(`http://localhost:9000/api/lol/${region}/v2.2/matchhistory/${summonerId}`)
                    .then((response) => response.data.matches);
    }

}
