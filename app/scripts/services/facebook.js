'use strict';

angular.module('appMagallanesApp')
  .factory('Facebook', function ($window, Contestant, $location) {
    var app_id = '608320152595205'; // id app Comparte SOAP Magallanes
    var pageId = '80371012674'; // id facebook page
    var key = '72hrsMagallanes201465';

    // var app_id = '640945482637353';
    // var key = '72hrsMagallanes201465';
    // var pageId = '113404485410722';
    var FB = $window.FB;


    FB.init({
      appId      : app_id,
      status     : true,
      xfbml      : true
    });

    var login = function(cb) {

      FB.login(function(response) {
        if (response.authResponse) {
          return cb();
        } else {
          return cb(false);
        }
     }, {scope: 'email,user_likes'});

    };

    var me = function(cb) {
      isAuth(function(err) {
        if (err) return cb(false);
        FB.api('/me', function(response) {
          if (!response || response.error) return cb(false);
          return cb(null, {
            uid: response.id,
            firstName: response.first_name,
            lastName: response.last_name,
            email: response.email
          });
        });
      });
    };

    var isAuth = function(cb) {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {

          return cb();
        } else if (response.status === 'not_authorized') {
          login(function(err) {
            if (err) return cb(false);
            return cb();
          });
        } else {
          login(function(err) {
            if (err) return cb(false);
            return cb();
          });
        };
      });
    };

    var isLike = function(cb) {
      me(function(err, me) {
        if (err) return cb(false);
        FB.api("/"+me.uid+"/likes/"+pageId, function (response) {
          if (!response) return cb(false);
          console.log(response.data.length);
          if (response.data.length > 0) {
            return cb();  
          } else {
            return cb(true);
          };
          
        });
      });
    };

    FB.Event.subscribe('edge.create', function(url, html_element) {
      angular.element('.like').remove();
    });


    isLike(function(err) {
      console.log(err);
      if (err) return false;
      angular.element('.like').remove();
    });
    var share = function(patent, code, cb) {
      var url = 'https://www.magallanes.cl/venta/index.aspx?key='+key+'&utm_source=facebook&utm_medium='+code+'&utm_campaign=SOAP2014&utm_content=compra_referida'
      me(function(err, me) {
        if (err) return cb(false);
        FB.ui({
          method: 'feed',
          link: url,
          picture: $location.$$absUrl+'images/compartir.jpg',
          name: 'Contrata tu SOAP 2014 desde $4.990 y por 10 compras realizadas a través de este link podré obtener mi seguro obligatorio  a COSTO $0',
          description: 'Tú también puedes tenerlo a costo $0 y ganar un Alfa Romeo Mito. Haz click aquí.'
        }, function(response){
          if (!response) return cb(false);
          var data = {
            uid: me.uid,
            firstName: me.firstName,
            lastName: me.lastName,
            email: me.email,
            patent: patent,
            code: code
          };
          return cb(null, data);
        });
      });
    };

    return {
      isShare: function(patent) {
        var _code;
        Contestant.code({}, function(data) {
            _code = data.code;
            share(patent, _code, function(err, data) {
              if (err) return false;
              Contestant.save({
                contestant: data
              }, function() {
                $location.path('/complete');
              }, function(err) {

              }).$promise
            });
          }, function(err) {}).$promise
      }
    }

  });
