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
		var filteredScores = [];
		var playerScores = _.chain(scores).filter(function(score){
			return ($scope.startYear==undefined || score.year >= $scope.startYear) && ($scope.endYear==undefined || score.year <=$scope.endYear);
		})
		.groupBy('player')
		.value();
		
		_.forOwn(playerScores, function(playerScore, player){
			filteredScores.push({player: player, scores: _.map(playerScore, function(score){return score.avg;})});
		});

		$scope.labels = [];
		var yearlyGrouped = _.chain(scores).filter(function(score){
			return ($scope.startYear==undefined || score.year >= $scope.startYear) && ($scope.endYear==undefined || score.year <=$scope.endYear);
		})
		.groupBy('year')
		.value();
		_.forOwn(yearlyGrouped, function(yearlyScore, year){
			$scope.labels.push(year);
		});
		$scope.filteredScores = filteredScores;
	};

	$scope.applyFilters();
})
.directive('barChart', function () {
	return {
		restrict: 'E',
		transclude: true,
		template: '<div ng-transclude></div>'
					+ '<div></div>',
		scope: {
			labels: "="
		},
		controller: function($element, $scope, $attrs){
			var series = {};
			var drawOnElement = $($element[0].childNodes[1]);
			this.setSeries = function(name, data){
				series[name] = data;
				drawChart(drawOnElement, $scope.labels, series, {title: $attrs.title});
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