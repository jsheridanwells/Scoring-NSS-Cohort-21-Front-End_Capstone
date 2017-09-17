'use strict';
app.controller('assessmentScoringCtrl', function($scope, $routeParams, userFactory, studentFactory, assessmentFactory, proficiencySort){

	//holds uid of current user
	let userId = userFactory.getUserId();

	//creates assessment object to print to DOM
	$scope.assessment = {};


	//saves assessment to FB with updated data
	$scope.saveAssessment = (assessment) => {
		//assigns score and proficiency level to each student before sending data object
		assessment.classes.forEach(thisClass => {
			thisClass.students.forEach(student => {
				student.score = getScore(student.points, assessment.totalPoints);
				student.proficiency = proficiencySort.assignLevel(student.score);
			});
		});
		//sends data object
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
			})
			.catch(error => console.log(error.message));
	};

	//converts date from timestamp to readable date
	const convertDate = (date) => {
		return new Date(date).toString().slice(4,15);
	};

	//divides student's points by total points to post test score
	const getScore = (points, total) => {
		return ((points / total) * 100).toFixed(0);
	};

	//loads assessment data for current assessment
	loadAssessmentInfo();

});