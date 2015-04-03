'use strict';

angular.module('lolqueen')
  .directive('lqGame', lqGame);

lqGame.$inject = [];

function lqGame(){
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
      scope.playedAgo = (Date.now() - game.matchCreation) / 1000;
      scope.queueType = game.queueType;
      scope.summonerSpells = [player.spell1Id, player.spell2Id];
      scope.championId = player.championId;
      scope.kda = {kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists};
      scope.champLevel = player.stats.champLevel;
      scope.goldEarned = player.stats.goldEarned;
      scope.items = [
        player.stats.item0,
        player.stats.item1,
        player.stats.item2,
        player.stats.item3,
        player.stats.item4,
        player.stats.item5
      ];

      console.log(scope);
    }
  }
}
