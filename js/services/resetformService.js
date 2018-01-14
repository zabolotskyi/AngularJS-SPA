app.factory("resetformService", function() {
	return {

		resetAuthors : function(scope) {
			scope.authorsForm.$setPristine();
			scope.authorsForm.$setUntouched();
			scope.inputAuthorsVal = "";
		},

		resetBooks : function(scope) {
			scope.booksForm.$setPristine();
			scope.booksForm.$setUntouched();
			scope.inputBooksVal = "";
		}
		
	};
});