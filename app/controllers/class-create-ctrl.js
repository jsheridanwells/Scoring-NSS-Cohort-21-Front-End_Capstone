'use strict';

app.controller('classCreateCtrl', function ($scope, $location, userFactory, classFactory, studentFactory) {

	let userId = userFactory.getUserId();

	$scope.students = [];

	const getStudentList = () => {
		studentFactory.getAllStudents(userId)
			.then(students => {
				console.log("data from getStudentList", students);
				$scope.students = students;
			})
			.catch(error => console.log("error from getStudentList", error.message));
	};

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

	$scope.addStudent = (id) => {
		$scope.newClassObj.students.push(id);
		console.log("$scope.newClassObj.students", $scope.newClassObj.students);
	};

	getStudentList();

});