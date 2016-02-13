(function(){
  'use strict';

  var app = angular.module('timeChartApp', [
    'nvd3'
  ]);

  app.controller('MainApp', ['$scope', MainAppController]);

  function MainAppController($scope) {
    var vm = this;

    vm.options = {
      chart: {
        type: 'timeMultiChart',
        height: 450,
        margin : {
          top: 30,
          right: 60,
          bottom: 50,
          left: 70
        },
        color: d3.scale.category10().range(),
        //useInteractiveGuideline: true,
        duration: 500,
        xAxis: {
          tickFormat: function(d){
            //return d3.format(',f')(d);
            return d3.time.format('%x')(new Date(d));
          }
        },
        yAxis1: {
          tickFormat: function(d){
            return d3.format(',.1f')(d);
          }
        },
        yAxis2: {
          tickFormat: function(d){
            return d3.format(',.1f')(d);
          }
        }
      }
    };

    vm.data = [{
      key: "Cumulative Return",
      type: 'bar',
      yAxis: 1,
      values: [
        {x: 1420066800000, y: 29.765957771107},
        {x: 1422745200000, y: 0},
        {x: 1425164400000, y: 32.807804682612},
        {x: 1427839200000, y: 196.45946739256},
        {x: 1430431200000, y: 0.19434030906893},
        {x: 1433109600000, y: 98.079782601442},
        {x: 1435701600000, y: 13.925743130903},
        {x: 1438380000000, y: 5.1387322875705}
      ]
    }, {
      key: "Second serie",
      type: 'bar',
      yAxis: 1,
      values: [
        {x: 1420066800000, y: 29.765957771107},
        {x: 1422745200000, y: 0},
        {x: 1425164400000, y: 32.807804682612},
        {x: 1427839200000, y: 196.45946739256},
        {x: 1430431200000, y: 0.19434030906893},
        {x: 1433109600000, y: 98.079782601442},
        {x: 1435701600000, y: 13.925743130903},
        {x: 1438380000000, y: 5.1387322875705}
      ]
    }, {
      key: "third serie",
      type: 'line',
      yAxis: 1,
      values: [
        {x: 1420066800000, y: 29.765957771107},
        {x: 1422745200000, y: 28},
        {x: 1425164400000, y: 32.807804682612},
        {x: 1427839200000, y: 46.45946739256},
        {x: 1430431200000, y: 50.19434030906893},
        {x: 1433109600000, y: 58.079782601442},
        {x: 1435701600000, y: 33.925743130903},
        {x: 1438380000000, y: 35.1387322875705}
      ]
    }];
  }
})();