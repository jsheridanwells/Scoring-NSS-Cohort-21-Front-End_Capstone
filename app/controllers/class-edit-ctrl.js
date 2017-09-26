'use strict';
app.controller('classEditCtrl', function ($scope, $routeParams, $location, classFactory, studentFactory, userFactory) {

	//holds uid of current user
	let userId = userFactory.getUserId();

	$scope.newClassObj = {};
	$scope.students = [];
	$scope.currentStudents = [];
	$scope.title = 'Edit Roster';
	$scope.buttonText = 'Save Changes';

});