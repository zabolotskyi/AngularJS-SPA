app.factory("addService", function() {
	return {

		authors : function(author, scope) {
			scope.currentAuthor = author ? angular.copy(author) : {};
			scope.currentViewAuthors = "add";
			$("#datepicker").datepicker();
		}, 
		
		books : function(book, scope) {
			scope.currentBook = book ? angular.copy(book) : {};
			scope.currentViewBooks = "add";
			scope.goBack();
		}

	};
});