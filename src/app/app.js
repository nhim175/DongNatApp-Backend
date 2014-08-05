angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.login',
  'ngBoilerplate.category',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $httpProvider ) {
  $httpProvider.defaults.useXDomain = true;
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle;
    }

    if ( angular.isDefined( toState.data.bodyClass ) ) {
      $scope.bodyClass = toState.data.bodyClass;
    }

    if ( angular.isDefined( toState.data.pageLogin ) ) {
      $scope.pageLogin = toState.data.pageLogin;
    } else {
      $scope.pageLogin = false;
    }

  });
})

;

