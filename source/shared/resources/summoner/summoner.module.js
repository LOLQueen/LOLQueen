'use strict';

import Summoner from './summoner.resource';

export default angular
    .module('components.resources.summoner', [])
    .service(Summoner.name, Summoner);