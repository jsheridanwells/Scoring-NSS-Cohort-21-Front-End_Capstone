'use strict';
app.controller('assessmentListCtrl', function ($scope, $location, userFactory, assessmentFactory) {

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
			})
			.catch(error => console.log("error from showAssessments", error.message));
	};

	//removes an assessment from assessments collection
	$scope.deleteAssessment = (assessmentId) => {
		assessmentFactory.deleteAssessment(assessmentId)
			.then(() => showAssessments())
			.catch(error => console.log("error from deleteAssessment", error.message));
	};

	//patches an assessment in assessments collection
	//captures id of student to edit, changes window location to edit form
	$scope.editAssessment = (assessmentId) => {
		$location.url('/assessment-edit/' + assessmentId);
	};

	//loads list of assessments to DOM on page load
	showAssessments();

});