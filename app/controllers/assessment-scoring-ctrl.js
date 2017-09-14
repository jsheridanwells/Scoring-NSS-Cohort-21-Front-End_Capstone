'use strict';
app.controller('assessmentScoringCtrl', function($scope, $routeParams, userFactory, studentFactory, assessmentFactory){
	let userId = userFactory.getUserId();

	$scope.assessment = {};

	$scope.saveAssessment = (assessment) => {
		console.log("assessment", assessment);
		assessmentFactory.updateAssessment($routeParams.assessmentId, assessment)
			.then(data => console.log("data from saveAssessment", data))
			.catch(error => console.log("error from saveAssessment", error.message));
	};

	const loadAssessmentInfo = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessmentObj => {
				$scope.assessment = assessmentObj;
				console.log("scope assessment", $scope.assessment);
			})
			.catch(error => console.log(error.message));
	};

	loadAssessmentInfo();

});