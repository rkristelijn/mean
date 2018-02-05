const http = require('http');
const chalk = require('chalk');

const hostname = '0.0.0.0';
const port = 3100;


const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/plain');
	  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
	  console.log(
		  chalk.yellow(
			  `Server running at `) + 
		  chalk.blueBright(
			  `http://${hostname}:${port}/`
		  )
	  );
});
