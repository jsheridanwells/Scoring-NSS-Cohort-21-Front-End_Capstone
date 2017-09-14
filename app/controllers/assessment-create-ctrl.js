'use strict';

app.controller('assessmentCreateCtrl', function ($scope, $location, userFactory, assessmentFactory, classFactory) {

	let userId = userFactory.getUserId();


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
				console.log("addClass data", $scope.newAssessmentObj);
				$location.url('/assessments');
			})
			.catch(error => console.log("error in addAssessment", error.message));
	};

	$scope.addClass = (id) => {
		classFactory.getSingleClass(id)
			.then(myClass => {
				$scope.newAssessmentObj.classes.push(myClass);
				console.log("addClass data", $scope.newAssessmentObj);
			})
			.catch(error => console.log("error in addClass", error.message));
	};

	getClassList();

});