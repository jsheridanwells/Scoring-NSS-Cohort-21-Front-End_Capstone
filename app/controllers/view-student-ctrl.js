'use strict';
app.controller('viewStudentCtrl', function($routeParams, $scope, assessmentFactory, userFactory){

	//holds uid of current user
	let userId = userFactory.getUserId();

	$scope.scores = [];
	$scope.student = {};

	//gets all assessments from DB
	const getAssessments = (userId) => {
		assessmentFactory.getAllAssessments(userId)
			.then(assessments => {
				$scope.student = getStudent($routeParams.studentId, assessments);
				$scope.scores = makeScoresArray($routeParams.studentId, assessments).reverse();
			})
			.catch(error => console.log("error from getAssessments", error.message));
	};

	//searches assessment object for student object to display name
	const getStudent = (studentId, arr) => {
		for (let i = 0; i < arr[0].classes.length; i++) {
			for (let j = 0; j < arr[0].classes[i].students.length; j++) {
				if (arr[0].classes[i].students[j].id === studentId) {
					return arr[0].classes[i].students[j];
				}
			}
		}
	};

	//creates an array with all student's test scores, searching by id
	const makeScoresArray = (studentId, arr) => {
		let scoresArr = [];

		arr.forEach(assessment => {
			assessment.classes.forEach(thisClass => {
				thisClass.students.forEach(student => {
					if (student.id === studentId && !isNaN(student.score)) {
						scoresArr.push({assessment: assessment.assessmentName, score: student.score});
					}
				});
			});
		});
		return scoresArr;
	};

	//loads all assessment objects on page load
	getAssessments(userId);

});