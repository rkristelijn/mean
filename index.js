'use strict';

const express = require('express');
const chalk = require('chalk');

// Constants
const PORT = 3100;
const HOST = '0.0.0.0';

// // App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);

console.log(
	chalk.yellow('Running on ') +
	chalk.blueBright(`http://${HOST}:${PORT}`)
);

