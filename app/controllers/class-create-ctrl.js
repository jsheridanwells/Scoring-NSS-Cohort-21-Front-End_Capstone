'use strict';

app.controller('classCreateCtrl', function ($scope, $location, userFactory, classFactory, studentFactory, layout) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//holds array of all students associated with current user
	$scope.students = [];

	//holds array of students selected to add to new class
	$scope.selectedStudents = [];

	//holds data for creating three columns for lists
	$scope.columns = [];

	//holds text for title and button
	$scope.title = 'Create a Roster';
	$scope.buttonText = 'Add Roster';

	//loads $scope.students array with all students associated with current user
	const getStudentList = () => {
		studentFactory.getAllStudents(userId)
			.then(students => {
				$scope.students = students;
				$scope.columns = layout.createColumns($scope.students, 3);
			})
			.catch(error => console.log("error from getStudentList", error.message));
	};

	//checks to see if student already exists in students array
	const checkStudents = (id) => {
		for (let i = 0; i < $scope.selectedStudents.length; i++) {
			if (id === $scope.selectedStudents[i].id) {
				return true;
			}
		}
		return false;
	};

	//scaffolds object to hold class data
	$scope.newClassObj = {
		className: '',
		students: [],
		uid: userId
	};

	//adds class to classes collections in FB
	$scope.addClass = () => {
		$scope.newClassObj.students = $scope.selectedStudents;
		classFactory.postClass($scope.newClassObj)
			.then(data => {
				$location.url('/classes');
			})
			.catch(error => console.log("error from addClass", error.message));
	};

	//on click, student is added to selected students
	$scope.addRemoveStudent = (obj, id) => {
		if (checkStudents(id)) {
			$scope.selectedStudents.splice($scope.selectedStudents.indexOf(obj), 1);
		} else {
			$scope.selectedStudents.push(obj);
		}
	};

	//loads all student information to DOM on page load
	getStudentList();

});
