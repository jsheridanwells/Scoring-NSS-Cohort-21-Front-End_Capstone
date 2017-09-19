'use strict';

app.service('layout', function () {

	//creates data for sorting long student list into three columns
	this.createColumns = (arr, colCount) => {
		let itemsPerColumn = Math.ceil(arr.length / colCount);
		let returnArr = [];
		for (let i = 0; i < arr.length; i += colCount) {
			let col = {start:i, end: Math.min(i + colCount, arr.length) };
			returnArr.push(col);
		}
		return returnArr;
	};
});


//slice filter to create 3 columns to display long lists
app.filter('slice', function () {
	return (arr, start, end) => arr.slice(start,end);
});