
nv.models.coverBars = function() {
  'use strict';

  var container = null
    , margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , duration = 500
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd')
  ;

  var renderWatch = nv.utils.renderWatch(dispatch, duration)
    ;

  function chart(selection) {
    renderWatch.reset();
    selection.each(function(data) {
      container = d3.select(this);
      var availableWidth = nv.utils.availableWidth(width, container, margin),
        availableHeight = nv.utils.availableHeight(height, container, margin);
      nv.utils.initSVG(container);


      var d0 = [];
      var max = 8;//Math.floor(Math.random() * 10);
      console.log('max: ', max);
      for (var j = 0; j < max;j++) {
        d0.push(1);
      }
      var d = [{values: d0}];

      var wrap = container.selectAll('g.nv-cover-bars').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-cover-bars');
      var gEnter = wrapEnter.append('g').attr('class', 'nv-cover-bars-ch');

      var coverBars = wrap.select('.nv-cover-bars-ch').selectAll('rect.nv-cover')
        .data(function(d) {
          console.log(d, d[0].values);
          var r = d[0].values;
          return r;
        });
      coverBars.exit().remove();

      //var w = availableWidth / 8;
      var barsEnter = coverBars.enter().append('rect')
        .attr('class', 'nv-cover')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', availableHeight)
        .attr('width',
          function(d,i,j) {
          var w = availableWidth / 8;
          console.log('rangeBand', w); //bars1.xScale().rangeBand()
          return w;
        })
        .attr('transform', function(d,i) {
          var w = availableWidth / 8;
          //console.log('transform', i, getX(d), x(getX(d)));
          return 'translate(' + (w * i) + ',0)'; })  //(x(getX(d)) - bars1.xScale().rangeBand()/2)
        ;

      coverBars
        .attr('transform', function(d,i) {
          var w = availableWidth / 8;
          return 'translate(' + (w * i) + ',0)';
        })
      ;

      var barSelection =
        coverBars.watchTransition(renderWatch, 'covers', Math.min(250, duration))
          .delay(function(d,i) {
            return i * duration / data[0].values.length;
          });

      barSelection
        //.attr('x', function(d,i) {
        //  return d.series * x.rangeBand() / data.length;
        //})
        .attr('width',availableWidth / data[0].values.length)
        //.attr('y', function(d,i) {
        //  return getY(d,i) < 0 ?
        //    y(0) :
        //    y(0) - y(getY(d,i)) < 1 ?
        //    y(0) - 1 :
        //    y(getY(d,i)) || 0;
        //})
        .attr('height', availableHeight)
        //.attr('height', function(d,i) {
        //  return Math.max(Math.abs(y(getY(d,i)) - y(0)),1) || 0;
        //})
      ;


    });
    renderWatch.renderEnd('covers immediate');
    return chart;
  }

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart._options = Object.create({}, {
    // simple options, just get/set the necessary values
    width:   {get: function(){return width;}, set: function(_){width=_;}},
    height:  {get: function(){return height;}, set: function(_){height=_;}}

  });

  nv.utils.initOptions(chart);

  return chart;
};