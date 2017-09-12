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
	.when('/assessments', {
		templateUrl: 'partials/assessment-overview.html',
		controller: 'assessmentListCtrl',
		resolve: {isAuth}
	})
	.when('/assessment-create', {
		templateUrl: 'partials/assessment-create.html',
		controller: 'assessmentCreateCtrl',
		resolve: {isAuth}
	})
	.when('/classes', {
		templateUrl: 'partials/class-overview.html',
		controller: 'classListCtrl',
		resolve: {isAuth}
	})
	.when('/class-create', {
		templateUrl: 'partials/class-create.html',
		controller: 'classCreateCtrl',
		resolve: {isAuth}
	})
	.when('/students', {
		templateUrl: 'partials/student-overview.html',
		controller: 'studentListCtrl',
		resolve: {isAuth}
	})
	.when('/stuent-create', {
		templateUrl: 'partials/student-create.html',
		controller: 'studentCreateCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));