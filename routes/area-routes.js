'use strict';

const Area = require('../models/area'),
  area = new Area(),
  router = require('express').Router();

router
  .get('/area/', area.getAll)
  .get('/area/:id', area.getOne)
  .post('/area/', area.insert)
  .put('/area/:id', area.update)
  .delete('/area/:id', area.delete);

module.exports = router;