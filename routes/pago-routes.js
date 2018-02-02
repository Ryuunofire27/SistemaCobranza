'use strict';

const Pago = require('../models/pago'),
  pago = new Pago(),
  router = require('express').Router();

router
  .get('/pago/', pago.getAll)
  .get('/pago/:id', pago.getOne)
  .post('/pago/', pago.insert);

module.exports = router;