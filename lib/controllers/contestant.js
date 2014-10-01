'use strict';

var csv = require('csv');

var mongoose = require('mongoose'),
    Contestant = mongoose.model('Contestant'),
    crypto = require('crypto');

exports.index = function(req, res) {
  Contestant.find({}, function(err, contestants) {
    if (err) return res.json(400, err);
    return res.json(200, contestants);
  });
};

exports.create = function(req, res) {
  if (req.body.contestant) {
    var contestant = new Contestant(req.body.contestant);
    contestant.save(function(err) {
      if (err) return res.json(400, err);
      console.log('OK', contestant);
      return res.json(200);
    });
  } else {
    return res,json(403)
  };
};

exports.code = function(req, res) {
  var code = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
  res.json(200, { code: code.substr(0,8) });
};

exports.csv = function(req, res) {
  var source = new Array();
  var result = new Array();
  Contestant.find({}, function(err, contestants) {
    if (err) return res.json(400, err);

    for(var i = 0; i < contestants.length; i++) {
      source.push(contestants[i].code+", "+contestants[i].firstName+''+contestants[i].lastName+", "+contestants[i].email+", "+contestants[i].patent+", "+contestants[i].uid+"\n");
    }
    console.log(source);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-disposition': 'attachment; filename=informe.csv'
    });
    csv()
    .from(source)
    .on('data', function(data){ 
      console.log(data);
        result.push(data);
    })
    .on('end', function(){
      return res.send(new Buffer(result.join()));
    });
  });
};





