'use strict';

const conn = require('../database/db');

class Usuario{

  getAll(req,res,next){
    conn.any('SELECT * FROM "USUARIO"')
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getOne(req,res,next){
    const id = req.params.id;
    conn.one('SELECT * FROM "USUARIO" WHERE "ID_USUARIO" = $1',id)
      .then((data) => {
        if(data.rowCount===0){
          throw new Error('No hay usuario con ese id');
        }
        res.send(data);
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  insert(req,res,next){
    const nombre= req.body.nombre,
      ape_pat= req.body.ape_pat,
      ape_mat= req.body.ape_mat,
      dni= req.body.dni,
      pssw= req.body.pssw,
      telefono= req.body.telefono,
      dir= req.body.dir,
      id_perfil = req.body.id_perfil;
    conn.func('insert_usuario',[nombre,ape_pat,ape_mat,dni,pssw,telefono,dir,id_perfil])
      .then(() => {
        res.redirect('/usuario/');
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message});
      });
  }

  update(req,res,next){
    const usuario = {
      id: req.params.id,
      nombre: req.body.nombre,
      ape_pat: req.body.ape_pat,
      ape_mat: req.body.ape_mat,
      telefono: req.body.telefono,
      dir: req.body.dir
    };
    conn.none('UPDATE "USUARIO"\n' +
      'SET "NOMBRE"=${nombre},"APELLIDO_PATERNO"=${ape_pat}, "APELLIDO_MATERNO"=${ape_mat}, "TELEFONO"=${telefono}, "DIRECCION"=${dir}\n' +
      'WHERE "ID_USUARIO"=${id}',
      usuario)
      .then(() => {
        res.redirect('/usuario/');
      })
      .catch(err => {
        res.status(500);
        console.log(err);
      });
  }

  changePassword(req,res,next){
    const usuario = {
      id: req.params.id,
      pssw: req.body.pssw,
      new_pssw: req.body.new_pssw,
      re_new_pssw: req.body.re_new_pssw
    };

    conn.any('SELECT * FROM "USUARIO" WHERE "ID_USUARIO" = ${id} AND "PASSWORD" = md5(${pssw}|| \'cobranza\'|| \'cha\')',usuario)
      .then((data) => {
        if(data.length !==0){
          if(usuario.new_pssw === usuario.re_new_pssw){
            conn.none('UPDATE "USUARIO" SET "PASSWORD" = md5(${new_pssw}||\'cobranza\'||\'cha\') WHERE "ID_USUARIO" = ${id}',usuario)
              .then(() => {
                res.redirect('/usuario')
              });
          }else{
            throw new Error("Contraseñas no coinciden");
          }
        }else{
          throw new Error("Contraseña equivocada");
       5 }
      })
      .catch(err => {
        res.status(500);
        res.send({error: err.message})
      });
  }

  delete(req,res,next){
    const id = req.params.id;
    conn.result('DELETE FROM "USUARIO" WHERE "ID_USUARIO" = $1',id)
      .then((data)=>{
        if(data.rowCount === 0 ){
          throw new Error("No existe usuario con ese id");
        }
        res.send({msg:"Eliminado correctamente"});
      })
      .catch(err=>{
        res.status(500);
        res.send({error: err.message})
      });
  }

}

module.exports = Usuario;