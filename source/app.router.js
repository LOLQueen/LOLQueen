export default router;

function router($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('landing', {
			url: '/',
			templateUrl: 'components/landing/landing.html',
		})
		.state('app', {
			url: '/app',
			templateUrl: 'shared/layout/layout.html',
		})
		.state('app.summoner', {
			url: '/summoner/:region/:summonerName',
			templateUrl: 'components/summoner/summoner.html',
		});


    $urlRouterProvider.otherwise('/');
}
