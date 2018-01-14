app.factory("cancelService", function() {
	return {

		authors : function(scope) {
			scope.currentAuthor = {};
			scope.currentViewAuthors = "table";
			scope.$broadcast("resetForm");
		},

		books : function(scope) {
			scope.currentBook = {};
			scope.currentViewBooks = "table";
			scope.$broadcast("resetForm");
		}
		
	};
});