'use strict';

const Deuda = require('../models/deuda'),
  deuda = new Deuda(),
  router = require('express').Router();

router
  .get('/deuda/', deuda.getAll)
  .get('/deuda/:id', deuda.getOne)
  .post('/deuda/', deuda.insert)
  .put('/deuda/:id', deuda.update)
  .delete('/deuda/:id', deuda.delete);

module.exports = router;