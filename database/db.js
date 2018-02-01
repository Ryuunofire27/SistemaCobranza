'use strict';

const pgp = require('pg-promise')(),
  conf = require('./config'),
  db = pgp(conf);

module.exports = db;