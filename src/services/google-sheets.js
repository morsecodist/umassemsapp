app.service('GoogleSheets', function($http) {
  return {
    getSheet: function(url, id) {
      return $http.jsonp(url, {
      params: {
        callback: 'JSON_CALLBACK',
        id: id
      }}).then(function(data) {
        return data.data;
      });
    }
  };
});
