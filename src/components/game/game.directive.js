'use strict';

angular.module('lolqueen')
  .directive('lqGame', lqGame);

lqGame.$inject = ['Champion', 'SummonerSpell', 'Match'];

function lqGame(Champion, SummonerSpell, Match){
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

        //console.log(data);

        scope.participants = data.participants.map(function(player){
            var id = player.participantId;

            data.participantIdentities.forEach(function(summoner){
              if(summoner.participantId == id){
                player.summonerInfo = summoner.player;
              }              
            });

            console.log(player);
          });

        return resource;

      });

      scope.won = stats.win;
      scope.gameLength = stats.timePlayed;
      scope.playedAgo = (Date.now() - game.createDate) / (1000) ;
      scope.queueType = game.subType;
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

      scope.items = scope.items.filter(function(item){ return item; });

      scope.trinket = stats.item6;

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
