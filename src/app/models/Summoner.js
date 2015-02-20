'use strict';

/**
 * @ngdoc service
 * @name lolqueenApp.Summoner
 * @description
 * # Summoner
 * Factory in the lolqueenApp.
 */
angular.module('lolqueen')
  .factory('Summoner', ['$resource', function ($resource) {
    // Public API here
    return $resource(
      'https://na.api.pvp.net/api/lol/:region/v1.4/summoner/by-name/:summonerName', 
      {
        region: 'na',
        api_key: 'c5f32ab5-fc57-4e59-84d4-ce7a53885038'
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

  }]);