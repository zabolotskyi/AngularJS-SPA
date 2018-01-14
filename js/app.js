var app = angular.module("spa", ["ngRoute"])
.constant("authorsUrl", "http://localhost:2403/authors/");

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/authors", {
		templateUrl : "pages/authors.html",
	})
	.when("/books", {
		templateUrl : "pages/books.html",
	})
	.otherwise({
		redirectTo : "/authors",
	});
});

app.config(function(deploydServiceProvider) {
	deploydServiceProvider.serverEnabled(false);
});

app.controller("ctrl", function($scope, $timeout, $http, authorsUrl, refreshService, addService, deleteService, saveService, updateService, createService, cancelService, findService, errorService, gotoService, sortService, deploydService) {

	$scope.currentViewAuthors = "table";
	$scope.currentViewBooks = "table";

	$scope.serverUI = deploydService.checkServer();

	$scope.genres = ["comedy", "drama", "horror fiction", "fantasy"];

	$scope.authors = localStorage.authors ? JSON.parse(localStorage.getItem("authors")) : [
		{ id : 0, surname : "Doe", name : "John", middleName : "Mid", birthDate : new Date(1962, 6, 7), books : [
		{ id : 0, name : "Best book", pages : 112, genre : $scope.genres[0] },
		{ id : 1, name : "My book", pages : 434, genre : $scope.genres[2] }
	] } ];

	$scope.idCounter = (localStorage.authors && localStorage.authors.length > 2) ? JSON.parse(localStorage.getItem("authors"))[JSON.parse(localStorage.getItem("authors")).length - 1].id : -1;

	$scope.propertyName = null;

	$scope.reverse = true;

	$scope.sortBy = function(propertyName) {
		sortService.sortBy(propertyName, $scope);
	}

	$scope.unsort = function() {
		sortService.unsort($scope);
	}

	$scope.unsort();

	$scope.handleError = function(error) {
		console.log(error.status);
	}

	$scope.getError = function(error) {
		var err = errorService.findError(error);
		return err;
	}

	$scope.goToBooks = function(author) {
		gotoService.authors(author, $scope);
	}

	$scope.goToAuthors = function() {
		gotoService.books();
	}

	$scope.refreshAuthors = function() {
		refreshService.authors($scope);
	}

	$scope.addAuthor = function(author) {
		addService.authors(author, $scope);
	}

	$scope.deleteAuthor = function(author) {
		deleteService.authors(author, $scope);
	}

	$scope.saveAuthor = function(author) {
		saveService.authors(author, $scope);
	}

	$scope.updateAuthor = function(author) {
		updateService.authors(author, $scope);
	}

	$scope.createAuthor = function(author) {
		createService.authors(author, $scope);
	}

	$scope.cancelAuthor = function() {
		cancelService.authors($scope);
	}

	$scope.refreshBooks = function(authorId) {
		refreshService.books(authorId, $scope);
		getBooks(authorId);
	}

	$scope.addBook = function(book) {
		addService.books(book, $scope);
	}

	$scope.deleteBook = function(book, authorId) {
		deleteService.books(book, authorId, $scope);
		getBooks(authorId);
	}

	$scope.saveBook = function(book, authorId) {
		saveService.books(book, authorId, $scope);
	}

	$scope.updateBook = function(book, authorId) {
		updateService.books(book, authorId, $scope);		
		getBooks(authorId);
	}

	$scope.createBook = function(book, authorId) {
		createService.books(book, authorId, $scope);		
		getBooks(authorId);
	}

	$scope.cancelBook = function() {
		cancelService.books($scope);
	}

	$scope.findBook = function(authorId) {
		getBooks(authorId);
		findService.findBook(authorId, $scope);
	}

	function getBooks(authorId) {
		findService.getBooks(authorId, $scope);
	}

	$scope.goBack = function() {
		findService.goBack();
	}

	if (deploydService.checkServer()) {
		$scope.refreshAuthors();
	}

});

app.controller("authorsFormCtrl", function($scope, resetformService) {

	$scope.$on("resetForm", function() {
		resetformService.resetAuthors($scope);		
	});

});

app.controller("booksFormCtrl", function($scope, resetformService) {

	$scope.$on("resetForm", function() {
		resetformService.resetBooks($scope);	
	});

});