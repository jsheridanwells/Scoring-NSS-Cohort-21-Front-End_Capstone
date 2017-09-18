'use strict';

app.service('calculations', function(){

	// returns average of array of values passed in
	this.getAverage = (arr) => {
		console.log("arr.length", arr.length);
		let total = arr.reduce((a,b) => a + b);
		console.log("total", total);
		return total / arr.length;
	};

});