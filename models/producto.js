'use strict';

const conn = require('../database/db');

class Producto{

  getAll(req,res,next){
    conn.any('SELECT * FROM "PRODUCTO"')
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
    conn.one('SELECT * FROM "PRODUCTO" WHERE "ID_PRODUCTO" = $1',id)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  insert(req,res,next){
    const producto = {
      nombre: req.body.nombre,
      precio: req.body.precio
    };
    conn.none('INSERT INTO "PRODUCTO"\n' +
      'VALUES (DEFAULT, ${nombre},${precio})',
      producto)
      .then(() => {
        res.send({msg: 'insertado con exito'});
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  update(req,res,next){
    const producto = {
      id: req.params.id,
      nombre: req.body.nombre,
      precio: req.body.precio
    };
    conn.none('UPDATE "PRODUCTO"\n' +
      'SET "NOMBRE"=${nombre},"PRECIO"=${precio} WHERE "ID_PRODUCTO"=${id}',
      producto)
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
    conn.result('DELETE FROM "PRODUCTO" WHERE "ID_PRODUCTO" = $1',id)
      .then((data)=>{
        if(data.rowCount === 0 ){
          throw new Error("No existe producto con ese id");
        }
        res.send({msg:"Eliminado correctamente"});
      })
      .catch(err=>{
        res.status(500);
        res.send({error: err.message})
      });
  }

}

module.exports = Producto;