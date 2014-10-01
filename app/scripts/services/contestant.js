'use strict';

angular.module('appMagallanesApp')
  .factory('Contestant', function ($resource) {
    return $resource('', {}, { //parameters default
      save: {
        method: 'POST',
        params: {
          contestant: '@contestant',
        },
        url: '/api/contestant'
      },
      get: {
        method: 'GET',
        params: {},
        url: '/api/contestants',
        isArray: true
      },
      code: {
        method: 'GET',
        parmas: {},
        url: '/api/code'
      }
    });
  });