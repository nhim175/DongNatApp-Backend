angular.module( 'ngBoilerplate.UserService', ['ngBoilerplate.SettingsService'])
.factory('UserService', ['SettingsService', '$rootScope', function(SettingsService, $rootScope) {
	var _user;
	var _list;

	var fetch_all = function() {
		var successCallback = function(data) {
			_list = data;
			$rootScope.$broadcast('user:refresh');
		};
		var errorCallback = function(error) {
			console.log(error.responseText);
		};
		$.get(SettingsService.API_URL + '/user').done(successCallback).fail(errorCallback);
	};

	var all = function() {
		return _list;
	};

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

	var find = function(id) {
		return _.find(_list, function(user) { return user.id == id; });
	};

	var update = function(user) {
		var successCallback = function(data) {
			$rootScope.$broadcast('user:saveSuccess', data);
		};
		var errorCallback = function(error) {
			$rootScope.$broadcast('user:saveError', error);
		};
		$.post(SettingsService.API_URL + '/user/update/' + user.id, {user: JSON.stringify(user), token: get().token}).done(successCallback).fail(errorCallback);
	};

	var create = function(user) {
		var successCallback = function(data) {
			$rootScope.$broadcast('user:createSuccess', data);
		};
		var errorCallback = function(error) {
			$rootScope.$broadcast('user:createError', error);
		};
		$.post(SettingsService.API_URL + '/user/create', user).done(successCallback).fail(errorCallback);
	};

	var destroy = function(user_ids) {
		var successCallback = function(data) {
			$rootScope.$broadcast('user:destroySuccess', data);
		};
		var errorCallback = function(error) {
			$rootScope.$broadcast('user:destroyError', error);
		};
		$.post(SettingsService.API_URL + '/user/delete', {ids: JSON.stringify(user_ids), token: get().token}).done(successCallback).fail(errorCallback);
	};

	return {
		login: login,
		logout: logout,
		set: set,
		get: get,
		isAuthenticated: isAuthenticated,
		fetch_all: fetch_all,
		all: all,
		find: find,
		update: update,
		create: create,
		destroy: destroy
	};
}]);
