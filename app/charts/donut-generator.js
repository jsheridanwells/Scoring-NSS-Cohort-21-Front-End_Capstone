'use strict';

app.directive('donutChart', function() {

  const link = (scope, el, attr) => {

    let width = 960, height= 500, radius = Math.min(width, height) /2;

    let color = ['#99d6ff', '#99ff99', '#ffff99', '#ff9999'];

    let arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(radius - 70);

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
                  .style('fill', (d,i) => color[i]);

      g.append('text')
                  .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
                  .attr('dy', '0.35em')
                  .html(d => {
                    return d.data.level + ' : ' + d.data.percentage + '%';
                  });

    }, true);

  };

  return {
    link: link,
    restrict: 'A',
    scope: {data: '='}
  };
});

//SAVE OLD VERSION
  // const link = (scope, el, attr) => {
  //   //sets color for each level in data array
  //   let color = ['#99d6ff', '#99ff99', '#ffff99', '#ff9999'];
  //   //sets width and height of SVG, radii of pie chart relative to these values
  //   let width = 350;
  //   let height = 350;
  //   let min = Math.min(width, height);
  //   let svg = d3.select(el[0]).append('svg');
  //   let pie = d3.layout.pie().sort(null);
  //   let arc = d3.svg.arc()
  //     .outerRadius(min / 2 * 0.9)
  //     .innerRadius(10);

  //   svg.attr({width: width, height: height});
  //   var g = svg.append('g')
  //     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  //   //when given an array for scope.data, svg updates with paths for chart
  //   scope.$watch('data', function(data) {

  //     let percentages = data.map(d => d.percentage);
  //     g.selectAll('path').data(pie(percentages))
  //         .enter().append('path')
  //         .style('stroke', 'white')
  //         .attr('d', arc)
  //         .attr('fill', function(d, i){ return color[i]; });

  //   }, true);
  // };