'use strict';

const conn = require('../database/db');

class Deuda{

  getAll(req,res,next){
    conn.any('SELECT * FROM "DEUDA"')
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
    conn.one('SELECT * FROM "DEUDA" WHERE "ID_DEUDA" = $1',id)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  insert(req,res,next){
    const monto= req.body.monto,
      estado= req.body.estado,
      id_deudor = req.body.id_deudor,
      id_producto = req.body.id_producto;

    conn.func('insert_deuda', [monto, estado, id_deudor,id_producto])
      .then(() => {
        res.send({msg: 'insertado con exito'});
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  update(req,res,next){
    const deuda = {
      id: req.params.id,
      estado: req.body.estado
    };
    conn.none('UPDATE "DEUDA"\n' +
      'SET "ESTADO"=${estado} WHERE "ID_DEUDA"=${id}',
      deuda)
      .then(() => {
        res.send({msg: 'modificado con exito'})
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  delete(req,res,next){
    const id_deudor = req.body.id_deudor,
      id_producto = req.body.id_producto,
      id_deuda = req.body.id_deuda;

    conn.func('delete_deuda', [id_deudor,id_producto,id_deuda])
      .then((data)=>{
        if(data[0].delete_deuda === 0 ){
          throw new Error("No existe deuda con ese id");
        }
        res.send({msg:"Eliminado correctamente"});
      })
      .catch(err=>{
        res.status(500);
        res.send({error: err.message})
      });
  }

}

module.exports = Deuda;