(function(){
	angular.module('app').factory('dataService', ['$q', '$timeout', 'logger','$http','constants', dataService]);

	function dataService($q, $timeout, logger, $http, constants){
		return {
			getAllBooks: getAllBooks,
			getAllReaders: getAllReaders
		};

		function getAllBooks() {
			logger.output('Get All Books!');
			return $http({
				method: 'GET',
				url: 'api/books',
				headers: {
					'MS-BookLogger-Version': constants.APP_VERSION
				}
			})
			.then(sendResponseData)
			.catch(sendGetBooksError);					
		}
		function sendResponseData(response) {
			return response.data;
		}
		function sendGetBooksError(response) {
			$q.reject('Error retrieving book(s). (HTTP status: ' +response.status +')');
		}
 
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