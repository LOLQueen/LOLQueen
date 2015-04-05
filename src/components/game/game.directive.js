'use strict';

angular.module('lolqueen')
  .directive('lqGame', lqGame);

lqGame.$inject = ['Champion', 'SummonerSpell'];

function lqGame(Champion, SummonerSpell){
  return {
    templateUrl: 'components/game/game.html',
    scope: {
      game: '='
    },
    link: function(scope, element, attr) {
      var game = scope.game;
      var player = game.participants[0];
      scope.won = player.stats.winner;
      scope.gameLength = game.matchDuration;
      scope.playedAgo = (Date.now() - game.matchCreation) / (1000) ;
      scope.queueType = game.queueType;
      scope.summonerSpells = [{ id: player.spell1Id } , {id : player.spell2Id} ];
      scope.kda = {
        kills: player.stats.kills, 
        deaths: player.stats.deaths, 
        assists: player.stats.assists
      };
      scope.goldEarned = player.stats.goldEarned;
      
      scope.items = [
        player.stats.item0,
        player.stats.item1,
        player.stats.item2,
        player.stats.item3,
        player.stats.item4,
        player.stats.item5
      ];

      scope.champion = {
        id: player.championId,
        level: player.stats.champLevel
      };

      scope.items = scope.items.filter(function(item){ return item; });

      // get chamption name from api
      Champion.findOne({championId: scope.champion.id})
        .$promise
        .then(function(resource){
          scope.champion.name = resource.name;
        });

      // get summoner spells
      scope.summonerSpells.forEach(function(spell){
        SummonerSpell.findOne({spellId: spell.id})
          .$promise
          .then(function(resource){
            spell.name = resource.name;
            spell.description = resource.description;
          });
      });

      scope.trinket = player.stats.item6;

      scope.toggleDetails = function(){
        if (scope.details) {
          scope.details = false;

          //show info
        } else {
          scope.details = true;
        }

      }

      scope.details = false;

      console.log(scope);
    }
  }
}
