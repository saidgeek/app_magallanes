'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');
    
/**
 * Thing Schema
 */
var ContestantSchema = new Schema({
  uid: String,
  firstName: String,
  lastName: String,
  email: String,
  patent: String,
  code: String,
  CreatedAt: { type: Date, default: Date.now() }
});

ContestantSchema.virtual('fullName').get(function() {
  return this.firstName+' '+this.lastName;
});

ContestantSchema.pre('save', function(next) {
  return next();
});

mongoose.model('Contestant', ContestantSchema);
