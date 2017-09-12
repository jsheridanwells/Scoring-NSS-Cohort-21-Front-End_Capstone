'use strict';

app.controller('classCreateCtrl', function ($scope, $location, userFactory, classFactory) {

	let userId = userFactory.getUserId();

	$scope.newClassObj = {
		className: '',
		students: [],
		uid: userId
	};

	$scope.addClass = () => {
		classFactory.postClass($scope.newClassObj)
			.then(data => {
				console.log("data from addClass", data);
				$location.url('/classes');
			})
			.catch(error => console.log("error from addClass", error.message));
	};

});