'use strict';

app.factory('userFactory', function($q, $http) {

	//store current user id information
	let currentUser = null;

	//register a new user in firebase
	const registerUser = (user) => {
		return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
	};

	//login a user to firebase
	const loginUser = (user) => {
		return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
	};

	//logout a user from firebase
	const logoutUser = () => {
		console.log("logout user firing");
		return firebase.auth().signOut();
	};

	const checkAuthenticated = function (){
        return new Promise ( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if (user){
                    currentUser = user.uid;
                    console.log("current user", currentUser);
                    resolve(true);
                }else {
                	console.log("current user", currentUser);
                    resolve(false);
                }
            });
        });
    };

	// //check if a user is authenticated
	// const checkAuthenticated = () => {
	// 	console.log("check authenticated firing");
	// 	return new Promise ((resolve, reject) => {
	// 		firebase.auth().onAuthStateChanged((user) => {
	// 			if (user) {
	// 				currentUser = user.uid;
	// 				resolve(true);
	// 			} else {
	// 				resolve(false);
	// 			}
	// 		});
	// 	});
	// };

	//get the current user id
	const getUserId = () => {
		return currentUser;
	};

	return {
		registerUser,
		loginUser,
		logoutUser,
		checkAuthenticated,
		getUserId
	};
});