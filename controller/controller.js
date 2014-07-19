//controller
angular.module('app', [])
  .controller('Ctrl', function ($scope) {

  })
  .directive('dirZero', function () {
    return {
      restrict: 'EA',
      controller: function ($scope, $element, $attrs, $log) {
        console.log('inside controller');
        $log.log('using injected service');
      },
      link: function () {
        console.log('in link');
      }
    }
  })