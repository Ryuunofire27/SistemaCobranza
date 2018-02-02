'use strict';

const conn = require('../database/db');

class Deudor{

  getAll(req,res,next){
    conn.any('SELECT * FROM "DEUDOR" as deu INNER JOIN "USUARIO" as usu ON usu."ID_USUARIO"=deu."ID_USUARIO"')
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  getOne(req,res,next){
    const id = req.params.id;
    conn.one('SELECT * FROM "DEUDOR" as deu INNER JOIN "USUARIO" as usu ON usu."ID_USUARIO"=deu."ID_USUARIO" WHERE "ID_DEUDOR" = $1',id)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  getProductos(req, res, next){
    const id = req.params.id;

    conn.any('SELECT pro.* FROM "PRODUCTO" pro INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ON dpd."ID_DEUDOR"=$1 AND dpd."ID_PRODUCTO"=pro."ID_PRODUCTO"',
      id)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  getProductosById(req, res, next){
    const id_deudor = req.params.id_deudor,
      id_producto = req.params.id_producto;

    conn.any('SELECT pro.* FROM "PRODUCTO" pro INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ' +
      'ON dpd."ID_DEUDOR"=$1 AND dpd."ID_PRODUCTO"=pro."ID_PRODUCTO" WHERE pro."ID_PRODUCTO"=$2',
      [id_deudor,id_producto])
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  getDeudas(req, res, next){
    const id = req.params.id;

    conn.any('SELECT deuda.* FROM "DEUDA" deuda INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ON dpd."ID_DEUDOR"=$1 AND dpd."ID_DEUDA"=deuda."ID_DEUDA"',
      id)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  getDeudasById(req, res, next){
    const id_deudor = req.params.id_deudor,
      id_deuda = req.params.id_deuda;

    conn.any('SELECT deuda.* FROM "DEUDA" deuda INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ' +
      'ON dpd."ID_DEUDOR"=$1 AND dpd."ID_DEUDA"=deuda."ID_DEUDA" WHERE deuda."ID_DEUDA"=$2',
      [id_deudor,id_deuda])
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  getPagos(req, res, next){
    const id = req.params.id;

    conn.any('SELECT pago.* FROM "PAGO" pago INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ON dpd."ID_DEUDOR"=$1 AND dpd."ID_DEUDA"=pago."ID_DEUDA"',
      id)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  getPagosById(req, res, next){
    const id_deudor = req.params.id_deudor,
      id_pago = req.params.id_pago;

    conn.any('SELECT pago.* FROM "PAGO" pago INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ' +
      'ON dpd."ID_DEUDOR"=$1 AND dpd."ID_DEUDA"=pago."ID_DEUDA" WHERE pago."ID_PAGO"=$2',
      [id_deudor,id_pago])
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  getPagosByDeuda(req, res, next){
    const id_deudor = req.params.id_deudor,
      id_deuda = req.params.id_deuda;

    conn.any('SELECT pago.* FROM "PAGO" pago INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ' +
      'ON dpd."ID_DEUDOR"=$1 AND dpd."ID_DEUDA"=pago."ID_DEUDA" WHERE pago."ID_DEUDA"=$2',
      [id_deudor,id_deuda])
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  getPagosByProducto(req, res, next){
    const id_deudor = req.params.id_deudor,
      id_producto = req.params.id_producto;

    conn.any('SELECT pago.* FROM "PAGO" pago INNER JOIN "DEUDOR_PRODUCTO_DEUDA" dpd ' +
      'ON dpd."ID_DEUDOR"=$1 AND dpd."ID_DEUDA"=pago."ID_DEUDA" WHERE dpd."ID_PRODUCTO"=$2',
      [id_deudor,id_producto])
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

}

module.exports = Deudor;