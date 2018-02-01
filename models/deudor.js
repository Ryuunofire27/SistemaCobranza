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

  insert(req,res,next){
    const deudor = {
      id_usu: req.body.id_usu,
      estado: req.body.estado
    };
    conn.none('INSERT INTO "DEUDOR"\n' +
      '("ID_USUARIO","ESTADO")\n' +
      'VALUES (${id_usu},${estado})',
      deudor)
      .then(() => {
        res.send({msg: 'insertado con exito'});
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  update(req,res,next){
    const deudor = {
      id: req.params.id,
      estado: req.body.estado
    };
    conn.none('UPDATE "DEUDOR"\n' +
      'SET "ESTADO"=${estado} WHERE "ID_DEUDOR"=${id}',
      deudor)
      .then(() => {
        res.send({msg: 'modificado con exito'})
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  delete(req,res,next){
    const id = req.params.id;
    conn.result('DELETE FROM "DEUDOR" WHERE "ID_DEUDOR" = $1',id)
      .then((data)=>{
        if(data.rowCount === 0 ){
          throw new Error("No existe deudor con ese id");
        }
        res.send({msg:"Eliminado correctamente"});
      })
      .catch(err=>{
        res.status(500);
        res.send({error: err.message})
      });
  }

}

module.exports = Deudor;