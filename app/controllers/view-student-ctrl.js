'use strict';
app.controller('viewStudentCtrl', function($routeParams, $rootScope, $scope, assessmentFactory, userFactory, studentFactory){

	let userId = userFactory.getUserId();

	$scope.scores = [];
	$scope.student = {};

	const getAssessments = (userId) => {
		assessmentFactory.getAllAssessments(userId)
			.then(assessments => {
				console.log("assessmentData", assessments);
				$scope.student = getStudent($routeParams.studentId, assessments);
				console.log("scope.student", $scope.student);

			})
			.catch(error => console.log("error from getAssessments", error.message));
	};

	const getStudent = (studentId, arr) => {
		for (let i = 0; i < arr[0].classes.length; i++) {
			for (let j = 0; j < arr[0].classes[i].students.length; j++) {
				if (arr[0].classes[i].students[j].id === studentId) {
					return arr[0].classes[i].students[j];
				}
			}
		}
	};

	const makeScoresArray = () => {

	};

	getAssessments(userId);

});