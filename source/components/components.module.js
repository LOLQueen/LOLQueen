'use strict';

import landing from './landing/landing.module';
import summoner from './summoner/summoner.module';
import shared from '../shared/shared.module';
import application from './application/application.module';

export default angular.
    module('components', [
        landing.name,
        summoner.name,
        shared.name,
        application.name
    ]);