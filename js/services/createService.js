app.factory("createService", function($http, deploydService, authorsUrl) {
	return {

		authors : function(author, scope) {
			if (deploydService.checkServer()) {
				var newAuthor = author;
				newAuthor.books = [
					{ id : 0, name : "Default book", pages : 404, genre : scope.genres[0] }
				];
				$http.post(authorsUrl, newAuthor).then(function(newAuthor) {
					scope.authors.push(newAuthor.data);
					scope.refreshAuthors();
				}, scope.handleError);
			} else {
				scope.authors.push({
					id : ++scope.idCounter, surname : author.surname, name : author.name, middleName : author.middleName, birthDate : author.birthDate, books : [
						{ id : 0, name : "Best book", pages : 112, genre : scope.genres[0] },
						{ id : 1, name : "My book", pages : 434, genre : scope.genres[2] }
					]
				});
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
			scope.currentViewAuthors = "table";
			scope.$broadcast("resetForm");
		},

		books : function(book, authorId, scope) {
			if (deploydService.checkServer()) {
				for (var i = 0; i < scope.authors.length; i++) {
					if (scope.authors[i].id == authorId) {
						if (scope.authors[i].books.length == 0) {
							var prevBookId = -1;
						} else {
							var prevBookId = scope.authors[i].books[scope.authors[i].books.length - 1].id;
						}
						var bookPages = parseInt(book.pages);
						scope.authors[i].books.push({
							id : ++prevBookId,
							name : book.name,
							pages : bookPages,
							genre : book.genre
						});
						var newAuthor = scope.authors[i];
						break;
					}
				}
				$http({
					method: "PUT",
					url: authorsUrl + authorId,
					data: newAuthor
				}).then(function(newAuthor) {
					for (var i = 0; i < scope.authors.length; i++) {
						if (scope.authors[i].id == authorId) {
							scope.authors[i] = newAuthor.data;
							break;
						}
					}
					scope.refreshAuthors();
					scope.goToBooks(newAuthor.data);
				}, scope.handleError);
			} else {
				for (var i = 0; i < scope.authors.length; i++) {
					if (scope.authors[i].id == authorId) {
						if (scope.authors[i].books.length == 0) {
							var prevBookId = -1;				
						} else {
							var prevBookId = scope.authors[i].books[scope.authors[i].books.length - 1].id;
						}
						var bookPages = parseInt(book.pages);
						scope.authors[i].books.push({
							id : ++prevBookId,
							name : book.name,
							pages : bookPages,
							genre : book.genre
						});
						break;
					}
				}
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
			scope.currentViewBooks = "table";
			scope.$broadcast("resetForm");
		}
		
	};
});