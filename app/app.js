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
	.when('/student-create', {
		templateUrl: 'partials/student-create.html',
		controller: 'studentCreateCtrl',
		resolve: {isAuth}
	})
	.when('/assessment-scoring-overview', {
		templateUrl: 'partials/assessment-scoring-overview.html',
		controller: 'assessmentListCtrl',
		resolve: {isAuth}
	})
	.when('/score/:assessmentId', {
		templateUrl: 'partials/assessment-scoring-form.html',
		controller: 'assessmentScoringCtrl',
		resolve: {isAuth}
	})
	.when('/view-assessment/:assessmentId', {
		templateUrl: 'partials/view-assessment.html',
		controller: 'viewAssessmentCtrl',
		resolve: {isAuth}
	})
	.when('/view-assessment-class/:classId', {
		templateUrl: 'partials/view-class.html',
		controller: 'viewClassCtrl',
		resolve: {isAuth}
	})
	.when('/view-assessment-student/:studentId', {
		templateUrl: 'partials/view-student.html',
		controller: 'viewStudentCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});

app.run((FBCreds) => firebase.initializeApp(FBCreds));