'use strict';

angular.module('lolqueen')
  .directive('lqGame', lqGame);

lqGame.$inject = ['Champion', 'SummonerSpell', 'Match', '$filter'];

function lqGame(Champion, SummonerSpell, Match, $filter){
  return {
    templateUrl: 'components/game/game.html',
    scope: {
      game: '='
    },
    link: function(scope, element, attr) {
      var game = scope.game;
      var stats = game.stats;

      var id = game.gameId;

      Match.findOne({matchId: id})
      .$promise
      .then(function(resource){

        var data = resource;

        return data.participants.map(function(player){
            var id = player.participantId;

/*            data.participantIdentities.forEach(function(summoner){
              if(summoner.participantId == id){
                player.summonerInfo = summoner.player;
              }              
            });*/

            player.summonerInfo = $filter('filter')(data.participantIdentities, function(summoner){
              if(summoner.participantId == id){
                return summoner.player;
              }                 
            });

            console.log(player);
            return player;
          });

      })
      .then(function(participants){

          scope.otherPlayers = participants.map(function(participant){
            var stats = participant.stats;
            var player = {
              championId: participant.championId,
              spells: [{ id: participant.spell1Id } , {id : participant.spell1Id} ],
              profileIcon: participant.summonerInfo[0].player.profileIcon,
              summonerName: participant.summonerInfo[0].player.summonerName,
              teamId: participant.teamId,
              role: participant.timeline.lane,
              kills: stats.kills,
              deaths: stats.deaths,
              assists: stats.assists,
              champLevel: stats.champLevel,
              goldEarned: stats.goldEarned,
              items: [
                stats.item0,
                stats.item1,
                stats.item2,
                stats.item3,
                stats.item4,
                stats.item5
              ],
              trinket: stats.item6,
              damageDealt: stats.totalDamageDealtToChampions,
              wardsPlaced: stats.wardsPlaced,
              wardsKilled: stats.wardsKilled,
              winner: stats.winner
            }

            //console.log(player);
            return player;
        });

      });

      scope.won = stats.win;
      scope.gameLength = stats.timePlayed;
      scope.playedAgo = (Date.now() - game.createDate) / (1000) ;
      scope.queueType = game.subType;
      scope.fellowPlayers = game.fellowPlayers;
      scope.summonerSpells = [{ id: game.spell1 } , {id : game.spell2} ];
      scope.kda = {
        kills: stats.championsKilled, 
        deaths: stats.numDeaths,
        assists: stats.assists
      };
      scope.goldEarned = stats.goldEarned;
      
      scope.items = [
        stats.item0,
        stats.item1,
        stats.item2,
        stats.item3,
        stats.item4,
        stats.item5
      ];

      if(stats.items6 != 0){
        scope.trinket = stats.item6;
      }

      scope.items = scope.items.filter(function(item){ return item; });

      scope.champion = {
        id: game.championId,
        level: stats.level
      };

      scope.ipEarned = game.ipEarned;

      // get chamption name from api
      Champion.findOne({championId: scope.champion.id})
        .$promise
        .then(function(resource){
          scope.champion.name = resource.name;
          scope.champion.key = resource.key;
        });

      // get summoner spells
      scope.summonerSpells.forEach(function(spell){
        SummonerSpell.findOne({spellId: spell.id})
          .$promise
          .then(function(resource){
            spell.name = resource.name;
            spell.key = resource.key;
            spell.description = resource.description;
          });
      });      

      scope.toggleDetails = function(){
        if (scope.details) {
          scope.details = false;

          //show info
        } else {
          scope.details = true;
        }
      }

      scope.details = false;

      //console.log(scope);
    }
  }
}
