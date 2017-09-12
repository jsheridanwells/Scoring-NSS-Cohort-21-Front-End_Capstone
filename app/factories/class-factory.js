'use strict';
app.factory('classFactory', function ($q, $http, FBCreds) {

	//saves fb url
	let url = FBCreds.databaseURL;

	// return array with class names, uid, and uglyId
	const makeArray = (obj) => {
		return Object.keys(obj).map(key => {
			obj[key].id = key;
			return obj[key];
		});
	};

	//shows all classes associated with current user
	const getAllClasses = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/classes.json?orderBy="uid"&equalTo="${userId}"`)
				.then(classes => resolve(makeArray(classes.data)))
				.catch(error => console.log("error from getAllClasses", error.message));
		});
	};

	//adds new class to classes collection w/ object taken from classesCtrl
	const postClass = (classInfo) => {
		let newClass = JSON.stringify(classInfo);
		return $http.post(`${url}/classes.json`, newClass)
			.then(data => console.log("data from postStudents", data))
			.catch(error => console.log("error from postStudents", error.message));
	};

	const deleteClass = (classId) => {
		return $q((resolve, reject) => {
			$http.delete(`${url}/classes/${classId}.json`)
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};

	return {
		getAllClasses,
		postClass,
		deleteClass
	};

});