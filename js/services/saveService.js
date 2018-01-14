app.factory("saveService", function() {
	return {

		authors : function(author, scope) {
			if (angular.isDefined(author.id)) {
				scope.updateAuthor(author);
			} else {
				scope.createAuthor(author);
			}
		},

		books : function(book, authorId, scope) {
			if (angular.isDefined(book.id)) {
				scope.updateBook(book, authorId);
			} else {
				scope.createBook(book, authorId);
			}
		}
		
	};
});