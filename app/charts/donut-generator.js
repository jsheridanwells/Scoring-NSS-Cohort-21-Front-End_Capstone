'use strict';
app.direction('donutChart', function() {
	function link(scope, el, attr) {
		let color = d3.scale.category10();
		let width = 200;
		let height = 200;
		let min = Math.min(width, height);
		let svg = d3.select(el[0].append('svg'));
		let pie = d3.layout.pie().sort(null);
		let arc = d3.svg.arc()
						.outerRadius(min / 2 * 0.9)
						.innerRadius(min / 2 * 0.5);

		svg.attr({
			width: width,
			height: height
		});

		let g = svg.append('g')
					.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let arcs = g.selectAll('path');

		scope.$watch('data', function(data){
			if (!data) {return;}
			arcs = arcs.data(pie(data));
			arcs.exit().remove();
			arcs.enter().append('path')
				.style('stroke', 'white')
				.attr('fill', function(d,i){return color(i);});
			arcs.attr('d', arc);

		}, true);

		return {
			link: link,
			restrict: 'E',
			scope: {data: '='}
		};

	}
});