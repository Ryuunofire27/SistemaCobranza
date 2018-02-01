'use strict';

const Deudor = require('../models/deudor'),
  deudor = new Deudor(),
  router = require('express').Router();

router
  .get('/deudor/', deudor.getAll)
  .get('/deudor/:id', deudor.getOne)
  .post('/deudor/', deudor.insert)
  .put('/deudor/:id', deudor.update)
  .delete('/deudor/:id', deudor.delete);

module.exports = router;