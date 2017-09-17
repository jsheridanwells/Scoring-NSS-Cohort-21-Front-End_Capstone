'use strict';

app.service('proficiencySort', function(){


	//inputs student score and outputs proficiency level
	this.assignLevel = (score) => {
		if (score >= 90) {
				return 'Advanced';
			} else if (score >= 80 && score < 90) {
				return 'Proficient';
			} else if (score >= 60 && score < 80) {
				return 'Basic';
			} else if (score < 60) {
				return 'BelowBasic';
			}
	};

	//checks array of student assessment results for proficiency levels and returns array with percentages
	this.calculateLevelPercentages = (studentArr) => {
		let percentagesArr = [];
		let advancedCount = 0, proficientCount = 0, basicCount = 0, belowBasicCount = 0;
		studentArr.forEach(student => {
			if (student.proficiency === 'Advanced') {
				advancedCount++;
			} else if (student.proficiency === 'Proficient') {
				proficientCount++;
			} else if (student.proficiency === 'Basic') {
				basicCount++;
			} else if (student.proficiency === 'BelowBasic') {
				belowBasicCount++;
			}
		});
		console.log("counts", advancedCount, proficientCount, basicCount, belowBasicCount);
		percentagesArr.push((advancedCount / studentArr.length) * 100);
		percentagesArr.push((proficientCount / studentArr.length) * 100);
		percentagesArr.push((basicCount / studentArr.length) * 100);
		percentagesArr.push((belowBasicCount / studentArr.length) * 100);
		return percentagesArr;
	};

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