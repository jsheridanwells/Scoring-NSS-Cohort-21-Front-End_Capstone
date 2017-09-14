'use strict';
app.controller('viewClassCtrl', function($rootScope, $scope, $routeParams, userFactory, assessmentFactory, classFactory) {

	let userId = userFactory.getUserId();
	$scope.assessment = {};
	$scope.currentClass = {};
	$scope.currentStudents = [];

	const getAssessment = () => {
		assessmentFactory.getSingleAssessment($rootScope.currentAssessment)
			.then(assessment => {
				console.log("assessment", assessment);
				$scope.assessment = assessment;
				$scope.currentClass = findCurrentClass(assessment, $routeParams.classId);
				$scope.currentStudents = $scope.currentClass.students;
				console.log('currentStudents', $scope.currentStudents);
			})
			.catch(error => console.log("error from getAssessment", error.message));
	};

	const findCurrentClass = (obj, searchId) => {
		for (let i = 0; i < obj.classes.length; i++) {
			if (obj.classes[i].id === searchId) {
				return obj.classes[i];
			}
		}
	};

	

	getAssessment();

});