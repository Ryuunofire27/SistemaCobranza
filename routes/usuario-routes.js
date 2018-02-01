'use strict';

const Usuario = require('../models/usuario'),
  usu = new Usuario(),
  router = require('express').Router();

router
  .get('/usuario/', usu.getAll)
  .get('/usuario/:id', usu.getOne)
  .post('/usuario/', usu.insert)
  .put('/usuario/:id', usu.update)
  .put('/usuario/:id/changePSSW', usu.changePassword)
  .delete('/usuario/:id', usu.delete);

module.exports = router;