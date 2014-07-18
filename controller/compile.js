//compile phase & scope in link, DOM transformation in compile & conditional transform
'use strict';

angular.module('app', [])
  .controller('Ctrl', function ($scope) {

  })
  .directive('compileDir', function () {
    return {
      restrict: 'E',
      template: '<div class="section">directive template</div>',
      scope: true,
      controller: function ($scope) {
        $scope.val = true;
      },
      compile: function (tElement, tAttrs) {
        console.log('inside compile ... adding new-class');
        tElement.children('.section').addClass('new-class');
        return function (scope, iElement, iAttrs) {
          if (scope.val) {
            console.log('inside link ... adding another-class');
            iElement.children('.section').addClass('another-class');
          }
        };
      }
    }
  });
