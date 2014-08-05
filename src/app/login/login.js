angular.module( 'ngBoilerplate.login', [
  'ui.router',
  'plusOne',
  'ngBoilerplate.UserService'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login', bodyClass: 'bg-black', pageLogin: true }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'LoginCtrl', ['$scope', '$state', 'UserService', function LoginController( $scope, $state, UserService ) {

  if (UserService.isAuthenticated()) {
    $state.go('home');
    return;
  }

  $scope.login = function(user) {

    var loginSuccessCb = function(result) {
      UserService.set(result);
      if(user.rememberLogin) {
        localStorage.setItem('user', JSON.stringify(result));
      }
      $state.go('home');
    };
    var loginErrorCb = function(error) {
      alert(error.responseText);
    };

    UserService.login(user, loginSuccessCb, loginErrorCb);
  };
}])

;
