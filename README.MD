# Basic mean app

These are my notes to create a simple boilerplate for a full MEAN stack application

to get started:
- clone repo (`git clone git@github.com/rkristelijn/mean.git`)
- install global dependancies: (`sudo npm i -g nodemon gnomon nsp nsp-reporter-checkstyle`)
- install node_modules (`cd mean && npm i`)
- start app with linting, tests (`npm start --silent`)
- start app fast (`npm run start:fast --silent`)

Steps done:
- git init
- npm init
- created github repo
- added express and basic node app
- added chalk for console highlighting
- added linting using eslint
- added testing using mocha and chai
- added nodemon, restart test and lint
- added timing using gnomon
- time build, better output
- watch files and run npm-run-all on change

## The plan

- REST API and HATEOS (dev webserver, linting, routes, get, post, put, patch, unit tests, unit http tests, test data)
- OAuth/passport (local and github strategy, logout, save user in db, secure routes)
- Front-end basics (proxy, fetch, dev server for front-end, watching files and building, refactoring, testing)
- Front-end cosmetics (header, footer, menu, views, routes, secure routes, refactoring, testing)
- Front-end data (interfaces, services, refactoring, testing)
- e2e tests
- Best practices extracting POJO's, benchmark tests and optimalization
- Lessons learned

## Benchmark
### npm start
`
pi@pidev:~/mean $ npm start --silent
   0.3198s   [nodemon] 1.14.7
   0.3249s   [nodemon] to restart at any time, enter `rs`
   0.3260s   [nodemon] watching: *.*
   1.8071s   [nodemon] starting `npm run test:security && npm run test:unit && npm run lint && node index.js`
   4.1272s   Security testing...
   5.7052s   (+) No known vulnerabilities found
   8.1956s   Unit testing...
   8.2006s
   8.2089s
   8.2186s     Our first test
   8.2219s       ✓ should pass
   8.2242s
   8.2258s
   8.2270s     1 passing (33ms)
   9.7679s
  16.7243s   Linting...
  16.7258s   /home/pi/mean/api/books/book-controller.js (0/1)
  16.7271s     ⚠  26:79  Unexpected dangling '_' in '_id'  no-underscore-dangle
  16.7283s
  16.7294s   ⚠ 1 warning (09:37:42)
  16.7477s
  18.7277s
  18.8628s   Node v9.4.0: REST api running on http://0.0.0.0:3100
  19.8667s   MongoDB v3.0.14: connected on mongodb://localhost:27017/bookAPI

npm-run-all --parallel
Cpi@pidev:~/mean $ npm start --silent
   1.8998s   Security testing...
   1.9251s   Unit testing...
   3.2237s   Linting...
   3.2301s   [nodemon] 1.14.7
   3.2328s   [nodemon] to restart at any time, enter `rs`
   3.2363s   [nodemon] watching: *.*
   4.8198s   [nodemon] starting `node index.js`
   5.2188s   (+) No known vulnerabilities found
   5.2244s
   5.2393s
   5.2530s     Our first test
   5.2571s       ✓ should pass
   5.2605s
   5.2630s
   5.2653s     1 passing (46ms)
   5.6833s
   5.8163s   Node v9.4.0: REST api running on http://0.0.0.0:3100
   7.8221s   MongoDB v3.0.14: connected on mongodb://localhost:27017/bookAPI

`

## References
- [Running node in background](https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953#29042953)
- [Chalk colors](https://www.npmjs.com/package/chalk#256-and-truecolor-color-support)
- [Dockerize](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
