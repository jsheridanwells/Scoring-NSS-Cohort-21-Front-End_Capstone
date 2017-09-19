'use strict';

app.controller('classCreateCtrl', function ($scope, $location, userFactory, classFactory, studentFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//holds array of all students associated with current user
	$scope.students = [];

	//holds array of students selected to add to new class
	$scope.selectedStudents = [];

	//holds data for creating three columns for lists
	$scope.columns = [];

	//loads $scope.students array with all students associated with current user
	const getStudentList = () => {
		studentFactory.getAllStudents(userId)
			.then(students => {
				$scope.students = students;
				$scope.columns = createColumns($scope.students, 3);
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

	//creates data for sorting long student list into three columns
	const createColumns = (arr, colCount) => {
		let itemsPerColumn = Math.ceil(arr.length / colCount);
		let returnArr = [];
		for (let i = 0; i < arr.length; i += colCount) {
			let col = {start:i, end: Math.min(i + colCount, arr.length) };
			returnArr.push(col);
		}
		return returnArr;
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
		console.log("newClassObject from add Class", $scope.newClassObj);
		classFactory.postClass($scope.newClassObj)
			.then(data => {
				console.log("data from addClass", data);
				$location.url('/classes');
			})
			.catch(error => console.log("error from addClass", error.message));
	};

	//on click, student is added to selected students
	$scope.addRemoveStudent = (obj, id) => {
		if (checkStudents(id)) {
			$scope.selectedStudents.splice($scope.selectedStudents.indexOf(obj), 1);
			console.log("remove student: ", $scope.selectedStudents);
		} else {
			$scope.selectedStudents.push(obj);
			console.log("add student: ", $scope.selectedStudents);
		}
	};

	//loads all student information to DOM on page load
	getStudentList();

});

//slice filter to create 3 columns to display long lists
app.filter('slice', function () {
	return (arr, start, end) => arr.slice(start,end);
});