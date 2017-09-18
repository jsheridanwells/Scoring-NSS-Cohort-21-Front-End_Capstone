'use strict';

app.directive('barChart', function() {
	const link = (scope, el, attr) => {

		//helper function to set color of bar based on proficiency level
		const setColor = (score) => {
			if (score >= 90) {
				console.log("score", score);
				return 'Advanced-bar';
			} else if (score < 90 && score >= 80) {
				console.log("score", score);
				return 'Proficient-bar';
			} else if (score < 80 && score >= 60) {
				console.log("score", score);
				return 'Basic-bar';
			} else if (score < 60) {
				console.log("score", score);
				return 'BelowBasic-bar';
			}
		};

		//set up margins, space on left is for labels
		let margin = {top: 15, right: 25, bottom: 25, left: 200};

		//set height and width of SVG
		let width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		//create SVG
		let svg = d3.select(el[0]).append('svg')
									.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom)
									.append('g')
									.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		scope.$watch('data', function() {
			let data = scope.data;
			console.log("data", data);

			//create scale for x axis w/ highest score value in data set
			let x = d3.scale.linear()
							.range([0, width])
							.domain([0, d3.max(data, (d) => d.score)]);

			//create scale for y axis w/ number of assessment names
			let y = d3.scale.ordinal()
							.rangeRoundBands([height, 0], 0.1)
							.domain(data.map((d) => d.assessment));

			// y axis shows bar names
			let yAxis = d3.svg.axis()
								.scale(y)
								.tickSize(1)
								.orient('left');

			let gy = svg.append('g')
						.attr('class', 'y-axis')
						.call(yAxis);

			let bars = svg.selectAll('.bar')
							.data(data)
							.enter()
							.append('g');

			bars.append('rect')
					.attr('class', (d) => setColor(d.score))
					.attr('y', (d) => y(d.assessment))
					.attr('height', y.rangeBand())
					.attr('x', 0)
					.attr('width', (d) => x(d.score));

			bars.append('text')
				.attr('class', 'label')
				.attr('y', (d) => (y(d.assessment) + y.rangeBand() / 2) + 4)
				.attr('x', (d) => x(d.score) + 3)
				.text((d) => d.score + '%');

		}, true);
	};

	return {
		link: link,
		restrict: 'A',
		scope: {data: '='}
	};
});