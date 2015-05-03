'use strict';

const store = new WeakMap();

export default class RecentGames {
	
	constructor($http, Match) {
		store.set(this, { $http, Match });
	}

	find({summonerId, region = 'na'} = {}) {
		const { $http } = store.get(this);

		return $http.get(`http://localhost:9000/api/lol/${region}/v1.3/game/by-summoner/${summonerId}/recent`)
					.then((response) => response.data.games)
                    .then(decorate.bind(this));
	}

}

function decorate(games){
    const { Match } = store.get(this);

    for (let game of games) {
        game.getParticipants = getParticipants;
    }

    function getParticipants() {
        const game = this;

        return Match
            .findOne({matchId: game.gameId})
            .then((match) => match.participants)
            .then((participants) => {

                return participants.map(participant => (participant.populate = populate, participant));

                function populate(relation) {
                    const participant = this;

                    if (/summoner(\s|-)?id/i.test(relation)) {
                        for (let player of game.fellowPlayers) {
                            if (player.championId === participant.championId && player.teamId === participant.teamId) {
                                participant.summonerId = player.summonerId;
                            }
                        }
                    } else {
                        throw new TypeError('Invalid argument passed to participant#populate.');
                    }

                    return participant;

                }

            });
    }

    return games;

}