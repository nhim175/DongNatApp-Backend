// Copyright 2014 Thinh Pham

angular.module( 'ngBoilerplate.directives.fileUpload', [] )
.directive('fileUpload', ['SettingsService', 'UserService', function(SettingsService, UserService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data: '=fileId'
		},
		link: function(scope, element, attrs) {
			element.on('change', function(event) {
				var formData = new FormData();
				formData.append('token', UserService.get().token);
				formData.append('file', event.target.files[0]);
				$.ajax({
					url: SettingsService.API_URL + '/file/upload',
					type: 'POST',
					data: formData,
					processData: false,
					contentType: false,
					success: function(response) {
						scope.data = response.file.id;
						scope.$apply();
					},
					error: function(jqXHR, textStatus, errorMessage) {
						console.log(errorMessage);
					}
				});
			});
		},
		controller: function($scope) {
		},
		template: '<input type="file" ng-model="data"/>'
	};
}]);