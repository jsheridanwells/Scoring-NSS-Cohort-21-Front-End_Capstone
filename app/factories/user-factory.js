'use strict';

app.factory('userFactory', function($q, $http) {

	//register a new user in firebase
	const registerUser = (user) => {
		return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
	};

	//login a user to firebase

	//logout a user from firebase

	//check if a user is authenticated

	//get the current user id

	return {
		registerUser
	};
});