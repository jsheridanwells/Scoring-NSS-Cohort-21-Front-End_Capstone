'use strict';
app.controller('studentListCtrl', function ($scope, userFactory, studentFactory) {

	//holds uid of current user`
	let userId = userFactory.getUserId();

	// holds array of all students associated with current user
	$scope.students = [];

	//loads information for all students associated with current user
	const showStudents = () => {
		studentFactory.getAllStudents(userId)
		.then(studentList => {
			$scope.students = studentList;
			console.log("$scope.students", $scope.students);
		})
		.catch(error => console.log("error from showStudents", error.message));
	};

	//removes students from students collection in FB
	$scope.deleteStudent = (studentId) => {
		studentFactory.deleteStudent(studentId)
			.then(() => showStudents())
			.catch(error => console.log("error from $scope.deleteStudent", error.message));
	};

	//loads all student informatino to DOM on page load
	showStudents();

});