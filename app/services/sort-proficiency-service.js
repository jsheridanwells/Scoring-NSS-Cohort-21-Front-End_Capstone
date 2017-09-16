'use strict';

app.service('proficiencySort', function(){

	//takes single assessment and sorts students into classes and proficiency levels
	this.sortByLevel = (assessmentObj) => {
		//create an array to hold classes and sorted students
		let levelArr = [];
		//make length of levelArr equal to the number of classes
		levelArr.length = assessmentObj.classes.length;
		//sort for each class
		assessmentObj.classes.forEach((item, index) => {
			//construct an object of categories for each class
			levelArr[index] = {advanced : [], proficient: [], basic: [], belowBasic: []};
			//for each student in each class, sort the students into a level based on test score
			item.students.forEach(student => {
				if (student.score >= 90) {
					levelArr[index].advanced.push({student});
				} else if (student.score >= 80 && student.score < 90) {
					levelArr[index].proficient.push({student});
				} else if (student.score >= 60 && student.score < 80) {
					levelArr[index].basic.push({student});
				} else if (student.score < 60) {
					levelArr[index].belowBasic.push({student});
				}
			});
		});

		return levelArr;
	};

});