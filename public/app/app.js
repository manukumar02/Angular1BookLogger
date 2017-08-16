(function() {

	var app = angular.module('app', ['ngRoute', 'ngCookies']);

	app.provider('books', ['constants', function(constants) {
		var includeVersionTitle = false;
		this.setIncludeVersionTitle = function(value) {
			includeVersionTitle = value;
		}
		this.$get = function() {
			var appName = constants.APP_TITLE;
			var appDesc = constants.APP_DESCRIPTION;

			var version = constants.APP_VERSION;
			if (includeVersionTitle) {
				appName += ' ' + version;
			}
			return {
				appName: appName,
				appDesc: appDesc
			};
		};
	}]);

	app.config(['booksProvider', 'constants', 'dataServiceProvider', '$routeProvider', function(booksProvider, constants, dataServiceProvider, $routeProvider) {
		booksProvider.setIncludeVersionTitle(true);
		console.log('Title from constant service: ', constants.APP_TITLE);
		console.log(dataServiceProvider.$get);

		$routeProvider
			.when('/', {
				templateUrl: 'app/templates/books.html',
				controller: 'BooksController',
				controllerAs: 'books'
			})
			.when('/AddBook', {
				templateUrl: '/app/templates/addBook.html',
				controller: 'AddBookController',
				controllerAs: 'addBook'
			})
			.when('/EditBook/:bookId', {
				templateUrl: 'app/templates/editBook.html',
				controller: 'EditBookController',
				controllerAs: 'bookEditor',
				resolve: {
					books: function(dataService) {
						//throw 'Error while route change';
						return dataService.getAllBooks();
					}
				}
			})
			.otherwise('/');
	}]);

app.run(['$rootScope', function($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		console.log('Successfully Changed routes!!');
	});
	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
		console.log('Error changing routes!!');
		console.log('event: ', event);
		console.log('current: ', current);
		console.log('previous: ', previous);
		console.log('rejection: ', rejection);
	})
}]);
}());