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

  }]);