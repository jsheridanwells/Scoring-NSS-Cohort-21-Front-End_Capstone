'use strict';
app.controller('studentListCtrl', function ($scope, userFactory, studentFactory) {

	let userId = userFactory.getUserId();

	$scope.students = [];

	const showStudents = () => {
		studentFactory.getAllStudents(userId)
		.then(studentList => {
			$scope.students = studentList;
			console.log("$scope.students", $scope.students);
		})
		.catch(error => console.log("error from showStudents", error.message));
	};

	$scope.deleteStudent = (studentId) => {
		studentFactory.deleteStudent(studentId)
			.then(() => showStudents())
			.catch(error => console.log("error from $scope.deleteStudent", error.message));
	};

	showStudents();

});