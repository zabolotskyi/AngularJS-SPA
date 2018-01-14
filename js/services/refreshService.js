app.factory("refreshService", function($http, deploydService, authorsUrl) {
	return {

		authors : function(scope) {
			if (deploydService.checkServer()) {
				$http.get(authorsUrl).then(function(response) {
					scope.authors = response.data;
				}, scope.handleError);
			} else {
				scope.authors =  [
					{ id : 0, surname : "Doe", name : "John", middleName : "Mid", birthDate : new Date(1962, 6, 7), books : [
					{ id : 0, name : "Best book", pages : 112, genre : scope.genres[0] },
					{ id : 1, name : "My book", pages : 434, genre : scope.genres[2] }
				] } ];
				scope.idCounter = 0;
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
		}, 

		books : function(authorId, scope) {
			if (deploydService.checkServer()) {
				$http.get(authorsUrl).then(function(response) {
					scope.authors = response.data;
					for (var i = 0; i < scope.authors.length; i++) {
						if (scope.authors[i].id == authorId) {
							scope.goToBooks(scope.authors[i]);
							break;
						}
					}
				}, scope.handleError);
			} else {
				for (var i = 0; i < scope.authors.length; i++) {
					if (scope.authors[i].id == authorId) {
						scope.authors[i].books = [
							{ id : 0, name : "Best book", pages : 112, genre : scope.genres[0] },
							{ id : 1, name : "My book", pages : 434, genre : scope.genres[2] }
						];
						break;
					}
				}
				localStorage.setItem("authors", JSON.stringify(scope.authors));
			}
			scope.goBack();
		}
		
	};	
});