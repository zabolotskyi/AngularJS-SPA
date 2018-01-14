app.factory("errorService", function() {
	return {
		findError : function(error) {
			if (angular.isDefined(error)) {
				if (error.required) {
					return "Input field should not be blank!";
				} else if (error.pattern) {
					return "Please enter valid input data.";
				}
			}
		}
	};
});