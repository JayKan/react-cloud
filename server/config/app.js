'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const paths = require('./paths');

module.exports = app => {
  // server address
  app.set('host', process.env.HOST || 'localhost');
  app.set('port', process.env.PORT || 4000);

  // configure express to use bodyParser as middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // HTTP headers
  app.disable('x-powered-by');
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.hsts({ force: true, maxAge: 7776000000 })); // 90 days
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(helmet.ieNoOpen());

  // load gzipped js files
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
  // load gzipped css files
  app.get('*.css', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
  });

  // development mode only
  if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
  }

  // static files
  app.use(express.static(paths.static, { index: false }));
  app.use(favicon(paths.favicon));
};

