app.factory("gotoService", function($timeout) {
	return {

		authors : function(author, scope) {
			$timeout(function() {
				$("#toBooks").click();
			}, 0, false);
			scope.author = author;
		},

		books : function() {
			$timeout(function() {
				$("#toAuthors").click();
			}, 0, false);
		}
		
	};
});