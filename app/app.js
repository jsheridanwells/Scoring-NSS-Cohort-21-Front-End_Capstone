'use strict';

const app = angular.module('Scoring', ['ngRoute']);

const isAuth = (userFactory) => userFactory.checkAuthenticated();

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/register.html',  //during testing, toggle between splash.html and register.html
		controller: 'userCtrl'
	})
	.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'assessmentListCtrl',
		resolve: {isAuth}
	});
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));