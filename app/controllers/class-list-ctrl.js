'use strict';

app.controller('classListCtrl', function ($scope, userFactory, classFactory) {

	let userId = userFactory.getUserId();

	$scope.classes = [];

	const showClasses = () => {
		classFactory.getAllClasses(userId)
			.then(classList => {
				$scope.classes = classList;
			})
			.catch(error => console.log("error from showClasses", error.message));
	};

	$scope.deleteClass = (classId) => {
		classFactory.deleteClass(classId)
			.then(() => showClasses())
			.catch(error => console.log("error from deleteClass", error.message));
	};

	showClasses();

});