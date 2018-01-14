app.factory("updateService", function($http, deploydService, authorsUrl) {
	return {

		authors : function(author, scope) {
			if (deploydService.checkServer()) {
				$http({
					method: "PUT",
					url: authorsUrl + author.id,
					data: author
				}).then(function(author) {
					for (var i = 0; i < scope.authors.length; i++) {
						if (scope.authors[i].id == author.id) {
							scope.authors[i] = author;
							break;
						}
					}
					scope.refreshAuthors();
				}, scope.handleError);
			} else {
				for (var i = 0; i < scope.authors.length; i++) {
					if (scope.authors[i].id == author.id) {
						scope.authors[i] = author;
						break;
					}
				}
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
			scope.currentViewAuthors = "table";
			scope.$broadcast("resetForm");
		},

		books : function(book, authorId, scope) {
			if (deploydService.checkServer()) {
				for (var i = 0; i < scope.authors.length; i++) {
					if (scope.authors[i].id == authorId) {
						for (var j = 0; j < scope.authors[i].books.length; j++) {
							if (scope.authors[i].books[j].id == book.id) {
								var bookPages = parseInt(book.pages);
								book.pages = bookPages;
								scope.authors[i].books[j] = book;
								var author = scope.authors[i];
								break;
							}
						}
					}
				}
				$http({
					method: "PUT",
					url: authorsUrl + author.id,
					data: author
				}).then(function(author) {
					for (var i = 0; i < scope.authors.length; i++) {
						if (scope.authors[i].id == authorId) {
							scope.authors[i] = author.data;
							break;
						}
					}
					scope.refreshAuthors();
					scope.goToBooks(author.data);
				}, scope.handleError);
			} else {
				for (var i = 0; i < scope.authors.length; i++) {
					if (scope.authors[i].id == authorId) {
						for (var j = 0; j < scope.authors[i].books.length; j++) {
							if (scope.authors[i].books[j].id == book.id) {
								var bookPages = parseInt(book.pages);
								book.pages = bookPages;
								scope.authors[i].books[j] = book;
								break;
							}
						}
					}
				}
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
			scope.currentViewBooks = "table";
			scope.$broadcast("resetForm");
		}
		
	};
});