import angular from 'angular';
import uiRouter from 'angular-ui-router'; 

import components from './components/components.module';
import router from './app.router';

export default angular.
	module('app', [
		uiRouter,
		components.name
	])
	.config(router);