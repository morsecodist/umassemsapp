app.service('GoogleSheets', function($http) {
  return {
    getSheet: function(url, id) {
      return $http({
        url: url,
        method: 'GET',
        params: {id: id}
      }).then(function(data) {
        return data.data;
      });
    }
  };
});
