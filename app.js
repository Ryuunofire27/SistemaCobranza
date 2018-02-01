'use strict';

const express = require('express'),
  restFul = require('express-method-override')('_method'),
  bodyParser = require('body-parser'),
  routes = require('./routes/index');

let app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(restFul)
  .use(routes);

module.exports = app;