var _ = window.Lodash
var djello = angular.module('djello', ['ui.router', 'ui.bootstrap', 'Devise', 'restangular', 'ngMessages'])

djello.constant('_', _)

djello.config([
  "$httpProvider",
  function($httpProvider) {
    var token = angular.element('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .withCredentials = true;

    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
  }
]);

djello.config([
  'RestangularProvider',
  function(RestangularProvider) {
    RestangularProvider.setBaseUrl("/api/v1");
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({
      'content-type' : 'application/json'
    });
  }
]);

djello.config([
  'AuthProvider',
  function(AuthProvider) {
    // AuthProvider.loginPath('/api/v1/users/sign_in.json');
    // AuthProvider.logoutPath('/api/v1/users/sign_out.json');
    // AuthProvider.registerPath('/api/v1/users/sign_up.json');
    // AuthInterceptProvider.interceptAuth(true);

    AuthProvider.resourceName('user');
  }
]);

djello.config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    $stateProvider
      .state('main', {
        url: "/",
        abstract: true,
        views: {
          '' : {
            templateUrl: 'djello/views/index.html',
          },
          'nav' : {
            templateUrl: 'djello/views/nav.html',
            controller: 'NavCtrl'
          }
        }
      })
      .state('user', {
        parent: 'main',
        url: 'user',
        templateUrl: 'djello/views/user.html',
        controller: 'UserCtrl'
      })
      .state('boards', {
        parent: 'main',
        url: 'boards',
        abstract: true,
        template: '<ui-view/>',
        controller: 'BoardCtrl'
      })
      .state('boards.index', {
        url: '',
        templateUrl: 'djello/views/boards/index.html',
        controller: 'BoardsIndexCtrl'
      })
      .state('boards.show', {
        url: '/:id',
        templateUrl: 'djello/views/boards/show.html',
        controller: 'BoardsShowCtrl'
      })

  }
]);
