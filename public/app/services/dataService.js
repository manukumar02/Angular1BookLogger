(function(){
	angular.module('app').factory('dataService', ['$q', '$timeout', 'logger', dataService]);

	function dataService($q, $timeout, logger){
		return {
			getAllBooks: getAllBooks,
			getAllReaders: getAllReaders
		};

		function getAllBooks() {
			logger.output('Get All Books!');
			var booksArray = [
				{
					book_id: 1,
					title: 'Harry Porter and the Deathly HAllows',
					author: 'J.K Rowling',
					year_published: 2000
				},
				{
					book_id: 2,
					title: 'The cat in the Hat',
					author: 'Dr. Seuss',
					year_published: 1957
				},
				{
					book_id: 3,
					title: 'Encyclopedia Brown, Boy detective',
					author: 'Donald J.Sobal',
					year_published: 1963
				}
			];

			var deferred = $q.defer();
			$timeout(function(){
				var successfull = true;
				if(successfull) {
					deferred.notify('Just getting started gathering books...');
					deferred.notify('Almost done gathering books...');
					deferred.resolve(booksArray);					
				} else {
					deferred.reject('Error retrieving books.');
				}
			}, 1000);

			return deferred.promise;
		};

		function getAllReaders() {
			logger.output('Get All Readers!');
			var readersArray = [
				{
					reader_id: 1,
					name: 'Marie',
					weeklyReadingGoal: 315,
					totalMinutesRead: 4600
				},
				{
					reader_id: 2,
					name: 'Manu',
					weeklyReadingGoal: 415,
					totalMinutesRead: 6000
				},
				{
					reader_id: 1,
					name: 'Lanier',
					weeklyReadingGoal: 140,
					totalMinutesRead: 600
				}
			];

			var deferred = $q.defer();
			$timeout(function(){
				deferred.resolve(readersArray);
			}, 1500)
		
			return deferred.promise;
		}
	}
}())