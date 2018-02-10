'use strict';

const conn = require('../database/db');

class Util{

  searchDeudor(req,res,next){

    const busquedaQ = req.query.search,
      busqueda = !isNaN(busquedaQ) ? busquedaQ: busquedaQ.split("-"),
      search = {
        s1: Array.isArray(busqueda) ? busqueda[0] : busqueda +'%',
        s2: busqueda[1],
        s3: busqueda[2],
        s4: busqueda[3]
      };

    let query = '';

    if(!Array.isArray(busqueda)){
      query='SELECT * FROM "DEUDOR" d INNER JOIN "USUARIO" u ON d."ID_USUARIO" = u."ID_USUARIO" WHERE u."DNI" ILIKE ${s1}';
    } else if(busqueda.length===1){
      query='SELECT * FROM "DEUDOR" d INNER JOIN "USUARIO" u ON d."ID_USUARIO" = u."ID_USUARIO" WHERE u."NOMBRE" ILIKE CONCAT(${s1},\'%\') \n' +
        'OR u."APELLIDO_PATERNO" ILIKE CONCAT(${s1},\'%\') OR u."APELLIDO_MATERNO" ILIKE CONCAT(${s1},\'%\')';
    }else if(busqueda.length === 2){
      query='SELECT * FROM "DEUDOR" d INNER JOIN "USUARIO" u ON d."ID_USUARIO" = u."ID_USUARIO"\n' +
        ' WHERE (u."NOMBRE" ILIKE CONCAT(${s1},\' \',${s2},\'%\') ) \n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s2},\' \',${s1},\'%\') ) \n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s1},\'%\') AND u."APELLIDO_PATERNO" ILIKE CONCAT(${s2},\'%\')) \n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s2},\'%\') AND u."APELLIDO_PATERNO" ILIKE CONCAT(${s1},\'%\')) \n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s1},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s2},\'%\')) \n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s2},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s1},\'%\')) \n' +
        ' OR (u."APELLIDO_PATERNO" ILIKE CONCAT(${s1},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s2},\'%\')) \n' +
        ' OR (u."APELLIDO_PATERNO" ILIKE CONCAT(${s2},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s1},\'%\'))';
    }else if(busqueda.length === 3){
      query='SELECT * FROM "DEUDOR" d INNER JOIN "USUARIO" u ON d."ID_USUARIO" = u."ID_USUARIO"\n' +
        ' WHERE (u."NOMBRE" ILIKE CONCAT(${s1},\' \',${s2},\'%\') AND u."APELLIDO_PATERNO" ILIKE CONCAT(${s3},\'%\'))\n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s2},\' \',${s3},\'%\') AND u."APELLIDO_PATERNO" ILIKE CONCAT(${s1},\'%\'))\n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s1},\' \',${s2},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s3},\'%\'))\n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s2},\' \',${s3},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s1},\'%\'))\n' +
        ' OR (u."APELLIDO_PATERNO" ILIKE CONCAT(${s1},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s2},\'%\') ' +
        ' AND u."NOMBRE" ILIKE CONCAT(${s3},\'%\'))';
    }else if(busqueda.length === 4){
      query='SELECT * FROM "DEUDOR" d INNER JOIN "USUARIO" u ON d."ID_USUARIO" = u."ID_USUARIO"\n' +
        ' WHERE (u."NOMBRE" ILIKE CONCAT(${s1},\' \',${s2},\'%\') ' +
        ' AND u."APELLIDO_PATERNO" ILIKE CONCAT(${s3},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s4},\'%\'))\n' +
        ' OR (u."NOMBRE" ILIKE CONCAT(${s3},\' \',${s4},\'%\') ' +
        ' AND u."APELLIDO_PATERNO" ILIKE CONCAT(${s1},\'%\') AND u."APELLIDO_MATERNO" ILIKE CONCAT(${s2},\'%\'))';
    }

    conn.any(query, search)
      .then((data)=>{
        res.send(data);
      })
      .catch((err)=>{
        res.send(err);
      });

  }

  login(req,res,next){
    const usuario = {
      username: req.body.dni,
      pssw: req.body.pssw
    };

    conn.any('SELECT * FROM "USUARIO" WHERE "DNI"=${username} AND "PASSWORD"=md5(${pssw}||\'cobranza\'||\'cha\')', usuario)
      .then((data)=>{
        res.send(data);
      })
      .catch((err)=>{
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = Util;