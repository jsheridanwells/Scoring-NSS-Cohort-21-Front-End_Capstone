'use strict';

app.controller('userCtrl', function($scope, userFactory) {

	//register input object
	$scope.account= {};

	//register
	$scope.register = () => {
		userFactory.registerUser($scope.account)
		.then(userData => console.log("userData from register", userData))
		.catch( error => console.log("error from register", error.message));
	};

	//login

	//logout

});