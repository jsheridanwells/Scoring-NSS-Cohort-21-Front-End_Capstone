'use strict';

app.controller('userCtrl', function($scope, $window, userFactory) {

	//register input object
	$scope.account= {};

	//register
	$scope.register = () => {
		userFactory.registerUser($scope.account)
		.then(userData => {
			$scope.login();
		})
		.catch( error => console.log("error from register", error.message));
	};

	//login
	$scope.login = () => {
		userFactory.loginUser($scope.account)
		.then((data) => {
				$window.location.href = '#!/home';
			}
		)
		.catch( error => console.log("error from login", error.message ));
	};

	//logout
	$scope.logout = () => {
		userFactory.logoutUser()
		.then(() => {
			$window.location.href = '/';
		})
		.catch( error => console.log("error from logout", error.message ));
	};

});