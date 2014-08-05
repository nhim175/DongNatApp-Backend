angular.module( 'ngBoilerplate')
/**
 * And of course we define a controller for our route.
 */
.controller( 'SidebarCtrl', ['$scope', '$state', 'UserService', function SidebarCtrl( $scope, $state, UserService ) {
  $scope.user = UserService.get();

  $scope.$on('user:update', function() {
    $scope.user = UserService.get();
  });

}])

;
