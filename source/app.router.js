export default router;

function router($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('landing', {
			url: '/',
			templateUrl: 'app/landing/landing.html',
			controller: 'LandingCtrl'
		})
		.state('summoner', {
			url: '/summoner/:region/:summonerName',
			templateUrl: 'app/summoner/summoner.html',
			controller: 'SummonerCtrl'
		});

	$urlRouterProvider.otherwise('/');
}