/* jshint esversion:6 */
app.controller('PanelController', function($scope, $http, $state, $rootScope, GoogleSheets, marked) {
  GoogleSheets.getSheet('https://script.google.com/macros/s/AKfycbztVcC1-T5tjTd8CQyIptJovEZDIQRNSz1JnwICh10_oQPUHDg/exec', '1c341g1M8VwbovXexk9H9Fh7CK2WhnOaGQV1VzZrfAho')
  .then((data) => {
    angular.element(document.getElementById($state.current.name)).addClass('selected');
    $rootScope.$on('$stateChangeStart',
      (event, toState, toParams, fromState, fromParams) => {
        angular.element(document.getElementById(toState.name)).addClass('selected');
        angular.element(document.getElementById(fromState.name)).removeClass('selected');
      });

    // This call makes sure the page is loaded before it checks if the line is necessary
    // Doesn't check for mobile, not necessary
    if(!mobilecheck()) checkLine();
    $scope.directors = data.Directors;
    $scope.staff = data.Staff;
    $scope.class = data.Class[0];
    $scope.content = {};
    data.Content.forEach((obj) => $scope.content[obj.Title] = obj.Content);
    if($scope.class.Offered === 'No') {
      $scope.classMessage = 'There is no ' + $scope.class.Term + ' ' + $scope.class.Year + ' class offered';
      $scope.classOpen = 'closed';
    } else if($scope.class.Open === 'Open') {
      $scope.classMessage = 'Registration for the ' + $scope.class.Term + ' ' + $scope.class.Year + ' class is now open';
      $scope.classOpen = 'open';
    } else {
      $scope.classMessage = $scope.classMessage = 'Registration for the ' + $scope.class.Term + ' ' + $scope.class.Year + ' class is now closed';
      $scope.classOpen = 'closed';
    }
  });
});
