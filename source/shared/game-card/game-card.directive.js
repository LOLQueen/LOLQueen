'use strict';

export default gameCard;

function gameCard() {
    return {
        templateUrl: 'shared/game-card/game-card.html',
        scope: {
            game: '=',
            summoner: '='
        },
        link: function(scope) {

            scope.game
                .getParticipants()
                .then((participants) => participants.map(
                    (participant) => (
                        participant.populate('summonerId'),
                        participant.populate('champion'),
                        participant.populate('summonerSpells')
                    )
                ))
                .then(function(participants){
                    scope.game.participants = participants;
                    console.log(scope.game);
                });

            // console.log(scope);
            // console.log(scope.game);
            // Match
            //     .findOne({matchId: scope.game.gameId})
            //     .then((match) => {

            //         return match.participants.map(attachSummonerId);

            //         function attachSummonerId(participant){
            //             scope.game.fellowPlayers.forEach((player)=>{
            //                 if (player.championId === participant.championId && 
            //                     player.teamId === participant.teamId) {

            //                     // participant.summonerId = player.summonerId;
            //                 }
            //             });

            //             console.log('game: ', scope.game)
            //             console.log('match: ', match);

            //             return participant;
            //         }
            // });

            // var game = scope.game;
            // var summoner = scope.summoner;
            // var stats = game.stats;

            // var id = game.gameId;

            // Match.findOne({matchId: id})
            // .$promise
            // .then(function(resource){

            //     var data = resource;

            //     if(id == '1794640277'){
            //         console.log(resource);          
            //     }

            //     return data.participants.map(function(player){
            //             var champId = player.championId;
            //             var teamId = player.teamId;

            //             if(champId == game.championId){
            //                 player.summonerId = summoner.id;
            //                 player.summonerName = summoner.name;              
            //             }

            //             game.fellowPlayers.forEach(function(summoner){
            //                 if(summoner.championId == champId && summoner.teamId == teamId){
            //                     player.summonerId = summoner.summonerId;
            //                 }              
            //             });

            //             return player;
            //         });

            // })
            // .then(function(participants){

            //     //console.log(participants);

            //         scope.otherPlayers = participants.map(function(participant){
            //             var stats = participant.stats;
            //             var player = {
            //                 champion: {id: participant.championId},
            //                 summonerSpells: [{ id: participant.spell1Id } , {id : participant.spell2Id} ],
            //                 summonerName: participant.summonerId,
            //                 teamId: participant.teamId,
            //                 role: participant.timeline.lane,
            //                 kills: stats.kills,
            //                 deaths: stats.deaths,
            //                 assists: stats.assists,
            //                 champLevel: stats.champLevel,
            //                 creeps: {
            //                     ownJungle: stats.neutralMinionsKilledTeamJungle,
            //                     enemyJungle: stats.neutralMinionsKilledEnemyJungle,
            //                     minions: stats.minionsKilled
            //                 },
            //                 goldEarned: stats.goldEarned,
            //                 items: [
            //                     stats.item0,
            //                     stats.item1,
            //                     stats.item2,
            //                     stats.item3,
            //                     stats.item4,
            //                     stats.item5
            //                 ],
            //                 trinket: stats.item6,
            //                 damageDealt: stats.totalDamageDealtToChampions,
            //                 wardsPlaced: stats.wardsPlaced,
            //                 wardsKilled: stats.wardsKilled,
            //                 winner: stats.winner
            //             }

            //             // get chamption name from api
            //             Champion.findOne({championId: player.champion.id})
            //                 .$promise
            //                 .then(function(resource){
            //                     player.champion.name = resource.name;
            //                     player.champion.key = resource.key;
            //                 });

            //             // get summoner spells
            //             player.summonerSpells.forEach(function(spell){
            //                 SummonerSpell.findOne({spellId: spell.id})
            //                     .$promise
            //                     .then(function(resource){
            //                         spell.name = resource.name;
            //                         spell.key = resource.key;
            //                         spell.description = resource.description;
            //                     });
            //             });  

            //             //console.log(player);
            //             return player;
            //     });

            // });

            // scope.won = stats.win;
            // scope.gameLength = stats.timePlayed;
            // scope.playedAgo = (Date.now() - game.createDate) / (1000) ;
            // scope.queueType = game.subType;
            // scope.summonerSpells = [{ id: game.spell1 } , {id : game.spell2} ];
            // scope.kda = {
            //     kills: stats.championsKilled, 
            //     deaths: stats.numDeaths,
            //     assists: stats.assists
            // };
            // scope.goldEarned = stats.goldEarned;

            // scope.items = [
            //     stats.item0,
            //     stats.item1,
            //     stats.item2,
            //     stats.item3,
            //     stats.item4,
            //     stats.item5
            // ];

            // if(stats.items6 != 0){
            //     scope.trinket = stats.item6;
            // }

            // scope.items = scope.items.filter(function(item){ return item; });

            // scope.champion = {
            //     id: game.championId,
            //     level: stats.level
            // };

            // scope.ipEarned = game.ipEarned;

            // // get chamption name from api
            // Champion.findOne({championId: scope.champion.id})
            //     .$promise
            //     .then(function(resource){
            //         scope.champion.name = resource.name;
            //         scope.champion.key = resource.key;
            //     });

            // // get summoner spells
            // scope.summonerSpells.forEach(function(spell){
            //     SummonerSpell.findOne({spellId: spell.id})
            //         .$promise
            //         .then(function(resource){
            //             spell.name = resource.name;
            //             spell.key = resource.key;
            //             spell.description = resource.description;
            //         });
            // });      

            // scope.toggleDetails = function(){
            //     if (scope.details) {
            //         scope.details = false;

            //         //show info
            //     } else {
            //         scope.details = true;
            //     }
            // }

            // scope.details = false;

            //console.log(scope);
        }
    }
}