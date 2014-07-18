//Linking advanced - pre & post
'use strict';

angular.module('app', [])
  .controller('Ctrl', function ($scope) {

  })
  .directive('dirLink', function () {
    var linkFn = {
      pre: function (scope) {
        console.log('in pre linking, only modify scope object');
        scope.label = 'label-pre';
      },
      post: function (scope) {
        console.log('in post linking, DOM is ready');
        scope.label = 'label-post';
      }
    };
    return {
      restrict: 'EACM',
      template: '<div class="section">template : {{label}}</div>',
      compile: function (tE, tA) {
        return linkFn;
      },
      controller: function ($scope) {
        $scope.label = 'label';
      },
      link: linkFn
    }
  });
