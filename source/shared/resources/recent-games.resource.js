const store = new WeakMap();

export default class RecentGames {
	
	constructor($http) {
		store.set(this, { $http });
	}

	find({summonerId, region = 'na'} = {}) {
		const { $http } = store.get(this);

		return $http.get(`http://localhost:9000/api/lol/${region}/v1.3/game/by-summoner/${summonerId}/recent`)
					.then((response) => response.data.games);
	}

}
