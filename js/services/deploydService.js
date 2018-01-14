app.provider("deploydService", function() {
	var server = false;
	return {

		serverEnabled : function(setting) {
			if (angular.isDefined(setting)) {
				server = setting;
				return this;
			} else {
				return server;
			}
		},

		$get : function() {
			return {
				checkServer : function() {
					return server ? true : false;
				}
			};
		}
		
	}
});