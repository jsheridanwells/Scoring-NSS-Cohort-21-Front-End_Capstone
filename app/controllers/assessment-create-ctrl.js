'use strict';

app.controller('assessmentCreateCtrl', function ($scope, $location, userFactory, assessmentFactory, classFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	//adds class objects to $scope for all classes associated with current user
	const getClassList = () => {
		classFactory.getAllClasses(userId)
			.then(classes => {
				$scope.classes = classes;
				console.log("$scope.classes", $scope.classes);
			})
			.catch(error => console.log("error from getClassList", error));
	};

	//checks to see if class already exists in classes array
	const checkClasses = (id) => {
		for (let i = 0; i < $scope.selectedClasses.length; i++) {
			if (id === $scope.selectedClasses[i].id) {
				return true;
			}
		}
		return false;
	};

	//scaffolds object to hold assessment data
	$scope.newAssessmentObj = {
		assessmentName: '',
		totalPoints: '',
		date: '',
		classes: [],
		uid: userId,
		average: 'No Score'
	};

	//holds data for all classes
	$scope.classes = [];
	//tracks state of checkbox for addRemoveClass function
	$scope.selectedClasses = [];

	//pulls all input from $scope.newAssessmentObj and posts new assessment to assessments collection in FB
	$scope.addAssessment = () => {
		assessmentFactory.postAssessment($scope.newAssessmentObj)
			.then(() => {
				console.log("addAssessment data", $scope.newAssessmentObj);
				$location.url('/assessments');
			})
			.catch(error => console.log("error in addAssessment", error.message));
	};

	//when user selects a class, appends class information to newAssessmentObj, creates test score field for each student
	$scope.addRemoveClass = (obj, id) => {
		if (checkClasses(id)) {
			$scope.selectedClasses.splice($scope.selectedClasses.indexOf(obj), 1);
			console.log("$scope.selectedClasses", $scope.selectedClasses);
		} else {
			$scope.selectedClasses.push(obj);
			console.log("$scope.selectedClasses", $scope.selectedClasses);
		}
	};

	//on page load, loads list of all classes
	getClassList();

});




// classFactory.getSingleClass(id)
// 	.then(myClass => {
// 		myClass.students.forEach(student => student.score = '');
// 		$scope.selectedClasses.push(myClass);
// 		console.log("addClass data", $scope.selectedClasses);
// 	})
// 	.catch(error => console.log("error in addClass", error.message));