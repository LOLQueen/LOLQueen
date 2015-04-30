export default router;

function router($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: 'source/components/landing/landing.html'
        })
        .state('summoner', {
            url: '/summoner/:region/:summonerName',
            templateUrl: 'source/components/summoner/summoner.html'
        });

    $urlRouterProvider.otherwise('/');
}
