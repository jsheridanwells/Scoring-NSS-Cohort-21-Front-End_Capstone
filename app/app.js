'use strict';

const app = angular.module('Scoring', ['ngRoute']);

// const isAuth = (userFactory) => userFactory.isAuthenticated();

app.config(($routeProvider) => {
	// $routeProvider
	// .when('/', {})
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));