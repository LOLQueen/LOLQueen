'use strict';

const store = new WeakMap();

export default class LandingController {
    
    constructor ($state) {
        store.set(this, { $state });
    }

    goto(summoner) {
        const { $state } = this.getDependencies();

        $state.go('application.summoner', {
            region: "na", 
            summonerName: summoner.name
        });
    }

    getDependencies() {
        return store.get(this);
    }
}
