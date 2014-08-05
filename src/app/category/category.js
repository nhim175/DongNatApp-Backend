angular.module( 'ngBoilerplate.category', [
  'ui.router'
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
  ;
})

.controller( 'CategoryCtrl', ['$scope', '$state', 'UserService', function CategoryCtrl( $scope, $state, UserService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }
}])

.controller( 'NewCategoryCtrl', ['$scope', '$state', 'UserService', function NewCategoryCtrl( $scope, $state, UserService ) {
  if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }
}])
;

