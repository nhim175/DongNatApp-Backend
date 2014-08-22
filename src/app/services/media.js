angular.module( 'ngBoilerplate.MediaService', ['ngBoilerplate.SettingsService'])
.factory('MediaService', ['SettingsService', 'UserService', '$rootScope', function(SettingsService, UserService, $rootScope) {
	var _list;

	var fetch = function(options) {
		var successCallback = function(data) {
			$rootScope.$broadcast('media:refresh', data);
		};
		var errorCallback = function(error) {
			console.log(error.responseText);
		};
		$.get(SettingsService.API_URL + '/file', { options: JSON.stringify(options), token: UserService.get().token }).done(successCallback).fail(errorCallback);
	};

	return {
		fetch: fetch
	};
}]);