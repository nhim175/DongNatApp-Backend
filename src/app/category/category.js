angular.module( 'ngBoilerplate.category', [
  'ui.router',
  'ngBoilerplate.directives.fileUpload',
  'ngBoilerplate.CategoryService'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'category', {
    url: '/category',
    views: {
      "content": {
        controller: 'CategoryCtrl',
        templateUrl: 'category/category.tpl.html'
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
    data:{ pageTitle: 'Category', bodyClass: 'skin-blue' }
  })
  .state( 'new-category', {
    url: '/category/new',
    views: {
      "content": {
        controller: 'NewCategoryCtrl',
        templateUrl: 'category/category.new.tpl.html'
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
    data: { pageTitle: 'New category', bodyClass: 'skin-blue' }
  })
  .state( 'edit-category', {
    url: '/category/edit/:id',
    views: {
      "content": {
        controller: 'EditCategoryCtrl',
        templateUrl: 'category/category.edit.tpl.html'
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
    data: { pageTitle: 'Edit category', bodyClass: 'skin-blue' }
  })
  ;
})

.controller( 'CategoryCtrl', ['$scope', '$state', 'UserService', 'CategoryService', 'SettingsService', function CategoryCtrl( $scope, $state, UserService, CategoryService, SettingsService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }

  $scope.API_URL = SettingsService.API_URL;

  $scope.$on('category:refresh', function() {
    $scope.categories = CategoryService.all();
    $scope.$apply();
  });

  CategoryService.fetch_all();

  $scope.toggleSelect = function() {
    _.each($scope.categories, function(category) { category.selected = $scope.selectToggle; });
  };

  $scope.$on('category:destroySuccess', function(event, data) {
    console.log('destroy success', data);
    alert('Delete successfully!');
    $scope.categories = _.filter($scope.categories, function(category) { return !category.selected; });
    $scope.$apply();
  });
  
  $scope.$on('category:destroyError', function(event, error) {
    alert('Delete failed!');
    console.log('delete failed', error);
  });

  $scope.destroy = function() {
    var deleted_categories = _.filter($scope.categories, function(category) { return category.selected; });
    var deleted_ids = _.pluck(deleted_categories, 'id');
    CategoryService.destroy(deleted_ids);
  };
}])

.controller( 'NewCategoryCtrl', ['$scope', '$state', '$stateParams', 'UserService', 'CategoryService', 'SettingsService', function NewCategoryCtrl( $scope, $state, $stateParams, UserService, CategoryService, SettingsService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }

  $scope.categories = CategoryService.all();
  $scope.API_URL = SettingsService.API_URL;

  $scope.$on('category:createSuccess', function(event, data) {
    // TODO: use modal + i18n
    $state.go('category');
  });
  $scope.$on('category:createError', function(event, error) {
    // TODO: use modal + i18n
    alert('Create failed!');
  });

  $scope.submit = function() {
    CategoryService.create($scope.category);
  };
}])

.controller( 'EditCategoryCtrl', ['$scope', '$state', '$stateParams', 'UserService', 'CategoryService', 'SettingsService', function EditCategoryCtrl( $scope, $state, $stateParams, UserService, CategoryService, SettingsService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }
  $scope.categories = CategoryService.all();
  $scope.category = CategoryService.find($stateParams.id);
  $scope.API_URL = SettingsService.API_URL;

  $scope.$on('category:saveSuccess', function(event, data) {
    // TODO: use modal + i18n
    alert('Update successfully!');
  });
  $scope.$on('category:saveError', function(event, error) {
    // TODO: use modal + i18n
    alert('Update failed!');
  });

  $scope.save = function() {
    CategoryService.update($scope.category);
  };

}])
;

