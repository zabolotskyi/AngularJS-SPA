app.factory("deleteService", function($http, deploydService, authorsUrl) {
	return {

		authors : function(author, scope) {
			if (deploydService.checkServer()) {
				$http({
		            method: "DELETE",
		            url: authorsUrl + author.id
		        }).then(function () {
		            scope.authors.splice(scope.authors.indexOf(author), 1);
		        }, scope.handleError);
			} else {
				scope.authors.splice(scope.authors.indexOf(author), 1);
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
		},

		books : function(book, authorId, scope) {
			if (deploydService.checkServer()) {
				for (var i = 0; i < scope.authors.length; i++) {
					if (scope.authors[i].id == authorId) {
						var author = angular.copy(scope.authors[i]);
						delete author.books;
						author.books = [];
						for (var j = 0; j < scope.authors[i].books.length; j++) {
							if (scope.authors[i].books[j].id != book.id) {
								author.books.push(scope.authors[i].books[j]);
							}
						}
					}
				}
				$http({
		            method: "PUT",
		            url: authorsUrl + authorId,
		            data : author
		        }).then(function (author) {
		        	for (var i = 0; i < scope.authors.length; i++) {
		        		if (scope.authors[i].id == author.id) {
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
						scope.authors[i].books.splice(scope.authors[i].books.indexOf(book), 1);
					}
				}
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
			scope.goBack();
		}
		
	};
});