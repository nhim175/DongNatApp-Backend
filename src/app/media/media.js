angular.module( 'ngBoilerplate.media', [
  'ui.router',
  'ngBoilerplate.directives.fileUpload',
  'ngBoilerplate.MediaService',
  'ui.bootstrap.tpls',
  'ui.bootstrap.pagination'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'media', {
    url: '/media?page&id',
    views: {
      "content": {
        controller: 'MediaCtrl',
        templateUrl: 'media/media.tpl.html'
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
    data:{ pageTitle: 'Media', bodyClass: 'skin-blue' }
  });
})

.controller('MediaCtrl', ['$scope', '$state', '$stateParams', 'MediaService', 'UserService', 'SettingsService', function($scope, $state, $stateParams, MediaService, UserService, SettingsService) {
	if (!UserService.isAuthenticated()) {
    $state.go('login');
    return;
  }

  $scope.API_URL = SettingsService.API_URL;

  $scope.$on('media:refresh', function(event, data) {
    $scope.files = data.files;
    $scope.totalItems = data.count;

    //Pagination
    $('#pagination').twbsPagination({
      totalPages: ($scope.totalItems%$scope.limit === 0)? $scope.totalItems/$scope.limit : Math.floor($scope.totalItems/$scope.limit) + 1,
      visiblePages: 5,
      startPage: $scope.currentPage,
      href: '#/media?page={{number}}',
      onPageClick: function (event, page) {
          console.log(page);
      }
    });

    $scope.$apply();
  });

  var options = {};
  $scope.currentPage = parseInt($stateParams.page, 10) || 1;
  $scope.limit = parseInt($scope.limit, 10) || 24;

  options.limit = $scope.limit;
  options.skip = ($scope.currentPage - 1)*options.limit;

  MediaService.fetch(options);

  //Bootstrap gallery
  $('#media').on('click', function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
    link = target.src ? target.parentNode : target,
    options = {index: link, event: event},
    links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
	});
	
  //Show upload form
  $scope.showUploadForm = function() {
    $('#upload-form').modal('show');
  };

  $('#upload-form').on('hidden.bs.modal', function() {
    if ($scope.uploadedFiles.length > 0) {
      location.reload();
    }
  });

  var uploadSuccessCb = function(response) {
    $scope.uploadedFiles.push(response.file);
    $scope.$apply();
  };

  var uploadErrorCb = function(jqXHR, textStatus, errorMessage) {
    console.log(errorMessage);
  };

  $scope.uploadedFiles = [];
  $('#files-input').on('change', function (event) {
    if (event.target.files.length === 0) {
      return;
    }
    for (var i = 0, length = event.target.files.length; i < length; i++) {
      var file = event.target.files[i];
      var formData = new FormData();
      formData.append('token', UserService.get().token);
      formData.append('file', file);
      $.ajax({
        url: SettingsService.API_URL + '/file/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: uploadSuccessCb,
        error: uploadErrorCb
      });
    }
  });

}]);