'use strict';

angular.module('app', [])
.controller('Ctrl', function($scope){
	var scores = [
		{year: 2001, player:'Sachin', avg: 50},
		{year: 2002, player:'Sachin', avg: 60},
		{year: 2003, player:'Sachin', avg: 90},
		{year: 2004, player:'Sachin', avg: 60},
		{year: 2005, player:'Sachin', avg: 80},
		{year: 2001, player:'Jadeja', avg: 40},
		{year: 2002, player:'Jadeja', avg: 60},
		{year: 2003, player:'Jadeja', avg: 20},
		{year: 2004, player:'Jadeja', avg: 50},
		{year: 2005, player:'Jadeja', avg: 60}
	];

	$scope.applyFilters = function(){
		var playerScores = _.chain(scores).filter(function(score){
			return score.year >= $scope.startYear && score.year <=$scope.endYear;
		})
		.groupBy('player')
		.value();
		
		var filteredScores = [];
		_.forOwn(playerScores, function(playerScore, player){
			filteredScores.push({player: player, scores: _.map(playerScore, function(score){return score.avg;})});
		});
		$scope.filteredScores = filteredScores;
	};
})
.directive('barChart', function () {
	function drawChart(elem, dataLabels, series, config){
      var dataSeries = _.map(Object.keys(series), function(key){
      	return {data: series[key], name: key};
      });
		elem.highcharts({
            chart: {type: 'column'},
            tooltip:{enabled:false},
            title: {
                text: config.title
            },
            xAxis: {
                categories: dataLabels,
                title:""
            },
            yAxis:{
                title:"",
                gridLineWidth:0
            },
            plotOptions: {
                column: {
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true
	                },
                    showInLegend:true
	            }
            },
            series: dataSeries,
            credits:{enabled: false}
		});
	};

	return {
		restrict: 'E',
		scope: {
			labels: "="
		},
		controller: function($element, $scope, $attrs){
			var series = {};
			this.setSeries = function(name, data){
				series[name] = data;
				drawChart($element, $scope.labels, series, {title: $attrs.title});
			};
		}
	};
})
.directive('series', function () {
	return {
		require: ['^barChart','ngModel'],
		restrict: 'E',
		template: '',
		link: function(scope, elem, attrs, controllers){
			var barChart = controllers[0];
			var ngModel = controllers[1];
			ngModel.$render = function(){
				barChart.setSeries(attrs.title, ngModel.$modelValue);
			};
		}
	};
})