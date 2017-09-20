'use strict';
app.factory('studentFactory', function ($q, $http, FBCreds) {

	//saves fb url
	let url = FBCreds.databaseURL;

	//sorts student names alphabetically by last name
	const sortAlphabetical = (objA, objB) => {
		if (objA.lastName < objB.lastName) {
			return -1;
		}
		if (objA.lastName > objB.lastName) {
			return 1;
		}
		return 0;
	};

	// return array with students' names, uid, and uglyId
	const makeArray = (obj) => {
		let myArray = Object.keys(obj).map(key => {
			obj[key].id = key;
			return obj[key];
		});
		return myArray.sort(sortAlphabetical);
	};

	//shows all students associated with current user
	const getAllStudents = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/students.json?orderBy="uid"&equalTo="${userId}"`)
				.then(students => resolve(makeArray(students.data)))
				.catch(error => console.log("error from getAllStudents", error.message));
		});
	};

	//returns one student object by student ID
	const getSingleStudent = (studentId) => {
		console.log("getSingleStudent Firing");
		return $q((resolve, reject) => {
			$http.get(`${url}/students/${studentId}.json`)
				.then(student => {
					student.data.id = studentId;
					resolve(student.data);
				})
				.catch(error => console.log("error from getSingleStudent", error.message));
		});
	};

	//adds new student to students collection w/ obj taken from studentCtrl
	const postStudent = (student) => {
		let newStudent = JSON.stringify(student);
		return $http.post(`${url}/students.json`, newStudent)
			.then(data => console.log("data from postStudent", data))
			.catch(error => console.log("error from postStudent", error.message));
	};

	//edits student details in students collection w/ obj taken from studentEditCtrl
	const editStudent = (obj, id) => {
		return $q((resolve, reject) => {
			let newObj = angular.toJson(obj);
			$http.patch(`${url}/students/${id}.json`, newObj)
				.then(data => resolve(data))
				.catch(error => reject(error));
		});
	};

	//deletes student from students collection by ID
	const deleteStudent = (studentId) => {
		return $q((resolve, reject) => {
			$http.delete(`${url}/students/${studentId}.json`)
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};

	return {
		getAllStudents,
		getSingleStudent,
		postStudent,
		editStudent,
		deleteStudent
	};
});