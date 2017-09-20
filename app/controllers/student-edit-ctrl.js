'use strict';
app.controller('studentEditCtrl', function ($scope, $location, $routeParams, studentFactory) {

	$scope.newStudentObj = {};

	//holds text of submit button
	$scope.buttonText = 'Save Changes';
	//holds page title
	$scope.title = 'Edit Student Details';

	const loadStudentObj = () => {
		studentFactory.getSingleStudent($routeParams.studentId)
			.then(obj => {
				$scope.newStudentObj = obj;
				console.log("$scope.newStudentObj", $scope.newStudentObj);
			})
			.catch(error => console.log("error from loadStudentObj", error.message));
	};

	//adds new student details to students collection in FB
	$scope.addStudent = () => {
		studentFactory.editStudent($scope.newStudentObj, $scope.newStudentObj.id)
		.then((data => {
			$location.url('/students');
		}))
		.catch(error => console.log("error from addStudent", error.message));
	};

	loadStudentObj();

});