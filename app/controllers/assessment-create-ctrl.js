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

	//scaffolds object to hold assessment data
	$scope.newAssessmentObj = {
		assessmentName: '',
		totalPoints: '',
		date: '',
		classes: [],
		uid: userId
	};

	//pulls all input from $scope.newAssessmentObj and posts new assessment to assessments collection in FB
	$scope.addAssessment = () => {
		assessmentFactory.postAssessment($scope.newAssessmentObj)
			.then(() => {
				console.log("addClass data", $scope.newAssessmentObj);
				$location.url('/assessments');
			})
			.catch(error => console.log("error in addAssessment", error.message));
	};

	//when user selects a class, appends class information to newAssessmentObj, creates test score field for each student
	$scope.addClass = (id) => {
		classFactory.getSingleClass(id)
			.then(myClass => {
				myClass.students.forEach(student => student.score = '');
				$scope.newAssessmentObj.classes.push(myClass);
				console.log("addClass data", $scope.newAssessmentObj);
			})
			.catch(error => console.log("error in addClass", error.message));
	};

	//on page load, loads list of all classes
	getClassList();

});