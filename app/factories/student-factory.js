'use strict';
app.factory('studentFactory', function ($q, $http, FBCreds) {

	//saves fb url
	let url = FBCreds.databaseURL;

	// return array with students' names, uid, and uglyId
	const makeArray = (obj) => {
		return Object.keys(obj).map(key => {
			obj[key].id = key;
			return obj[key];
		});
	};

	//shows all students associated with current user
	const getAllStudents = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/students.json?orderBy="uid"&equalTo="${userId}"`)
			.then(students => resolve(makeArray(students.data)))
			.catch();
		});
	};

	//adds new student to students collection w/ obj taken from studentCtrl
	const postStudent = (student) => {
		let newStudent = JSON.stringify(student);
		return $http.post(`${url}/students.json`, newStudent)
		.then(data => console.log("data from postStudent", data))
		.catch(error => console.log("error from postStudent", error.message));
	};

	return {
		getAllStudents,
		postStudent
	};
});