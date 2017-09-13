'use strict';
app.controller('assessmentScoringCtrl', function($scope, $routeParams, userFactory, studentFactory, assessmentFactory){
	let userId = userFactory.getUserId();

	$scope.students = [];
	$scope.assessment = {};
	$scope.assessment.scores = [];

	$scope.saveAssessment = (assessment) => {
		assessmentFactory.updateAssessment($routeParams.assessmentId, assessment)
			.then(data => console.log("data from saveAssessment", data))
			.catch(error => console.log("error from saveAssessment", error.message));
	};

	const loadAssessmentInfo = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessment => {
				$scope.assessment = assessment;
				for (let i = 0; i < assessment.classes.length; i++) {
					loadStudentNames(assessment.classes[i].students);
				}
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