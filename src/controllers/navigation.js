/* jshint esversion:6 */
app.controller('PanelController', function($scope, $http, $state, $rootScope, GoogleSheets, marked, MobileCheck) {
  $scope.mobile = MobileCheck.check();

  $scope.checked = false;

  $scope.openMenu = () => $scope.checked = true;
  $scope.closeMenu = () => $scope.checked = false;
  $scope.toggleMenu = () => $scope.checked = !$scope.checked;
  function onData(data) {
    angular.element(document.getElementById($state.current.name)).addClass('selected');
    $rootScope.$on('$stateChangeStart',
      (event, toState, toParams, fromState, fromParams) => {
        angular.element(document.getElementById(toState.name)).addClass('selected');
        angular.element(document.getElementById(fromState.name)).removeClass('selected');
      });

    $scope.directors = data.Directors;
    $scope.staff = data.Staff;
    $scope.class = data.Class[0];
    $scope.cprCosts = data['CPR Costs'];
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
  }
  $http.jsonp('https://dune-eagle.hyperdev.space/content', {
    params: {
      callback: 'JSON_CALLBACK'
    }}).then(function(data) {
    return data.data;
  }).then((data) => onData(data))
  .catch((error) =>
    GoogleSheets.getSheet('https://script.google.com/macros/s/AKfycbztVcC1-T5tjTd8CQyIptJovEZDIQRNSz1JnwICh10_oQPUHDg/exec', '1c341g1M8VwbovXexk9H9Fh7CK2WhnOaGQV1VzZrfAho')
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
      alert("Fatal Error: This website is not working right now");
    })
  )
});
