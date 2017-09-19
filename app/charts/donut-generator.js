'use strict';

app.directive('donutChart', function() {

  const link = (scope, el, attr) => {

    //set height, width of canvas, set radius of donut chart based on canvas dimensions
    let width = 680, height= 500, radius = Math.min(width, height) /2;

    //associate color with proficiency level
    let color = ['#99d6ff', '#99ff99', '#ffff99', '#ff9999'];

    //create arc
    let arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(radius - 100);

    //create values for pie chart
    let pie = d3.layout.pie()
                        .sort(null)
                        .value(d => d.percentage);

    //append svg to angular custom directive
    let svg = d3.select(el[0]).append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    //watch for change in data object
    scope.$watch('data', function(data){

      //create arc with class .arc for every datum
      let g = svg.selectAll('.arc')
                  .data(pie(data))
                  .enter()
                  .append('g')
                  .attr('class', 'arc');

      //append path (arc) to svg, color set by color array, stroke white, 1px
      g.append('path')
                  .attr('d', arc)
                  .style('fill', (d,i) => color[i])
                  .style('stroke', '#fff');

      //append label to each arc, position offset by x: -30px
      g.append('text')
                  .attr('transform', d => {
                    let positionArr = arc.centroid(d);
                    return 'translate(' + (positionArr[0] - 30) + ',' + (positionArr[1]) + ')';
                  })
                  .attr('dy', '0.35em')
                  .html(d => {
                    console.log("d.data.percentage", d.data.percentage);
                    if (d.data.percentage != 0) {
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