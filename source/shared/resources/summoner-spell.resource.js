export default class SummonerSpell{
  constructor ($resource) {
    // Public API here
    return $resource(
      'http://localhost:9000/api/lol/static-data/:region/v1.2/summoner-spell/:spellId', 
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