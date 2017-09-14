'use strict';
app.controller('viewStudentCtrl', function($routeParams, $rootScope, $scope, assessmentFactory, userFactory, studentFactory){

	let userId = userFactory.getUserId();

	$scope.scores = [];

	const getAssessments = (userId) => {
		assessmentFactory.getAllAssessments(userId)
			.then(assessments => {
				console.log("assessmentData", assessments);
				console.log("scope.student", $scope.student);
			})
			.catch(error => console.log("error from getAssessments", error.message));
	};

	const getStudent = (id) => {
		console.log("id", id);
		studentFactory.getSingleStudent(id)
			.then(studentObj => studentObj)
			.catch(error => console.log("error grom getStudentName", error.message));
	};


	$scope.student = getStudent($routeParams.studentId);
	getAssessments(userId);

});