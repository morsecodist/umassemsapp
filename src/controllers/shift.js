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
      two: true,
      vol: true,
      dir: true,
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
    $scope.two = true;
    $scope.vol = true;

    $scope.dir = true;

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
      dir: $scope.dir,
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
        ($scope.friday && ($scope.friday === (shift.day === 'F'))) ||
        ($scope.saturday && ($scope.saturday === (shift.day === 'Sa')))) &&

        (($scope.morning && ($scope.morning === (shift.callTime >= 340 && shift.callTime < 1140))) ||
        ($scope.afternoon && ($scope.afternoon === (shift.callTime >= 1140 && shift.callTime < 1740))) ||
        ($scope.evening && ($scope.evening === (shift.callTime >= 1740 || shift.callTime < 340)))) &&

        (($scope.fac && ($scope.fac === (shift.venue === 'FAC'))) ||
        ($scope.mullins && ($scope.mullins === (shift.venue === 'Mullins'))) ||
        ($scope.other && ($scope.other === (shift.venue !== 'FAC' && shift.venue !== 'Mullins'))));
    });
  };

  function onData(data) {
    let shifts = data.Shifts;
    shifts = shifts.filter((shift) => shift.Event !== 'DIRECTOR PICK');
    // This will only fill them all in if the first one has a date
    shifts.map((shift, i) => {
      if(shift.Date === '' && i > 0) shift.Date = shifts[i - 1].Date;
      return shift;
    });

    shifts = shifts.map((obj) => {
      var shift = {};
      shift.callTime = obj.Call_Time;
      shift.event = obj.Event;
      shift.venue = obj.Venue;
      shift.date = new Date(obj.Date);
      shift.dateString = (shift.date.getMonth() + 1) + '/' +  shift.date.getDate();
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
      shift.directorPick = String(obj['EMT_#1']).toLowerCase() === 'director pick';
      return shift;
    });

    let meeting = (shifts[0].date.getDate() >= (new Date()).getDate())?0:1;

    // Converts dates into UTC time stamps from midnight on their given day
    function roundDate(timeStamp) {
      let rounded = timeStamp;
      rounded -= rounded % (24 * 60 * 60 * 1000);//subtract amount of time since midnight
      rounded += new Date().getTimezoneOffset() * 60 * 1000;//add on the timezone offset
      return (new Date(rounded)).getTime();
    }

    let cutoff = shifts.filter((shift) =>
      (shift.event === "") &&
      (roundDate(shift.date) >= roundDate(new Date())))[meeting];

    cutoff = cutoff?cutoff.date:shifts[shifts.length - 1].date;

    shifts = shifts.filter((shift) =>
      (shift.date > new Date()) &&
      (roundDate(shift.date) <= roundDate(cutoff)));

    $scope.directorPicks = shifts.filter((shift) =>
      shift.directorPick);

    $scope.allShifts = shifts;
    $scope.filter();
  }

  setInterval(() => GoogleSheets.getSheet('https://script.google.com/macros/s/AKfycbzYD_i_sRsJ47062S1KHT9lPpELKrL4pilZLMe4LLW5-F8InzOG/exec', '189rTX1Y5b_CAmvBcBXo2NZeNAxCil0vG5-nHHa69r0o')
  .then((data) => onData(data))
  /*.catch(() =>
    $http({
      url: 'https://dune-eagle.hyperdev.space/content',
      method: 'GET'
    })
    .then((data) => onData(data.data)))*/, 3000);
});
