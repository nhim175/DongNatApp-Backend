angular.module( 'ngBoilerplate.SettingsService', [])
.factory('SettingsService', function() {
	var API_URL = 'http://localhost:1337';

	return {
		API_URL: API_URL
	};
})
;
