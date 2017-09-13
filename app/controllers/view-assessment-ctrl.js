'use strict';
app.controller('viewAssessmentCtrl', function($scope, $routeParams, userFactory, assessmentFactory, classFactory, studentFactory) {

	let userId = userFactory.getUserId();

	$scope.assessment = {};

	const getAssessment = () => {
		console.log("$routeParams.assessmentId", $routeParams.assessmentId);
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessment => {
				console.log("assessment", assessment);
				$scope.assessment = assessment;
				console.log("$scope.assessment", $scope.assessment);
			})
			.catch();
	};

	getAssessment();

});