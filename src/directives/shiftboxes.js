/* jshint esversion:6 */
app.directive('shiftboxes', () => {
  return {
    restrict: 'A',
    scope:  {
      shifts: '=info'
    },
    templateUrl: 'views/partials/shift.html'
  };
});
