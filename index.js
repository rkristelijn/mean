const chalk = require('chalk');
const app = require('./app');
const PORT = 3100;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  /* eslint-disable no-console */
  console.log(
    chalk.green(`[>] Node ${process.version}: REST api running on `) +
    chalk.blueBright(`http://${HOST}:${PORT}`)
  );
});
