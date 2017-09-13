'use strict';
app.controller('assessmentScoringCtrl', function($scope, $routeParams, userFactory, studentFactory, assessmentFactory){
	let userId = userFactory.getUserId();

	$scope.students = [];
	$scope.assessment = {};
	$scope.assessment.scores = [];

	$scope.saveAssessment = (assessment) => {
		assessmentFactory.updateAssessment($routeParams.assessmentId, assessment)
			.then()
			.catch();
	};

	const loadAssessmentInfo = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessment => {
				$scope.assessment = assessment;
				loadStudentNames(assessment.students);
				console.log("$scope.assessments", $scope.assessment);
			})
			.catch(error => console.log("error from loadAssessmentInfo", error.message));
	};

	const loadStudentNames = (studentArray) => {
		studentArray.forEach(student => {
			studentFactory.getSingleStudent(student)
				.then(student => {
					$scope.students.push(student);
					console.log("$scope.students", $scope.students);
				})
				.catch(error => console.log("error from loadStudentNames", error.message));
		});
	};

	loadAssessmentInfo();

});