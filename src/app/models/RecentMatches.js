'use strict';

angular.module('lolqueen')
  .factory('RecentMatches', ['$resource', function ($resource) {
    // Public API here
    return $resource(
      'https://na.api.pvp.net/api/lol/:region/v1.3/game/by-summoner/:summonerId/recent', 
      {
        region: 'na',
        api_key: 'c5f32ab5-fc57-4e59-84d4-ce7a53885038'
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
