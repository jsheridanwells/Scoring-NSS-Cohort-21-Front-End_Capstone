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
		students: [],
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
		classFactory.getSingleClass(id)
			.then(myClass => {
				myClass.students.forEach(student => $scope.newAssessmentObj.students.push(student));
				console.log("$scope.newAssessmentObj.students", $scope.newAssessmentObj.students);
			})
			.catch(error => console.log("error in addClass", error.message));
	};

	getClassList();

});