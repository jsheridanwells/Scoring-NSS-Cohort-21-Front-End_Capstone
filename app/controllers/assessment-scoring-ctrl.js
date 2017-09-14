'use strict';
app.controller('assessmentScoringCtrl', function($scope, $routeParams, userFactory, studentFactory, assessmentFactory){
	let userId = userFactory.getUserId();

	$scope.assessment = {};
	$scope.students = [];

	$scope.saveAssessment = (assessment) => {
		assessmentFactory.updateAssessment($routeParams.assessmentId, assessment)
			.then(data => console.log("data from saveAssessment", data))
			.catch(error => console.log("error from saveAssessment", error.message));
	};

	const loadAssessmentInfo = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessmentObj => {
				$scope.assessment = assessmentObj;
				for (let i = 0; i < assessmentObj.classes.length; i++) {
					for (let j = 0; j < assessmentObj.classes[i].students.length; j++) {
						$scope.students.push(assessmentObj.classes[i].students[j]);
					}
				}
				console.log("scope assessment", $scope.assessment);
				console.log("scope students", $scope.students);
			})
			.catch(error => console.log(error.message));
	};

	loadAssessmentInfo();

});