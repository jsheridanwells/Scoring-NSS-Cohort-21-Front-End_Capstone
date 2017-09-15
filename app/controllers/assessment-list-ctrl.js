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

	//averages all test scores for one assessment and adds to $scope.assessment array
	const getAverages = (arr) => {
		let scores = [];
		arr.forEach(thisClass => {
			thisClass.students.forEach(student => {
				if (student.score !== '') {
					scores.push(parseInt(student.score));
				}
			});
		});
		if (scores.length > 0) {
			let total = scores.reduce((a,b) => a+b);
			return (total / scores.length).toFixed();
		} else {
			return 'No Scores';
		}
	};

	//retrieves all assessment data and stores it in $scope.assessments array
	const showAssessments = () => {
		assessmentFactory.getAllAssessments(userId)
			.then(list => {
				//add readable date key
				list.forEach(item => {
					item.displayDate = convertDate(item.date);
				});
				list.forEach(assessment => {
					assessment.average = getAverages(assessment.classes);
				});
				console.log("list", list);
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