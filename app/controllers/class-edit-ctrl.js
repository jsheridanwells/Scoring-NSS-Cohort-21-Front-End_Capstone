'use strict';
app.controller('classEditCtrl', function ($scope, $routeParams, $location, classFactory, studentFactory, userFactory, layout) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	$scope.newClassObj = {};
	$scope.students = [];
	$scope.currentStudents = [];
	$scope.title = 'Edit Roster';
	$scope.buttonText = 'Save Changes';

	// loads data for current class, then loads all students
	const loadClassData = () => {
		classFactory.getSingleClass($routeParams.classId)
			.then(classObj => {
				$scope.newClassObj = classObj;
				console.log("$scope.newClassObj", $scope.newClassObj);
				if (classObj.students) {
					$scope.currentStudents = classObj.students;
				}
				return studentFactory.getAllStudents(userId);
			})
			.then(students => {
				$scope.students = loadCurrentStudents($scope.currentStudents, students);
				$scope.columns = layout.createColumns($scope.students, 3);
				console.log("$scope.students", $scope.students);
			})
			.catch (error => console.log("error from loadClassData", error.message));
	};

	//removes current students from array of all students
	const loadCurrentStudents = (list1, list2) => {
		for (let i = 0; i < list1.length; i++) {
			for (let j = 0; j < list2.length; j++) {
				if (list1[i].id === list2[j].id) {
					list2.splice(list2.indexOf(list2[j]), 1);
				}
			}
		}
		return list2;
	};

	//checks to see if student id is in current students array
	const checkStudents = (id) => {
		for (let i = 0; i < $scope.currentStudents.length; i++) {
			if (id === $scope.currentStudents[i].id) {
				return true;
			}
		}
		return false;
	};

	//toggles student from current students array to array of all students
	$scope.addRemoveStudent = (obj, id) => {
		if (checkStudents(id)) {
			$scope.students.push(obj);
			$scope.currentStudents.splice($scope.currentStudents.indexOf(obj), 1);
		} else {
			$scope.currentStudents.push(obj);
			$scope.students.splice($scope.students.indexOf(obj), 1);
		}
	};

	//updates class object with current class
	$scope.addClass = () => {
		classFactory.editClass($scope.newClassObj.id, $scope.newClassObj)
		.then(() => {
			$location.url('classes');
		})
		.catch(error => console.log("error from addClass", error.message));
	};

	//loads current class and student lists on page load
	loadClassData();

});