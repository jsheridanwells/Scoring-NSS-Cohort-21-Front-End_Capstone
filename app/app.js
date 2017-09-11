'use strict';

const app = angular.module('Scoring', ['ngRoute']);

const isAuth = (userFactory) => userFactory.checkAuthenticated();

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