app.factory("sortService", function() {
	return {

		sortBy : function(propertyName, scope) {
			scope.reverse = (scope.propertyName == propertyName) ? !scope.reverse : false;
			scope.propertyName = propertyName;
		},

		unsort : function(scope) {
			scope.propertyName = null;
			scope.reverse = false;
		}
		
	};
});