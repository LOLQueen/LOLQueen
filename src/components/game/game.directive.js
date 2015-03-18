'use strict';

angular.module('lolqueen')
  .directive('lqGame', lqGame);

lqGame.$inject = [];

function lqGame(){
  return {
    templateUrl: 'components/game/game.html',
    scope: {
      game: '='
    }
  }
}
