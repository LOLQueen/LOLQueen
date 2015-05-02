'use strict';

const store = new WeakMap();

export default class LandingController {
    
    constructor ($state) {
        store.set(this, { $state });
    }

    goto(summoner) {
        const { $state } = store.get(this);

        $state.go('application.summoner', {
            region: "na", 
            summonerName: summoner.name
        });
    }
}
