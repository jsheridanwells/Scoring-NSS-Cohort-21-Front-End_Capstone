'use strict';
app.controller('classRosterViewCtrl', function ($scope, $routeParams, classFactory) {

	$scope.myClass = {};

	const getClass = () => {
		classFactory.getSingleClass($routeParams.classId)
			.then(myClass => {
				$scope.myClass = myClass;
			})
			.catch(error => console.log("error from getClass", error.message));
	};

	getClass();

});