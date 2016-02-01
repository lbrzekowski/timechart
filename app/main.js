var xScale, xAxis;

(function() {
  'use strict';

  var data = [
    {time: 1, value: 4},
    {time: 2, value: 8},
    {time: 3, value: 15},
    {time: 4, value: 16},
    {time: 5, value: 23},
    {time: 10, value: 42}
  ];
  var margin = {top: 10, right: 10, bottom: 20, left: 10};
  var height = 500;
  var width = $('#main').width();
  var barWidth = width / data.length;

  console.log('width:', width, ' barWidth: ', barWidth);

  var div = d3.select('.main');
  var chart = div.append('svg')
    .attr("width", width + 'px')
    .attr("height", '500px')
    .attr('class', 'chart');



  var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value})])
    .range([0, height]);

  xScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.time})])
    .range([0, width]);

  var xDomain = xScale.domain();
  barWidth = width / (xDomain[1] - xDomain[0]);


  xAxis = d3.svg.axis()
    .scale(xScale);

  var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) {
      var xBar = (d.time - 1) * barWidth + 1;
      return 'translate(' + xBar + ',' + (500 - yScale(d.value)) + ')'; });

  bar.append("rect")
    .attr("width", barWidth - 2)
    .attr("height", function(d, i) { return yScale(d.value) });

  bar.append("text")
    .attr("x", barWidth / 2)
    .attr("y", 10) //function(d) { return yScale(d) - 3; }
    .attr("dy", ".35em")
    .text(function(d) { return d.value; });

  var xAxisLine = chart.append("g")
    .attr({
      "class":   "x axis",
      transform: "translate(0," + (height - 20) + ")"
    })
    .call(xAxis);

  d3.select(window).on('resize', resize);

  function resize() {
    // update width
    width = $('#main').width();
    barWidth = width / data.length;

    //width = width - margin.left - margin.right;
    console.log('width:', width, ' barWidth: ', barWidth);
    // reset x range
    xScale.range([0, width]);


    // do the actual resize...
    // resize the chart
    chart
      //.style('height', (y.rangeExtent()[1] + margin.top + margin.bottom) + 'px')
      .style('width', (width) + 'px'); // + margin.left + margin.right

    chart.selectAll('rect')
      .attr('width', barWidth - 1);

    chart.selectAll('g')
      .attr('transform', function(d, i) {
        return 'translate(' + i * barWidth + ',' + (500 - yScale(d)) + ')'; });

    chart.selectAll('text')
      .attr('x', barWidth / 2);

    //chart.selectAll('rect.percent')
    //  .attr('width', function(d) { return x(d.percent); });
    //
    //// update median ticks
    //var median = d3.median(chart.selectAll('.bar').data(),
    //  function(d) { return d.percent; });
    //
    //chart.selectAll('line.median')
    //  .attr('x1', x(median))
    //  .attr('x2', x(median));
    //
    //
    //// update axes
    //chart.select('.x.axis.top').call(xAxis.orient('top'));
    //chart.select('.x.axis.bottom').call(xAxis.orient('bottom'));
    d3.select(window).on('resize', resize);
  }

})();

function rescale() {
  xScale.domain([0, 20]);
  d3.select(".x.axis")
    .transition().duration(1500).ease("sin-in-out")
  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
    .call(xAxis);
}

// zoom and rescale http://bl.ocks.org/stepheneb/1182434