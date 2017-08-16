(function() {

	angular.module('app').controller('BooksController', ['books', 'dataService', 'logger', 'badgeService', '$cookies', '$cookieStore',BooksController]);

	function BooksController(books, dataService, logger, badgeService, $cookies, $cookieStore) {
		var vm = this;
		vm.appName = books.appName;
		vm.appDesc = books.appDesc;
		vm.showAlert = books.showAlert;
		dataService.getAllBooks()
		.then(getBooksSuccess, null, getBooksNotification)
		.catch(errorCallback)
		.finally(getAllBooksComplete)
		
		dataService.getAllReaders()
		.then(getReadersSuccess)
		.catch(errorCallback)
		.finally(getAllReadersComplete);

		vm.getBadge = badgeService.retrieveBadge;

		logger.output('BooksController has been Created!');

		function getBooksSuccess(data) {
			//throw 'Error in success handler';
			vm.allBooks = data;
		};
		// function getBooksError(reason) {
		// 	console.log(reason);
		// };
		function getAllBooksComplete(){
			console.log('getAllBooks has completed');
		};
		function errorCallback(errMsg){
			console.log('Error Message: '+ errMsg)
		};
		function getBooksNotification(notification) {
			console.log('Promise Notification: ' + notification);
		};
		function getReadersSuccess(data) {
			vm.allReaders = data
		};
		function getAllReadersComplete(){
			console.log('getAllReaders has completed');
		};

		vm.favoriteBook = $cookies.favoriteBook;
		vm.lastEdited = $cookieStore.get('lastEdited');
	}	
}());
