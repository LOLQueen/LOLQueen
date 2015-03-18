'use strict';

angular.module('lolqueen')
  .factory('RecentMatches', ['$resource', function ($resource) {
    // Public API here
    return $resource(
      'http://localhost:9000/api/lol/:region/v1.3/game/by-summoner/:summonerId/recent', 
      {
        region: 'na'
      }, 
      {
        'find': { 
          method:'GET',
          isArray: false, 
          responseType: 'json',
          transformResponse: function(data){
            //var name = Object.keys(data)[0];
            //return data[name];
            return data;
          }
        }
      });

  }]);
