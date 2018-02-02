'use strict';

const conn = require('../database/db');

class Pago{

  getAll(req,res,next){
    conn.any('SELECT * FROM "PAGO"')
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
    conn.one('SELECT * FROM "PAGO" WHERE "ID_PAGO" = $1',id)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  insert(req,res,next){
    const monto = req.body.monto,
      id_deuda = req.body.id_deuda,
      id_cobrador = req.body.id_cobrador,
      date = new Date(),
      fecha = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    conn.func('insert_pago',[fecha,monto,id_deuda,id_cobrador])
      .then((data) => {
        if(data[0].insert_pago){
          res.send({msg: 'insertado con exito'});
        }
        throw new Error('No se ha podido insertar');
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

}

module.exports = Pago;