export default class MatchHistory {
  constructor ($resource) {
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

  }
}