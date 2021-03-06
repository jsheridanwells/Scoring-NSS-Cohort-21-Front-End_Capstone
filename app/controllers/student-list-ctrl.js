'use strict';
app.controller('studentListCtrl', function ($scope, userFactory, studentFactory, layout, $location) {

	//holds uid of current user`
	let userId = userFactory.getUserId();

	// holds array of all students associated with current user
	$scope.students = [];

	//holds data for creating three columns for lists
	$scope.columns = [];

	//loads information for all students associated with current user
	const showStudents = () => {
		studentFactory.getAllStudents(userId)
		.then(studentList => {
			$scope.students = studentList;
			$scope.columns = layout.createColumns($scope.students, 3);
		})
		.catch(error => console.log("error from showStudents", error.message));
	};

	//removes students from students collection in FB
	$scope.deleteStudent = (studentId) => {
		studentFactory.deleteStudent(studentId)
			.then(() => showStudents())
			.catch(error => console.log("error from $scope.deleteStudent", error.message));
	};

	//captures id of student to edit, changes window location to edit form
	$scope.editStudent = (studentId) => {
		$location.url('/student-edit/' + studentId);
	};

	//loads all student informatino to DOM on page load
	showStudents();

});