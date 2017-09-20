'use strict';
app.controller('studentCreateCtrl', function ($scope, $location, userFactory, studentFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//scaffolds object to hold student data
	$scope.newStudentObj = {
		firstName: '',
		lastName: '',
		uid: userId
	};

	//holds text of submit button
	$scope.buttonText = 'Create Student';
	//holds page title
	$scope.title = 'Add a New Student';

	//adds new student to students collection in FB
	$scope.addStudent = () => {
		studentFactory.postStudent($scope.newStudentObj)
		.then((data => {
			$location.url('/students');
		}))
		.catch(error => console.log("error from addStudent", error.message));
	};

});