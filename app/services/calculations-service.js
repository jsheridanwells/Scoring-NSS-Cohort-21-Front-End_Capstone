'use strict';

app.service('calculations', function(){

	// returns average of array of values passed in
	this.getAverage = (arr) => {
		console.log("getAverage", (arr.reduce((a,b) => a + b) / arr.length));
		return arr.reduce((a,b) => a + b) / arr.length;
	};

});