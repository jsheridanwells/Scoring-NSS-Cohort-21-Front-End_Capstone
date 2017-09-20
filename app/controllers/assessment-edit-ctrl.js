'use strict';

app.controller('assessmentEditCtrl', function ($scope, $routeParams, assessmentFactory, classFactory, userFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	$scope.newAssessmentObj = {};
	$scope.classes = [];
	$scope.title = 'EditAssessment';
	$scope.buttonText = 'Save Changes';

	const loadAssessmentData = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessmentObj => {
				$scope.newAssessmentObj = assessmentObj;
				$scope.newAssessmentObj.date = new Date(assessmentObj.date);
				// new Date(1505797200000).toLocaleDateString();
				console.log("$scope.newAssessmentObj", $scope.newAssessmentObj);
				return classFactory.getAllClasses(userId);
			})
			.then(classes => {
				$scope.classes = classes;
				console.log("$scope.classes", $scope.classes);
			})
			.catch(error => console.log("error from loadAssessment", error.message));
	};

	loadAssessmentData();

});