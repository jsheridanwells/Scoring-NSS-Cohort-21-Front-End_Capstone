'use strict';
app.controller('assessmentScoringCtrl', function($scope, $routeParams, userFactory, studentFactory, assessmentFactory){

	//holds uid of current user
	let userId = userFactory.getUserId();

	//creates assessment object to print to DOM
	$scope.assessment = {};


	//saves assessment to FB with updated data
	$scope.saveAssessment = (assessment) => {
		console.log("assessment", assessment);
		assessmentFactory.updateAssessment($routeParams.assessmentId, assessment)
			.then(data => console.log("data from saveAssessment", data))
			.catch(error => console.log("error from saveAssessment", error.message));
	};

	//loads assessment data to the assessment object to load to the DOM
	const loadAssessmentInfo = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessmentObj => {
				$scope.assessment = assessmentObj;
				$scope.assessment.displayDate = convertDate(assessmentObj.date);
				console.log("scope assessment", $scope.assessment);
			})
			.catch(error => console.log(error.message));
	};

	//converts date from timestamp to readable date
	const convertDate = (date) => {
		return new Date(date).toString().slice(4,15);
	};

	//loads assessment data for current assessment
	loadAssessmentInfo();

});