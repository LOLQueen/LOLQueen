'use strict';

import { default as participantTransformer } from './participant.transformer';

export default function transform(store, games){
    
    //  get and instance of RecentGames
    const RecentGamesInstance = this;

    //  grab match resource from store
    const { Match, Champion, SummonerSpell, $injector} = RecentGamesInstance.getDependencies();

    //  attach the getParticipants method to each game object
    for (let game of games) {
        // console.log(game);
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
                                if (typeof participant.summoner !== 'object' || ! participant.summoner) {
                                    participant.summoner = {};
                                }

                                angular.extend(participant.summoner, {
                                    id: player.summonerId
                                });
                            }
                        }
                        
                    } 
                    else if (/champion/i.test(relation)) {
                        participant.champion = {};

                        Champion
                            .findOne({championId: participant.championId})
                            .then((champion) => {
                                angular.extend(participant.champion, champion)
                            });
                    }

                    else if (/summoner(-|\s)?spells/i.test(relation)) {
                        
                        participant.summonerSpells
                            .forEach(function(summonerSpell){
                                SummonerSpell
                                    .findOne({spellId: summonerSpell.id})
                                    .then((spell) => {
                                        angular.extend(summonerSpell, spell)
                                    });
                        });

                    }

                    else if (/summoner/i.test(relation)) {
                        if (! participant.summonerId ) {
                            participant.populate('summonerId');
                        }

                        //  recent-games relies on summoner
                        //  circular dependency solution, in essence
                        const Summoner = $injector.get('Summoner');

                        if (participant.summoner) {
                            Summoner
                                .findOne({ id: participant.summoner.id })
                                .then((summoner) => angular.extend(participant.summoner, summoner));
                        }

                    }

                    else {

                        throw new TypeError('Invalid argument passed to participant#populate.');
                    
                    }

                    return participant;

                }

            });
    }

    return games;

}