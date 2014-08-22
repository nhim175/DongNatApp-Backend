angular.module( 'ngBoilerplate.SettingsService', [])
.factory('SettingsService', function() {
	var API_URL = 'http://192.168.3.5:1337';

	return {
		API_URL: API_URL
	};
})
;
