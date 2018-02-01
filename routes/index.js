'use strict';

const router = require('express').Router(),
  usu_routes = require('./usuario-routes'),
  producto_routes = require('./producto-routes'),
  deudor_routes = require('./deudor-routes'),
  deuda_routes = require('./deuda-routes');

router
  .use(usu_routes)
  .use(producto_routes)
  .use(deudor_routes)
  .use(deuda_routes);

module.exports = router;