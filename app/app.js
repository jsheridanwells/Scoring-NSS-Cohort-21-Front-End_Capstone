'use strict';

const app = angular.module('Scoring', ['ngRoute']);

// const isAuth = (userFactory) => userFactory.isAuthenticated();

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/register.html',  //during testing, toggle between splash.html and register.html
		controller: 'userCtrl'
	});
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));