'use strict';
app.controller('studentCreateCtrl', function ($scope, $location, userFactory, studentFactory) {

	let userId = userFactory.getUserId();

	$scope.newStudentObj = {
		name: '',
		uid: userId
	};

	$scope.addStudent = () => {
		studentFactory.postStudent($scope.newStudentObj)
		.then((data => {
			console.log("data from addStudent", data);
			$location.url('/students');
		}))
		.catch(error => console.log("error from addStudent", error.message));
	};

});