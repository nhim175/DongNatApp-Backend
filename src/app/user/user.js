angular.module( 'ngBoilerplate.user', [
  'ui.router',
  'ngBoilerplate.directives.fileUpload',
  'ngBoilerplate.CategoryService'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'user', {
    url: '/user',
    views: {
      "content": {
        controller: 'UserCtrl',
        templateUrl: 'user/user.tpl.html'
      },
      "header": {
        controller: 'HeaderCtrl',
        templateUrl: 'header/header.tpl.html'
      },
      "left": {
        controller: 'SidebarCtrl',
        templateUrl: 'sidebar/sidebar.tpl.html'
      }
    },
    data:{ pageTitle: 'User', bodyClass: 'skin-blue' }
  })
  .state( 'new-user', {
    url: '/user/new',
    views: {
      "content": {
        controller: 'NewUserCtrl',
        templateUrl: 'user/user.new.tpl.html'
      },
      "header": {
        controller: 'HeaderCtrl',
        templateUrl: 'header/header.tpl.html'
      },
      "left": {
        controller: 'SidebarCtrl',
        templateUrl: 'sidebar/sidebar.tpl.html'
      }
    },
    data: { pageTitle: 'New user', bodyClass: 'skin-blue' }
  })
  .state( 'edit-user', {
    url: '/user/edit/:id',
    views: {
      "content": {
        controller: 'EditUserCtrl',
        templateUrl: 'user/user.edit.tpl.html'
      },
      "header": {
        controller: 'HeaderCtrl',
        templateUrl: 'header/header.tpl.html'
      },
      "left": {
        controller: 'SidebarCtrl',
        templateUrl: 'sidebar/sidebar.tpl.html'
      }
    },
    data: { pageTitle: 'Edit user', bodyClass: 'skin-blue' }
  })
  ;
})

.controller( 'UserCtrl', ['$scope', '$state', 'UserService', 'CategoryService', 'SettingsService', function UserCtrl( $scope, $state, UserService, CategoryService, SettingsService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }

  $scope.API_URL = SettingsService.API_URL;

  $scope.$on('user:refresh', function() {
    $scope.users = UserService.all();
    $scope.$apply();
  });

  UserService.fetch_all();

  $scope.toggleSelect = function() {
    _.each($scope.users, function(user) { user.selected = $scope.selectToggle; });
  };

  $scope.$on('user:destroySuccess', function(event, data) {
    console.log('destroy success', data);
    alert('Delete successfully!');
    $scope.users = _.filter($scope.users, function(user) { return !user.selected; });
    $scope.$apply();
  });
  
  $scope.$on('user:destroyError', function(event, error) {
    alert('Delete failed!');
    console.log('delete failed', error);
  });

  $scope.destroy = function() {
    var deleted_users = _.filter($scope.users, function(user) { return user.selected; });
    var deleted_ids = _.pluck(deleted_users, 'id');
    UserService.destroy(deleted_ids);
  };
}])

.controller( 'NewUserCtrl', ['$scope', '$state', '$stateParams', 'UserService', 'SettingsService', function NewUserCtrl( $scope, $state, $stateParams, UserService, SettingsService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }

  $scope.API_URL = SettingsService.API_URL;

  $scope.$on('user:createSuccess', function(event, data) {
    // TODO: use modal + i18n
    $state.go('user');
  });
  $scope.$on('user:createError', function(event, error) {
    // TODO: use modal + i18n
    alert('Create failed!');
  });

  $scope.submit = function() {
    UserService.create($scope.user);
  };
}])

.controller( 'EditUserCtrl', ['$scope', '$state', '$stateParams', 'UserService', 'SettingsService', function EditUserCtrl( $scope, $state, $stateParams, UserService, SettingsService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }
  $scope.user = UserService.find($stateParams.id);
  $scope.API_URL = SettingsService.API_URL;

  $scope.$on('user:saveSuccess', function(event, data) {
    // TODO: use modal + i18n
    alert('Update successfully!');
  });
  $scope.$on('user:saveError', function(event, error) {
    // TODO: use modal + i18n
    alert('Update failed!');
  });

  $scope.save = function() {
    UserService.update($scope.user);
  };

}])
;

