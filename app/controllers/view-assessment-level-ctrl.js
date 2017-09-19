'use strict';

app.controller('viewAssessmentLevelCtrl', function (
	$rootScope,
	$scope,
	$routeParams,
	assessmentFactory,
	proficiencySort) {

	//object holds information for assessment retrieved via $routeParams
	$scope.assessment = {};
	$scope.currentClass = {};
	$scope.currentStudents = [];

	const getAssessment = () => {
		console.log("rootScope", $rootScope.currentAssessment);
		assessmentFactory.getSingleAssessment($rootScope.currentAssessment)
			.then(assessment => {
				$scope.assessment = assessment;
				$scope.currentClass = getCurrentClass(assessment, $routeParams.classId);
				$scope.currentStudents = getCurrentStudents($scope.currentClass, $routeParams.levelName);



				console.log("scope assessment", $scope.assessment);
				console.log("scope currentClass", $scope.currentClass);
				console.log("scope currentStudents", $scope.currentStudents);
			})
			.catch(error => console.log("error from getAssessment", error.message));
	};

	const getCurrentClass = (obj, id) => {
		let currentClass = {};
		obj.classes.forEach(item => {
			if (item.id === id) {
				currentClass = item;
			}
		});
		return currentClass;
	};

	const getCurrentStudents = (obj, level) => {
		let currentStudents = [];
		obj.students.forEach(item => {
			if (item.proficiency === level) {
				currentStudents.push(item);
			}
		});
		return currentStudents;
	};

	//loads assessment data to DOM
	getAssessment();
});