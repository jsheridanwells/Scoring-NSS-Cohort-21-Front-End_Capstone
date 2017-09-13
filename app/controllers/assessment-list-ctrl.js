'use strict';
app.controller('assessmentListCtrl', function ($scope, userFactory, assessmentFactory) {

	let userId = userFactory.getUserId();

	$scope.assessments = [];

	const showAssessments = () => {
		assessmentFactory.getAllAssessments(userId)
			.then(list => {
				$scope.assessments = list;
				console.log("$scope.assessments", $scope.assessments);
			})
			.catch(error => console.log("error from showAssessments", error.message));
	};

	$scope.deleteAssessment = (assessmentId) => {
		console.log("function firing", assessmentId);
		assessmentFactory.deleteAssessment(assessmentId)
			.then(() => showAssessments())
			.catch(error => console.log("error from deleteAssessment", error.message));
	};

	$scope.editAssessment = () => {

	};



	showAssessments();

});