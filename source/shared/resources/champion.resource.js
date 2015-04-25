export default class Champion {
  constructor ($resource) {
    // Public API here
    return $resource(
      'http://localhost:9000/api/lol/static-data/:region/v1.2/champion/:championId', 
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
