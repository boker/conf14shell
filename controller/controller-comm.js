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

        $scope.carProp = [];

        //shared methods
        this.createPart = function (part) {
          $scope.carProp.push(part)
        };
      },
      link: function (scope, elem) {

        elem.text('This Car have ' + scope.carProp.toString());
        elem.addClass('block');

      }
    }
  }).directive('ac', function () {
    return {
      restrict: 'EA',
      require: '^car',
      link: function (s, e, a, car) {
        car.createPart('AC');
      },
      controller: function () {
        this.callFn = function () {
          console.log('calling ...');
        };
      }
    }
  }).directive('aw', function () {
    return {
      restrict: 'EA',
      require: '^car',
      link: function (s, e, a, car) {
        car.createPart('Alloy Wheel');
      }
    }
  }).directive('abs', function () {
    return {
      restrict: 'EA',
      require: '^car',
      link: function (s, e, a, car) {
        car.createPart('ABS');
      }
    }
  });
