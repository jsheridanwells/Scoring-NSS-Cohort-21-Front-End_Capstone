'use strict';
app.controller('viewAssessmentCtrl', function($rootScope, $scope, $routeParams, userFactory, assessmentFactory, classFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//object holds information for assessment retrieved via $routeParams
	$scope.assessment = {};

	//stores current assessment id in $rootScope so it's available for subsequent views
	const getAssessment = () => {
		$rootScope.currentAssessment = $routeParams.assessmentId;
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessment => {
				$scope.assessment = assessment;
			})
			.catch(error => console.log("error from getAssessment", error.message));
	};

	//loads assessment data to DOM
	getAssessment();

});