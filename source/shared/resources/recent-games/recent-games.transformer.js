'use strict';

import { default as participantTransformer } from './participant.transformer';

export default function transform(store, games){
    
    //  get and instance of RecentGames
    const RecentGamesInstance = this;

    //  grab match resource from store
    const { Match } = RecentGamesInstance.getDependencies();

    //  attach the getParticipants method to each game object
    for (let game of games) {
        game.getParticipants = getParticipants;
    }

    function getParticipants() {
        const game = this;

        // find match and 
        return Match
            .findOne({ matchId: game.gameId })
            .then((match) => match.participants)
            .then((participants) => participants.map(participantTransformer.bind(RecentGamesInstance, store)))
            .then((participants) => {

                return participants.map((participant) => (
                    participant.populate = populate,
                    participant
                ));

                function populate(relation) {
                    const participant = this;

                    if (/summoner(\s|-)?id/i.test(relation)) {

                        //  shitty n^2 lookup of summoner name, cause RIOT is on crack
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