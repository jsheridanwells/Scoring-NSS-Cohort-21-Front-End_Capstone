'use strict';
app.controller('assessmentScoringCtrl', function($scope, $routeParams, userFactory, studentFactory, assessmentFactory){
	let userId = userFactory.getUserId();

	$scope.assessment = {};

	const loadAssessmentInfo = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessment => {
				$scope.assessment = assessment;
				console.log("$scope.assessments", $scope.assessment);
			})
			.catch(error => console.log("error from loadAssessmentInfo", error.message));
	};

	loadAssessmentInfo();

});