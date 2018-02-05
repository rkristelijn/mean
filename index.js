'use strict';

const express = require('express');
const chalk = require('chalk');

const PORT = 3100;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);

/* eslint-disable no-console */
console.log(
  chalk.yellow('Running on ') +
  chalk.blueBright(`http://${HOST}:${PORT}`)
);

