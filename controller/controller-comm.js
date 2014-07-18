//inter-directive communication & controller
'use strict';

angular.module('app', [])
  .controller('Ctrl', function ($scope) {
    $scope.carProp = 'From controller';
  })

  .directive('car', function () {
    return {
      restrict: 'EA',
      controller: function ($scope) {

        //console.log($scope.carProp);

        $scope.carProp = [];

        //shared methods
        this.addAC = function () {
          $scope.carProp.push('AC')
        };
        this.addAW = function () {
          $scope.carProp.push('Alloy Wheel')
        }
        this.addABS = function () {
          $scope.carProp.push('ABS')
        }
      },
      link: function (scope, elem) {
        var facility;

        if(scope.carProp.length > 0){
          facility = scope.carProp.toString();
        } else {
          facility = 'nothing';
        }

        elem.text('This Car have ' + facility);
        elem.addClass('block');

        //console.log(scope.carProp);
      }
    }
  }).directive('ac', function () {
    return {
      restrict: 'EA',
      require: '^car',
      link: function (s, e, a, car) {
        car.addAC();
      }
    }
  }).directive('aw', function () {
    return {
      restrict: 'EA',
      require: '^car',
      link: function (s, e, a, car) {
        car.addAW();
      }
    }
  }).directive('abs', function () {
    return {
      restrict: 'EA',
      require: '^car',
      link: function (s, e, a, car) {
        car.addABS();
      }
    }
  })
