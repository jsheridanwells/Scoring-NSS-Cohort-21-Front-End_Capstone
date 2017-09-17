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
			levelArr[index] = {Advanced : [], Proficient: [], Basic: [], BelowBasic: []};
			//for each student in each class, sort the students into a level based on test score
			item.students.forEach(student => {
				if (student.score >= 90) {
					levelArr[index].Advanced.push({student});
				} else if (student.score >= 80 && student.score < 90) {
					levelArr[index].Proficient.push({student});
				} else if (student.score >= 60 && student.score < 80) {
					levelArr[index].Basic.push({student});
				} else if (student.score < 60) {
					levelArr[index].BelowBasic.push({student});
				}
			});
		});

		return levelArr;
	};

	this.getLevelCounts = (proficiencyArr) => {
		return Object.keys(proficiencyArr).map(key => {
			return {levelName: key, levelCount: proficiencyArr[key].length};
		});
	};

});