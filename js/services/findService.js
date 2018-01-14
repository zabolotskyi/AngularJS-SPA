app.factory("findService", function() {
	return {

		findBook : function(authorId, scope) {
			$("#findBook").addClass("hidden");
			$("#tags").parent().removeClass("hidden");
			$("#tags").autocomplete({
				source: scope.booksNames
			});
			$("#tags").on("autocompleteselect", function(event, ui) {
				$("td:contains('" + ui.item.value + "')").css({ "font-weight" : "bold", "color" : "red" });
				$("#paragraph").text("Selected books are highlighted in the table.");
			});
		},

		getBooks : function(authorId, scope) {
			scope.booksNames = [];
			for (var i = 0; i < scope.authors.length; i++) {
				if (scope.authors[i].id == authorId) {
					for (var j = 0; j < scope.authors[i].books.length; j++) {
						scope.booksNames.push(scope.authors[i].books[j].name);
					}
					break;
				}
			}
		},

		goBack : function() {
			$("#findBook").removeClass("hidden");
			$("td").css({ "font-weight" : "normal", "color" : "black" });
			$("#paragraph").text("");
			$("#tags").val("").parent().addClass("hidden");
		}
		
	};
});