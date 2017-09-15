'use strict';
app.controller('assessmentListCtrl', function ($scope, userFactory, assessmentFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//holds all assessment information to display in DOM
	$scope.assessments = [];

	//retrieves all assessment data and stores it in $scope.assessments array
	const showAssessments = () => {
		assessmentFactory.getAllAssessments(userId)
			.then(list => {
				$scope.assessments = list;
				console.log("$scope.assessments", $scope.assessments);
			})
			.catch(error => console.log("error from showAssessments", error.message));
	};

	//removes an assessment from assessments collection
	$scope.deleteAssessment = (assessmentId) => {
		console.log("function firing", assessmentId);
		assessmentFactory.deleteAssessment(assessmentId)
			.then(() => showAssessments())
			.catch(error => console.log("error from deleteAssessment", error.message));
	};

	//patches an assessment in assessments collection
	$scope.editAssessment = () => {

	};

	//loads list of assessments to DOM on page load
	showAssessments();

});