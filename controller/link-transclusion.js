//prelink & postlink & transclusion
'use strict';

angular.module('app', [])
  .controller('Ctrl', function ($scope) {

  })
  .directive('dirOne', function () {
    return {
      restrict: 'EACM',
      transclude: true,
      replace: true,
      template: '<div class="section">' +
        '<h3>Heading</h3>' +
        '<div ng-transclude></div>' +
        '</div>',
      link: {
        pre: function (iS, iE, iA) {
          console.dirxml('pre', iE);
          console.dirxml(document.getElementsByClassName('transclude'));
        },
        post: function (iS, iE, iA) {
          console.dirxml('post', iE);
          console.dirxml(document.getElementsByClassName('transclude'));
        }
      }
    }
  });
