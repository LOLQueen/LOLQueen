'use strict';

export default ddragonImg;

function ddragonImg(){
    const baseUrl = 'http://localhost:9000';
    return {
        scope: {
            type: '@',
            name: '@'
        },
        template: '<img ng-src="{{src}}" alt="{{name}}">',
        link: function(scope, element, attr) {
            
            scope.$watch('name', setImageSource);

            function setImageSource() {
                if (scope.type.match(/profile(-|\s)?icon/i)) {
                    scope.src = `${baseUrl}/assets/dragon/img/profileicon/${scope.name}.png`;
                }

                else if(scope.type.match(/summoner(-|\s)?spell/i)) {
                    scope.src = `${baseUrl}/assets/dragon/img/spell/${scope.name}.png`;
                }

                else if(scope.type.match(/champion/i)) {
                    scope.src = `${baseUrl}/assets/dragon/img/champion/${scope.name}.png`;
                }

                else if(scope.type.match(/item/i)) {
                    scope.src = `${baseUrl}/assets/dragon/img/item/${scope.name}.png`;
                }
            }
            
        }
    };  
}