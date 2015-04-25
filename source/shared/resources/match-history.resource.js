export default class MatchHistory {
  constructor ($resource, Match) {
      // Public API here
      return $resource(
        'http://localhost:9000/api/lol/:region/v1.3/game/by-summoner/:summonerId/recent', 
        {
          region: 'na'
        }, 
        {
          'find': { 
            method:'GET',
            isArray: true, 
            responseType: 'json',
            transformResponse: function(data){
              var matches = data.games;
              return matches;          
            }
          }
        });
  }
}