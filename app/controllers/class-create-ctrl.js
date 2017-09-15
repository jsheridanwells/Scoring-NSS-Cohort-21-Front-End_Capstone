'use strict';

app.controller('classCreateCtrl', function ($scope, $location, userFactory, classFactory, studentFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//holds array of all students associated with current user
	$scope.students = [];

	//loads $scope.students array with all students associated with current user
	const getStudentList = () => {
		studentFactory.getAllStudents(userId)
			.then(students => {
				$scope.students = students;
			})
			.catch(error => console.log("error from getStudentList", error.message));
	};

	//scaffolds object to hold class data
	$scope.newClassObj = {
		className: '',
		students: [],
		uid: userId
	};

	//adds class to classes collections in FB
	$scope.addClass = () => {
		classFactory.postClass($scope.newClassObj)
			.then(data => {
				console.log("data from addClass", data);
				$location.url('/classes');
			})
			.catch(error => console.log("error from addClass", error.message));
	};

	//on click, student is added to class
	$scope.addStudent = (id) => {
		studentFactory.getSingleStudent(id)
		.then(studentData => $scope.newClassObj.students.push(studentData))
		.catch(error => console.log(error));
	};

	//loads all student information to DOM on page load
	getStudentList();

});