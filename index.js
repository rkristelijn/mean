'use strict';

const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let env = {
  prod: 'mongodb://localhost/bookAPI',
  test: 'mongodb://localhost/bookAPI_test'
};

let dblink = env.prod;
/* eslint-disable no-unused-vars */
let db = mongoose.connect(dblink, (connectionErr, con) => {
  if(connectionErr) {
    /* eslint-disable no-console */
    console.log(
      chalk.red(`[>] MongoDB: could not connect to ${dblink}: `) +
      chalk.blueBright(connectionErr)
    );
  }
  let admin = new mongoose.mongo.Admin(mongoose.connection.db);
  admin.buildInfo((adminErr, info) => {
    let version = info.version;
    /* eslint-disable no-console */
    console.log(
      chalk.green(`[>] MongoDB v${version}: connected on `) +
      chalk.blueBright(`mongodb://${con.host}:${con.port}/${con.name}`)
    );
  });
});

const PORT = 3100;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let apiRouter = require('./api/api-router')();
app.use('/api', apiRouter);

app.listen(PORT, HOST, () => {
  /* eslint-disable no-console */
  console.log(
    chalk.green(`[>] Node ${process.version}: REST api running on `) +
    chalk.blueBright(`http://${HOST}:${PORT}`)
  );
});

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

module.exports = app;
