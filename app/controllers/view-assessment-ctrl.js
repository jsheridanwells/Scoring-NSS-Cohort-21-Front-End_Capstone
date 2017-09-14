'use strict';
app.controller('viewAssessmentCtrl', function($rootScope, $scope, $routeParams, userFactory, assessmentFactory, classFactory) {

	let userId = userFactory.getUserId();

	$scope.assessment = {};

	const getAssessment = () => {
		$rootScope.currentAssessment = $routeParams.assessmentId;
		console.log("rootScope", $rootScope);
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