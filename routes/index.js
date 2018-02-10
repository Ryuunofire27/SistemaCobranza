'use strict';

const router = require('express').Router(),
  usu_routes = require('./usuario-routes'),
  producto_routes = require('./producto-routes'),
  deudor_routes = require('./deudor-routes'),
  deuda_routes = require('./deuda-routes'),
  pago_routes = require('./pago-routes'),
  area_routes = require('./area-routes'),
  util_routes = require('./util-routes');

router
  .use(usu_routes)
  .use(producto_routes)
  .use(deudor_routes)
  .use(deuda_routes)
  .use(pago_routes)
  .use(area_routes)
  .use(util_routes);

module.exports = router;