/* jshint esversion:6 */
app.controller('PanelController', function($scope, $http, $state, $rootScope, GoogleSheets, marked, MobileCheck) {

  // Check if mobile, for using mobile menu
  $scope.mobile = MobileCheck.check();

  // Members for toggling mobile menu
  $scope.checked = false;

  $scope.openMenu = () => $scope.checked = true;
  $scope.closeMenu = () => $scope.checked = false;
  $scope.toggleMenu = () => $scope.checked = !$scope.checked;

  // Adds the content data to scope, Called when content data is recieved
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

    // Create english messages for site open/close status
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
    $scope.content['Group Photo'] = 'https://lh3.googleusercontent.com/hvdCqVz7gyvfANz3bDsL2FYrsa8HQMMAgo4uLiMzHlAwzNiFy77yljrr-MA726FHRWzbVoIKcBW2RxLehpK3UORYzFIMon-jtvW7NOzdLjLnx9Y0YtJjOSoOZesJ52Y_OCM7FOMUy1t3ioetzASLKsKg0aTqHV1I4b-qI2Nerlz9VySF6Y46rXB74TsgSKvyQrGtdaPBbEtDcGwYyv-e2gx9yQnsorXs3NWoKYz-eZyGAHUyyk_PqcHaf52eGXaXAwSpELlpfDvaMKQrV_Ju2aAk3MkgcxXxBU3nqSkexFuxABhv4MVOQPh4ISedysOZfXXuoID2TfZGIf8Y94yBHkXNWdWSmR39UgaUyeSryZ51E5wOuCcUTbwGTLv7i4PRcO8t2mFysHjSfGXPTRpvKUZlOVYt7GsNI4PvTvzjH9PLYwwgX6RNhP07K9fOk-MvTby5VVBdobto9n3oIPSYrQ3-J_fq_mBzbpx4q-RL4HGCYTEEJ_ZtPJux1nTQcj5fpG2syLn01YE1mhNUxTU0K67azmA3zhQeRvLEcNoLodJXuKsbHTN-1IXmnroEUX5qtVx60Y_SrkZv_afyYk22BBxt2r_77A=w1909-h969-k';
  }

  // Get website content from the google sheet and pass to onData
  $http.jsonp("https://dune-eagle.gomix.me/content", { params: { callback: "JSON_CALLBACK" } })
  .then((data) => onData(data.data))
  .catch((error) => {
    console.log(error);
    GoogleSheets.getSheet('https://script.google.com/macros/s/AKfycbztVcC1-T5tjTd8CQyIptJovEZDIQRNSz1JnwICh10_oQPUHDg/exec', '1c341g1M8VwbovXexk9H9Fh7CK2WhnOaGQV1VzZrfAho')
    .then((data) => onData(data))
    .catch((error) => {
      // If the content fails to load the website will not work
      console.log(error);
      alert("Fatal Error: This website is not working right now");
    });
  })
});
