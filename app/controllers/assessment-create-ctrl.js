'use strict';

app.controller('assessmentCreateCtrl', function ($scope, $location, userFactory, assessmentFactory, classFactory) {

	let userId = userFactory.getUserId();

	$scope.classes = [];

	const getClassList = () => {
		classFactory.getAllClasses(userId)
			.then(classes => {
				$scope.classes = classes;
				console.log("$scope.classes", $scope.classes);
			})
			.catch(error => console.log("error from getClassList", error));
	};

	$scope.newAssessmentObj = {
		assessmentName: '',
		totalPoints: '',
		date: '',
		classes: [],
		uid: userId
	};

	$scope.addAssessment = () => {
		assessmentFactory.postAssessment($scope.newAssessmentObj)
			.then(() => {
				$location.url('/assessments');
			})
			.catch(error => console.log("error in addAssessment", error.message));
	};

	$scope.addClass = (id) => {
		$scope.newAssessmentObj.classes.push(id);
		console.log("$scope.newAssessmentObj.classes", $scope.newAssessmentObj.classes);
	};

	getClassList();

});