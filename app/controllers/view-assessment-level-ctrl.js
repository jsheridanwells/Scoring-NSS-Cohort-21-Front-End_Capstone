'use strict';

app.controller('viewAssessmentLevelCtrl', function ($rootScope, $scope, $routeParams, userFactory, assessmentFactory, classFactory, proficiencySort) {
	//holds uid of current user
	let userId = userFactory.getUserId();

	//object holds information for assessment retrieved via $routeParams
	$scope.assessment = {};
	$scope.className = '';
	$scope.currentProficiency = [];

	const getAssessment = () => {
		console.log("rootScope", $rootScope.currentAssessment);
		assessmentFactory.getSingleAssessment($rootScope.currentAssessment)
			.then(assessment => {
				$scope.assessment = assessment;
				$scope.proficiency = proficiencySort.sortByLevel(assessment);

				console.log("scope assessment", $scope.assessment);
				console.log("scope proficiency", $scope.proficiency);
			})
			.catch(error => console.log("error from getAssessment", error.message));
	};

	//loads assessment data to DOM
	getAssessment();
});