angular.module( 'ngBoilerplate.UserService', ['ngBoilerplate.SettingsService'])
.factory('UserService', ['SettingsService', '$rootScope', function(SettingsService, $rootScope) {
	var _user;

	var login = function(user, successCallback, errorCallback) {
		$.post(SettingsService.API_URL + '/user/api_login', user).done(successCallback).fail(errorCallback);
	};

	var logout = function() {
		_user = null;
	};

	var set = function(user) {
		_user = user;
		$rootScope.$broadcast('user:update');
	};

	var get = function() {
		return _user;
	};

	var isAuthenticated = function() {
		var user = localStorage.getItem('user');
		if (user) {
			set(JSON.parse(user));
		}
		return !!_user;
	};

	return {
		login: login,
		logout: logout,
		set: set,
		get: get,
		isAuthenticated: isAuthenticated
	};
}]);
