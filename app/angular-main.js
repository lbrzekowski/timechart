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
            return d3.format(',f')(d);
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
        {x: 1, y: 29.765957771107},
        {x: 2, y: 0},
        {x: 3, y: 32.807804682612},
        {x: 4, y: 196.45946739256},
        {x: 5, y: 0.19434030906893},
        {x: 6, y: 98.079782601442},
        {x: 7, y: 13.925743130903},
        {x: 8, y: 5.1387322875705}
      ]
    }];
  }
})();