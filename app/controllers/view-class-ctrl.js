'use strict';
app.controller('viewClassCtrl', function($rootScope, $scope, $routeParams, assessmentFactory, classFactory, proficiencySort, donutGenerator) {

	//makes assessment, current class, and current student information available in DOM
	$scope.assessment = {};
	$scope.currentClass = {};
	$scope.currentStudents = [];
	$scope.donutData = [];

	//loads data from current selected assessment using id stored in $rootScope, stores objects in scope
	const getAssessment = () => {
		assessmentFactory.getSingleAssessment($rootScope.currentAssessment)
			.then(assessment => {
				$scope.assessment = assessment;
				console.log("assessment", assessment);
				$scope.currentClass = findCurrentClass(assessment, $routeParams.classId);
				console.log("currentClass", $scope.currentClass);
				$scope.currentStudents = $scope.currentClass.students;
				console.log("currentStudents", $scope.currentStudents);
				$scope.donutData = proficiencySort.calculateLevelPercentages($scope.currentStudents);
				console.log("$scope.donutData", $scope.donutData);
				donutGenerator.createDonutChart($scope.donutData.map(d => d.percentage), '#donut-chart');

			})
			.catch(error => console.log("error from getAssessment", error.message));
	};

	//helper function to search assessment object for selected class by class id
	const findCurrentClass = (obj, searchId) => {
		for (let i = 0; i < obj.classes.length; i++) {
			if (obj.classes[i].id === searchId) {
				return obj.classes[i];
			}
		}
	};

	//loads assessment data to DOM on page load
	getAssessment();

});