'use strict';

app.controller('assessmentEditCtrl', function ($scope, $routeParams, $location, assessmentFactory, classFactory, userFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	$scope.newAssessmentObj = {};
	$scope.classes = [];
	$scope.currentClasses = [];
	$scope.title = 'Edit Assessment';
	$scope.buttonText = 'Save Changes';

	//loads data for current assessment, then loads all classes
	const loadAssessmentData = () => {
		assessmentFactory.getSingleAssessment($routeParams.assessmentId)
			.then(assessmentObj => {
				$scope.newAssessmentObj = assessmentObj;
				$scope.newAssessmentObj.date = new Date(assessmentObj.date);
				if (assessmentObj.classes) {
					$scope.currentClasses = assessmentObj.classes;
				}
				return classFactory.getAllClasses(userId);
			})
			.then(classes => {
				$scope.classes = loadCurrentClasses($scope.currentClasses, classes);
			})
			.catch(error => console.log("error from loadAssessmentData", error.message));
	};

	//removes classes already assigned assessment from classes list
	const loadCurrentClasses = (list1, list2) => {
		for (let i = 0; i < list1.length; i++) {
			for (let j = 0; j < list2.length; j++) {
				if (list1[i].id === list2[j].id) {
					list2.splice(list2.indexOf(list2[j]), 1);
				}
			}
		}
		return list2;
	};

	//checks to see if class already exists in classes array
	const checkClasses = (id) => {
		for (let i = 0; i < $scope.currentClasses.length; i++) {
			if (id === $scope.currentClasses[i].id) {
				return true;
			}
		}
		return false;
	};

	//when user selects a class, appends class information to newAssessmentObj, creates test score field for each student
	$scope.addRemoveClass = (obj, id) => {
		if (checkClasses(id)) {
			$scope.classes.push(obj);
			$scope.currentClasses.splice($scope.currentClasses.indexOf(obj), 1);
		} else {
			$scope.currentClasses.push(obj);
			$scope.classes.splice($scope.classes.indexOf(obj), 1);
		}
	};
	loadAssessmentData();

	//patches assessment object in firebase
	$scope.addAssessment = () => {
		assessmentFactory.editAssessment($scope.newAssessmentObj.id, $scope.newAssessmentObj)
			.then(() => {
				$location.url('/assessments');
			})
			.catch(error => console.log("error from addAssessment", error.message));
	};

});