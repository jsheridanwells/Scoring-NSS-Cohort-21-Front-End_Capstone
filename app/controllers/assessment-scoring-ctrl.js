'use strict';
app.controller('assessmentScoringCtrl', function($scope, userFactory, studentFactory, assessmentFactory){
	let userId = userFactory.getUserId();

	$scope.assessments = [];

	const showAssessments = () => {
		console.log("firing");
		assessmentFactory.getAllAssessments(userId)
			.then(list => {
				console.log("entering then", userId, list);
				$scope.assessments = list;
			})
			.catch(error => console.log("error from showAssessments", error.message));
	};

	showAssessments();

});