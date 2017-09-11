'use strict';

const app = angular.module('Scoring', ['ngRoute']);

let isAuth = (userFactory) => new Promise ( (resolve, reject) => {
  userFactory.checkAuthenticated()
  .then( (userExists) => {
    if(userExists){
      resolve();
    }else {
      reject();
    }
  });
});

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
	.when('/classes', {
		templateUrl: 'partials/class-overview.html',
		controller: 'classViewCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));