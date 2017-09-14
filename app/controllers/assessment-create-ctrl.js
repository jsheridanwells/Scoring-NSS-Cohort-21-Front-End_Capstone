'use strict';

app.controller('assessmentCreateCtrl', function ($scope, $location, userFactory, assessmentFactory, classFactory) {

	let userId = userFactory.getUserId();


	const getClassList = () => {
		classFactory.getAllClasses(userId)
			.then(classes => {
				$scope.classes = classes;
				console.log("$scope.classes", $scope.classes);
			})
			.catch(error => console.log("error from getClassList", error));
	};

	$scope.newAssessmentObj = {
		assessmentName: '',
		totalPoints: '',
		date: '',
		classes: [],
		students: [],
		uid: userId
	};

	$scope.addAssessment = () => {
		assessmentFactory.postAssessment($scope.newAssessmentObj)
			.then(() => {
				console.log("addClass data", $scope.newAssessmentObj);
				$location.url('/assessments');
			})
			.catch(error => console.log("error in addAssessment", error.message));
	};

	$scope.addClass = (id) => {
		classFactory.getSingleClass(id)
			.then(myClass => {
				$scope.newAssessmentObj.classes.push(myClass);
				for (let i = 0; i < myClass.students.length; i++) {
					myClass.students[i].score = '';
					$scope.newAssessmentObj.students.push(myClass.students[i]);
				}
				console.log("addClass data", $scope.newAssessmentObj);
			})
			.catch(error => console.log("error in addClass", error.message));
	};

	getClassList();

});