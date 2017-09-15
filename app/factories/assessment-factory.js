'use strict';
app.factory('assessmentFactory', function ($q, $http, FBCreds) {

	//saves fb url
	let url = FBCreds.databaseURL;

	// // return array with assement names, uid, and uglyId
	// const makeArray = (obj) => {
	// 	return Object.keys(obj).map(key => {
	// 		obj[key].id = key;
	// 		return obj[key];
	// 	});
	// };

	const sortByDate = (objA, objB) => {
		if (objA.date < objB.date) {
			return -1;
		}
		if (objA.date > objB.date) {
			return 1;
		}
		return 0;
	};

	const makeArray = (obj) => {
		let myArray = Object.keys(obj).map(key => {
			obj[key].id = key;
			return obj[key];
		});
		return myArray.sort(sortByDate);
	};

	// returns all assessments from FB by user ID
	const getAllAssessments = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/assessments.json?orderBy="uid"&equalTo="${userId}"`)
				.then(assessments => {
					console.log("assessment from getAll", assessments.data);
					resolve(makeArray(assessments.data));
				})
				.catch(error => console.log("error from getAllAssessments", error.message));
		});
	};

	// gets one assessment from FB by assessmentId
	const getSingleAssessment = (assessmentId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/assessments/${assessmentId}.json`)
				.then(assessments => resolve(assessments.data))
				.catch(error => console.log("error from getSingleAssessment", error.message));
		});
	};

	//adds new assessment to FB
	const postAssessment = (obj) => {
		let newObj = angular.toJson(obj);
		return $http.post(`${url}/assessments.json`, newObj)
			.then( data => console.log("data from postAssessment", data))
			.catch(error => console.log("error from postAssessment", error.message));
	};

	//updates assessments with students' scores added to assessment object
	const updateAssessment = (id, obj) => {
		return $q((resolve, reject) => {
			let newObj = angular.toJson(obj);
			$http.patch(`${url}/assessments/${id}.json`, newObj)
			.then(response => resolve(response))
			.catch(error => reject(error));
		});
	};

	//removes an assessment from FB
	const deleteAssessment = (assessmentId) => {
		return $q((resolve, reject) => {
			$http.delete(`${url}/assessments/${assessmentId}.json`)
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};

	return {
		getAllAssessments,
		getSingleAssessment,
		postAssessment,
		updateAssessment,
		deleteAssessment
	};

});