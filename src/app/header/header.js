angular.module( 'ngBoilerplate')
/**
 * And of course we define a controller for our route.
 */
.controller( 'HeaderCtrl', ['$scope', '$state', 'UserService', function HeaderCtrl( $scope, $state, UserService ) {
  $scope.user = UserService.get();

  $scope.$on('user:update', function() {
    $scope.user = UserService.get();
  });

  $scope.moment = moment;

  $scope.logout = function() {
    UserService.logout();
    localStorage.clear();
    $state.go('login');
  };
}])

;
