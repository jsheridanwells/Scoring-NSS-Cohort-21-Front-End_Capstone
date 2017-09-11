'use strict';

const app = angular.module('Scoring', ['ngRoute']);

let isAuth = (userFactory) => new Promise ( (resolve, reject) => {
  userFactory.checkAuthenticated()
  .then( (userExists) => {
    if(userExists){
    	console.log("authorized");
      resolve();
    }else {
    	console.log("not authorized");
      reject();
    }
  });
});


// const isAuth = (userFactory) => {
// 	userFactory.checkAuthenticated()
// 	.then((resolve) => {
// 		console.log("resolve", resolve);
// 		return resolve;
// 	});
// };

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/splash.html',
		controller: 'userCtrl'
	})
	.when('/register-login', {
		templateUrl: 'partials/register.html',
		controller: 'userCtrl'
	})
	.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'assessmentListCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));