//life cycle
'use strict';

angular.module('app', [])
  .controller('Ctrl', function ($scope) {

  })
  .directive('dirOne', function () {
    return {
      restrict: 'EA',
      template: '<div>template</div>',
      controller: function () {
        console.log('in ctrl');
      },
      compile : function(){
        console.log('in compile');
        return function(){
          console.log('this is link function');
        };
      },
      link : function(){
        console.log('in link');
      }
    }
  });
