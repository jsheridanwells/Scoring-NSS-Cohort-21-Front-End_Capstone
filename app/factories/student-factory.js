'use strict';
app.factory('studentFactory', function ($q, $http, FBCreds) {

	//saves fb url
	let url = FBCreds.databaseURL;

	//adds new student to students collection w/ obj taken from studentCtrl
	const postStudent = (student) => {
		let newStudent = JSON.stringify(student);
		return $http.post(`${url}/students.json`, newStudent)
		.then(data => console.log("data from postStudent", data))
		.catch(error => console.log("error from postStudent", error.message));
	};

	return {postStudent};
});