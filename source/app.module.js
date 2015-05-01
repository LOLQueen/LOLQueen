import components from './components/components.module';
import router from './app.router';

const uiRouter = { name: 'ui.router' };

export default angular.
    module('app', [
        uiRouter.name,
        components.name
    ])
    .config(router);
