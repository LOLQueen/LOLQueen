const store = new WeakMap();

export default class Champion {

    constructor($http) {
        store.set(this, { $http });
    }

    findOne({championId, region = 'na'} = {}) {
        const { $http } = store.get(this);

        return $http.get(`http://localhost:9000/api/lol/static-data/${region}/v1.2/champion/${championId}`)
                    .then((response) => response.data);
    }
}