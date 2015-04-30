export default router;

function router($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('landing', {
			url: '/',
			templateUrl: 'source/components/landing/landing.html',
		})
		.state('app', {
			url: '/app',
			templateUrl: 'source/shared/layout/layout.html',
		})
		.state('app.summoner', {
			url: '/summoner/:region/:summonerName',
			templateUrl: 'source/components/summoner/summoner.html',
		});


    $urlRouterProvider.otherwise('/');
}
