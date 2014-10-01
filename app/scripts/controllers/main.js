'use strict';

angular.module('appMagallanesApp')
  .controller('MainCtrl', function ($scope, Facebook, Contestant, $location) {
    $scope.contestant = {};

    $scope.create = function(form) {
      if (form.$valid) {
        var data = Facebook.isShare($scope.contestant.patent);
      };
    };
  });
