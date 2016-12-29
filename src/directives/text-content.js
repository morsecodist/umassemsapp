/* jshint esversion:6 */
app.directive('textContent', ['$window', 'MobileCheck', ($window, MobileCheck) => {
  return {
    restrict: 'E',
    scope: {
      one: '=',
      two: '=',
      content: '='
    },
    templateUrl: 'views/partials/text-content.html'
  };
}]);
