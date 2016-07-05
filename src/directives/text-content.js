/* jshint esversion:6 */
app.directive('textContent', ['$window', ($window) => {
  return {
    restrict: 'E',
    scope: {
      one: '=',
      two: '=',
      content: '='
    },
    templateUrl: 'views/partials/text-content.html',
    link: (scope, element, attrs) => {
      function lineCheck() {
        var boxWidth = 0;
        document.querySelectorAll('div.flex > div.text-content').forEach((elem) => {
          if(elem.offsetWidth > boxWidth) boxWidth = elem.offsetWidth;
        });
        if(boxWidth > $window.innerWidth - 220)
          angular.element(document.querySelectorAll('.line')).addClass('hidden');
        else
          angular.element(document.querySelectorAll('.line')).removeClass('hidden');
      }
      angular.element($window).bind('resize', lineCheck);
      if(!mobilecheck()) lineCheck();
    }
  };
}]);
