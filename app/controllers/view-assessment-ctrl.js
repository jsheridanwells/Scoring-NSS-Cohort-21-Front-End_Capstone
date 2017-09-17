'use strict';
app.controller('viewAssessmentCtrl', function($rootScope, $scope, $routeParams, userFactory, assessmentFactory, classFactory, proficiencySort) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//object holds information for assessment retrieved via $routeParams
	$scope.assessment = {};
	//array holds students and scores separated into proficiency levels
	$scope.proficiency = [];
	//array holds the names and number of students for each proficiency level
	$scope.levelCounts = [];

	//stores current assessment id in $rootScope so it's available for subsequent views
	const getAssessment = () => {
		$rootScope.currentAssessment = $routeParams.assessmentId;
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessment => {
				$scope.assessment = assessment;
				$scope.proficiency = proficiencySort.sortByLevel(assessment);
				$scope.proficiency.forEach(item => {
					$scope.levelCounts.push(proficiencySort.getLevelCounts(item));
				});
				console.log("scope assessment", $scope.assessment);
				console.log("scope proficiency", $scope.proficiency);
				console.log("scope levelCounts", $scope.levelCounts);
			})
			.catch(error => console.log("error from getAssessment", error.message));
	};

	//loads assessment data to DOM
	getAssessment();

	

});