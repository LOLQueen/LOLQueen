'use strict';

import RecentGames from './recent-games.resource';

export default angular
    .module('shared.resources.recent-games', [])
    .service(RecentGames.name, RecentGames);