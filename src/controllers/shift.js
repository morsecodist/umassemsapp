/* jshint esversion:6 */
app.controller('ShiftController', function($scope, $http, GoogleSheets, $cookies) {

  var preferences = $cookies.getObject('UmassEMS_shift_preferences');
  if(preferences) {
    $scope.one = preferences.one;
    $scope.two = preferences.two;
    $scope.vol = preferences.vol;

    $scope.sunday = preferences.sunday;
    $scope.monday = preferences.monday;
    $scope.tuesday = preferences.tuesday;
    $scope.wednesday = preferences.wednesday;
    $scope.thursday = preferences.thursday;
    $scope.friday = preferences.friday;
    $scope.saturday = preferences.saturday;

    $scope.morning = preferences.morning;
    $scope.afternoon = preferences.afternoon;
    $scope.evening = preferences.evening;

    $scope.mullins = preferences.mullins;
    $scope.fac = preferences.fac;
    $scope.other = preferences.other;
  } else {
    $cookies.putObject('UmassEMS_shift_preferences', {
      one: false,
      two: false,
      vol: false,
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      morning: true,
      afternoon: true,
      evening: true,
      mullins: true,
      fac: true,
      other: true
    });

    $scope.one = false;
    $scope.two = false;
    $scope.vol = false;

    $scope.sunday = true;
    $scope.monday = true;
    $scope.tuesday = true;
    $scope.wednesday = true;
    $scope.thursday = true;
    $scope.friday = true;
    $scope.saturday = true;

    $scope.morning = true;
    $scope.afternoon = true;
    $scope.evening = true;

    $scope.mullins = true;
    $scope.fac = true;
    $scope.other = true;
  }

  function updateCookie() {
    $cookies.remove('UmassEMS_shift_preferences');
    $cookies.putObject('UmassEMS_shift_preferences', {
      one: $scope.one,
      two: $scope.two,
      vol: $scope.vol,
      sunday: $scope.sunday,
      monday: $scope.monday,
      tuesday: $scope.tuesday,
      wednesday: $scope.wednesday,
      thursday: $scope.thursday,
      friday: $scope.friday,
      saturday: $scope.saturday,
      morning: $scope.morning,
      afternoon: $scope.afternoon,
      evening: $scope.evening,
      mullins: $scope.mullins,
      fac: $scope.fac,
      other: $scope.other
    });
  }

  $scope.filteredShifts = [];

  $scope.filter = () => {
    updateCookie();
    $scope.filteredShifts = $scope.allShifts.filter((shift) => {
      return (($scope.one && ($scope.one === shift.oneSlots > 0)) ||
        ($scope.two && ($scope.two === shift.twoSlots > 0)) ||
        ($scope.vol && ($scope.vol === shift.volSlots > 0))) &&

        (($scope.sunday && ($scope.sunday === (shift.day === 'Su'))) ||
        ($scope.monday && ($scope.monday === (shift.day === 'M'))) ||
        ($scope.tuesday && ($scope.tuesday === (shift.day === 'Tu'))) ||
        ($scope.wednesday && ($scope.wednesday === (shift.day === 'W'))) ||
        ($scope.thursday && ($scope.thursday === (shift.day === 'Th'))) ||
        ($scope.friday && ($scope.friday === (shift.day === 'Fr'))) ||
        ($scope.saturday && ($scope.saturday === (shift.day === 'Sa')))) &&

        (($scope.morning && ($scope.morning === (shift.callTime >= 340 && shift.callTime < 1140))) ||
        ($scope.afternoon && ($scope.afternoon === (shift.callTime >= 1140 && shift.callTime < 1740))) ||
        ($scope.evening && ($scope.evening === (shift.callTime >= 1740 && shift.callTime < 340)))) &&

        (($scope.fac && ($scope.fac === (shift.venue === 'FAC'))) ||
        ($scope.mullins && ($scope.mullins === (shift.venue === 'Mullins'))) ||
        ($scope.other && ($scope.other === (shift.venue !== 'FAC' && shift.venue !== 'Mullins'))));
    });
  };

  setInterval(() => GoogleSheets.getSheet('https://script.google.com/macros/s/AKfycbztVcC1-T5tjTd8CQyIptJovEZDIQRNSz1JnwICh10_oQPUHDg/exec', '1KU0v-lsoMF3JxgfInrtHki4zkiCcT5SXO2S33UqTJmM')
  .then((data) => {
    $scope.allShifts = data.Shifts.map((obj) => {
      var shift = {};
      shift.callTime = obj.Call_Time;
      shift.event = obj.Event;
      shift.venue = obj.Venue;
      shift.date = new Date(obj.Date);
      shift.dateString = shift.date.getMonth() + '/' +  shift.date.getDate();
      shift.day = weekDay(shift.date.getDay());
      shift.oneSlots = 0;
      shift.twoSlots = 0;
      shift.volSlots = 0;
      function addSlot(str) {
        if(str === 1) shift.oneSlots++;
        else if(str === 2) shift.twoSlots++;
        else if(str === "V") shift.volSlots++;
      }
      function weekDay(n) {
        if(n === 0) return "Su";
        if(n === 1) return "M";
        if(n === 2) return "Tu";
        if(n === 3) return "W";
        if(n === 4) return "Th";
        if(n === 5) return "F";
        if(n === 6) return "Sa";
      }
      addSlot(obj['EMT_#1']);
      addSlot(obj['EMT_#2']);
      addSlot(obj['EMT_#3']);
      addSlot(obj['EMT_#4']);
      addSlot(obj.Volunteer);
      return shift;
    });

    $scope.filter();

  }), 3000);
});
