'use strict';

// This pretty much returns the MatchHistory for a particular 'summoner'
// From here on we grab the "matchID" and ask the 'match' endpoint for the game data

angular.module('lolqueen')
  .factory('Match', ['$resource', function ($resource) {
    // Public API here
    return $resource(
      'http://localhost:9000/api/lol/:region/v2.2/match/:matchId', 
      {
        region: 'na'
      }, 
      {
        'findOne': { 
          method:'GET',
          isArray: false, 
          responseType: 'json',
          transformResponse: function(data){
            return data;
          }
        }
      });

  }]);
