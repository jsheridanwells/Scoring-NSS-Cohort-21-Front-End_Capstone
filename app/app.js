'use strict';

const app = angular.module('Scoring', ['ngRoute']);

// const isAuth = (userFactory) => userFactory.isAuthenticated();

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/splash.html',
		controller: 'userCtrl'
	});
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));