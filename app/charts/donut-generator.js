'use strict';

app.directive('donutChart', function() {

  const link = (scope, el, attr) => {

    let width = 680, height= 500, radius = Math.min(width, height) /2;

    let color = ['#99d6ff', '#99ff99', '#ffff99', '#ff9999'];

    let arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(radius - 100);

    let pie = d3.layout.pie()
                        .sort(null)
                        .value(d => d.percentage);

    let svg = d3.select(el[0]).append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    scope.$watch('data', function(data){

      let g = svg.selectAll('.arc')
                  .data(pie(data))
                  .enter()
                  .append('g')
                  .attr('class', 'arc');

      g.append('path')
                  .attr('d', arc)
                  .style('fill', (d,i) => color[i])
                  .style('stroke', '#fff');

      g.append('text')
                  .attr('transform', d => {
                    let positionArr = arc.centroid(d);
                    return 'translate(' + (positionArr[0] - 30) + ',' + (positionArr[1]) + ')';
                  })
                  .attr('dy', '0.35em')
                  .html(d => {
                    if (d.data.percentage !== 0) {
                      return d.data.level + ' : ' + d.data.percentage + '%';
                    } else {
                      return '';
                    }
                  });

    }, true);

  };

  return {
    link: link,
    restrict: 'A',
    scope: {data: '='}
  };
});