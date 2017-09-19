'use strict';
app.controller('classRosterViewCtrl', function ($scope, $routeParams, classFactory, layout) {

	$scope.myClass = {};

	//holds data for creating three columns for lists
	$scope.columns = [];

	const getClass = () => {
		classFactory.getSingleClass($routeParams.classId)
			.then(myClass => {
				$scope.myClass = myClass;
				$scope.columns = layout.createColumns($scope.myClass.students, 3);
			})
			.catch(error => console.log("error from getClass", error.message));
	};

	getClass();

});