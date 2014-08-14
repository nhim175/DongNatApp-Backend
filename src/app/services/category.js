angular.module( 'ngBoilerplate.CategoryService', [
	'ngBoilerplate.SettingsService',
	'ngBoilerplate.UserService'
])
.factory('CategoryService', ['SettingsService', 'UserService', '$rootScope', function(SettingsService, UserService, $rootScope) {
	var _list;

	var fetch_all = function() {
		var successCallback = function(data) {
			_list = data;
			$rootScope.$broadcast('category:refresh');
		};
		var errorCallback = function(error) {
			console.log(error.responseText);
		};
		$.get(SettingsService.API_URL + '/category').done(successCallback).fail(errorCallback);
	};

	var all = function() {
		return _list;
	};

	var find = function(id) {
		return _.find(_list, function(item) { return item.id == id; });
	};

	var update = function(category) {
		var successCallback = function(data) {
			$rootScope.$broadcast('category:saveSuccess', data);
		};
		var errorCallback = function(error) {
			$rootScope.$broadcast('category:saveError', error);
		};
		$.post(SettingsService.API_URL + '/category/update/' + category.id, category).done(successCallback).fail(errorCallback);
	};

	var create = function(category) {
		var successCallback = function(data) {
			$rootScope.$broadcast('category:createSuccess', data);
		};
		var errorCallback = function(error) {
			$rootScope.$broadcast('category:createError', error);
		};
		category.token = UserService.get().token;
		$.post(SettingsService.API_URL + '/category/create', category).done(successCallback).fail(errorCallback);
	};

	var destroy = function(category_ids) {
		var successCallback = function(data) {
			$rootScope.$broadcast('category:destroySuccess', data);
		};
		var errorCallback = function(error) {
			$rootScope.$broadcast('category:destroyError', error);
		};
		$.post(SettingsService.API_URL + '/category/delete', {ids: JSON.stringify(category_ids), token: UserService.get().token}).done(successCallback).fail(errorCallback);
	};

	return {
		fetch_all: fetch_all,
		all: all,
		find: find,
		update: update,
		create: create,
		destroy: destroy
	};

}]);