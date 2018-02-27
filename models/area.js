'use strict';

const conn = require('../database/db');

class Area{

  getAll(req,res,next){
    conn.any('SELECT * FROM "AREA"')
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
    conn.one('SELECT * FROM "AREA" WHERE "ID_AREA" = $1',id)
      .then((data) => {
        if(data.rowCount===0){
          throw new Error('No existe un area con ese id');
        }
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  insert(req,res,next){
    const nombre= req.body.nombre;

    conn.none('INSERT INTO "AREA" VALUES (DEFAULT, $1 )',nombre)
      .then(() => {
        res.send({msg: 'insertado con exito'});
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  update(req,res,next){
    const area = {
      id: req.params.id,
      nombre: req.body.nombre
    };
    conn.none('UPDATE "AREA"\n' +
      'SET "NOMBRE"=${nombre} WHERE "ID_AREA"=${id}',
      area)
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
    conn.result('DELETE FROM "AREA" WHERE "ID_AREA" = $1',id)
      .then((data)=>{
        if(data.rowCount === 0 ){
          throw new Error("No existe area con ese id");
        }
        res.send({msg:"Eliminado correctamente"});
      })
      .catch(err=>{
        res.status(500);
        res.send({error: err.message})
      });
  }

}

module.exports = Area;