'use strict';

app.controller('assessmentCreateCtrl', function ($scope, $location, userFactory, assessmentFactory, classFactory) {

	let userId = userFactory.getUserId();

	$scope.newAssessmentObj = {
		assessmentName: '',
		students: [],
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

});