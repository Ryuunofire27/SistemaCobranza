'use strict';

const Util = require('../models/util'),
  util = new Util(),
  router = require('express').Router();

router
  .get('/search',util.searchDeudor)
  .post('/login/', util.login);

module.exports = router;