(function() {

	var app = angular.module('app', []);

	app.provider('books', function() {
		this.$get = function() {
			var appName = 'Book Logger';
			var appDesc = 'Track which book you read!.';

			var version =1.0;
			if(includeVersionTitle) {
				appName += ' ' + version;
			}

			return {
				appName: appName,
				appDesc: appDesc
			};
		};

		var includeVersionTitle = false;
		this.setIncludeVersionTitle = function(value) {
			includeVersionTitle = value;
		} 
	});

	app.config(function(booksProvider) {
		booksProvide.setIncludeVersionTitle(true);
	})
}());