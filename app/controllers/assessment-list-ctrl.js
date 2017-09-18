'use strict';
app.controller('assessmentListCtrl', function ($scope, userFactory, assessmentFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//holds all assessment information to display in DOM
	$scope.assessments = [];

	//converts date from timestamp to readable date
	const convertDate = (date) => {
		return new Date(date).toString().slice(4,15);
	};

	//retrieves all assessment data and stores it in $scope.assessments array
	const showAssessments = () => {
		assessmentFactory.getAllAssessments(userId)
			.then(list => {
				//add readable date key
				list.forEach(item => {
					item.displayDate = convertDate(item.date);
				});
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