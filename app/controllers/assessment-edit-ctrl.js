'use strict';

app.controller('assessmentEditCtrl', function ($scope, $routeParams, assessmentFactory, classFactory, userFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	$scope.newAssessmentObj = {};
	$scope.classes = [];
	$scope.currentClasses = [];
	$scope.title = 'Edit Assessment';
	$scope.buttonText = 'Save Changes';

	const loadAssessmentData = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessmentObj => {
				$scope.newAssessmentObj = assessmentObj;
				$scope.newAssessmentObj.date = new Date(assessmentObj.date);
				$scope.currentClasses = assessmentObj.classes;
				console.log("$scope.newAssessmentObj", $scope.newAssessmentObj);
				console.log("$scope.currentClasses", $scope.currentClasses);
				return classFactory.getAllClasses(userId);
			})
			.then(classes => {
				$scope.classes = loadCurrentClasses($scope.currentClasses, classes);
				console.log("$scope.currentClasses 2", $scope.currentClasses);
				console.log("$scope.classes 2", $scope.classes);
			})
			.catch(error => console.log("error from loadAssessment", error.message));
	};

	const loadCurrentClasses = (list1, list2) => {
		for (let i = 0; i < list1.length; i++) {
			for (let j = 0; j < list2.length; j++) {
				if (list1[i].id === list2[j].id) {
					console.log("entering if", list2.indexOf(list2[j]));
					list2.splice(list2.indexOf(list2[j]), 1);
				}
			}
		}
		console.log("list2", list2);
		return list2;
	};

	loadAssessmentData();

});