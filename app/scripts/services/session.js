'use strict';

angular.module('appMagallanesApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
