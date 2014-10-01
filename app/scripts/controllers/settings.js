'use strict';

angular.module('appMagallanesApp')
  .controller('SettingsCtrl', function ($window, $scope, Contestant) {
    $scope.contestants = {}
    $scope.errors = {};

    Contestant.get({}, function(contestants) {
      $scope.contestants = contestants;
    }).$premise

    $scope.csv = function() {
      $window.location = '/api/csv';
    };
  });
