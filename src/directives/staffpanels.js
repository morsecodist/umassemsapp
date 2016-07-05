/* jshint esversion:6 */
app.directive('staffpanels', () => {
  return {
    restrict: 'A',
    scope:  {
      people: '=info'
    },
    templateUrl: 'views/partials/staff-panels.html'
  };
});
