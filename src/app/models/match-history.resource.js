'use strict';

// This pretty much returns the MatchHistory for a particular 'summoner'
// From here on we grab the "matchID" and ask the 'match' endpoint for the game data

angular.module('lolqueen')
  .factory('MatchHistory', ['$resource', 'Match', function ($resource, Match) {
    // Public API here
    return $resource(
      'http://localhost:9000/api/lol/:region/v2.2/matchhistory/:summonerId', 
      {
        region: 'na'
      }, 
      {
        'find': { 
          method:'GET',
          isArray: true, 
          responseType: 'json',
          transformResponse: function(data){
            var matches = data.matches;

            matches = matches.map(function(match){
              var id = match.matchId;

              Match.findOne({matchId: id})
                .$promise
                .then(function(resource){
                  match.data = resource;
                });

              return match;

            });

            return matches;          
          }
        }
      });

  }]);
