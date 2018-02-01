'use strict';

const Producto = require('../models/producto'),
  producto = new Producto(),
  router = require('express').Router();

router
  .get('/producto/', producto.getAll)
  .get('/producto/:id', producto.getOne)
  .post('/producto/', producto.insert)
  .put('/producto/:id', producto.update)
  .delete('/producto/:id', producto.delete);

module.exports = router;