'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    contestant = require('./controllers/contestant'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.get('/api/code', contestant.code);
  app.get('/api/csv', function(req, res, next) {
    console.log(req.session.passport.user);
    if (!req.session.passport.user) return res.redirect('/index');
    return next();
  }, contestant.csv);

  app.get('/api/contestants', contestant.index);
  app.post('/api/contestant', contestant.create);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  app.post('/*', function(req, res) {
    res.redirect('/');
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};