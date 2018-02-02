'use strict';

const Deudor = require('../models/deudor'),
  deudor = new Deudor(),
  router = require('express').Router();

router
  .get('/deudor/', deudor.getAll)
  .get('/deudor/:id', deudor.getOne)
  .get('/deudor/:id/deudas', deudor.getDeudas)
  .get('/deudor/:id_deudor/deudas/:id_deuda',deudor.getDeudasById)
  .get('/deudor/:id_deudor/deudas/:id_deuda/pagos',deudor.getPagosByDeuda)
  .get('/deudor/:id/pagos',deudor.getPagos)
  .get('/deudor/:id_deudor/pagos/:id_pago',deudor.getPagosById)
  .get('/deudor/:id/productos',deudor.getProductos)
  .get('/deudor/:id_deudor/productos/:id_producto',deudor.getProductosById)
  .get('/deudor/:id_deudor/productos/:id_producto/pagos',deudor.getPagosByProducto)

module.exports = router;