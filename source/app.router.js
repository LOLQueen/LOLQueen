export default router;

function router($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: 'components/landing/landing.html',
        })
        .state('application', {
            url: '/app',
            templateUrl: 'components/application/application.html',
        })
        .state('application.summoner', {
            url: '/summoner/:region/:summonerName',
            templateUrl: 'components/summoner/summoner.html',
        });


    $urlRouterProvider.otherwise('/');
}
