//controller
angular.module('app', [])
  .controller('Ctrl', function ($scope) {
    $scope.callFromCtrl = function () {
      console.log('controller method called');
    };
  })
  .directive('dirZero', function () {
    return {
      restrict: 'EA',
      controller: function ($scope, $element, $attrs, $log) {
        console.log('inside controller');
        $log.log('using injected service');
      },
      link: function (scope, elem, attr) {
        console.log('in link');
        elem.bind("mouseenter", function () {
          console.log('in apply');
          scope.$apply('callFromCtrl()');
//          scope.$apply(attr.callMethod);
        })
      }
    }
  })