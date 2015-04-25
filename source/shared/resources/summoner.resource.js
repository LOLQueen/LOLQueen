export default class Summoner {
  constructor ($resource) {
    // Public API here
    return $resource(
      'http://localhost:9000/api/lol/:region/v1.4/summoner/by-name/:summonerName', 
      {
        region: 'na'
      }, 
      {
        'findOne': { 
          method:'GET', 
          responseType: 'json',
          transformResponse: function(data){
            var name = Object.keys(data)[0];
            return data[name];
          }
        }
      });

  }
}