'use strict';

app.controller('classListCtrl', function ($scope, userFactory, classFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	// holds array of all classes associated with current user
	$scope.classes = [];

	//loads $scope.classes array with all classes associated with current user
	const showClasses = () => {
		classFactory.getAllClasses(userId)
			.then(classList => {
				$scope.classes = classList;
			})
			.catch(error => console.log("error from showClasses", error.message));
	};

	//removes class from classes collection in FB
	$scope.deleteClass = (classId) => {
		classFactory.deleteClass(classId)
			.then(() => showClasses())
			.catch(error => console.log("error from deleteClass", error.message));
	};

	//loads list of all classes associated with current user on page load
	showClasses();

});