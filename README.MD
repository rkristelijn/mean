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
- added tests with sinon
- added findById + test
- REST API: CRUD operations for service - get, post, put, patch, delete
- added adapter to enable better testing
- added testing adapter and controller
- added supertest for intergration tests
- testing routes

todo:
- add sinon test for [chained function calls](https://stackoverflow.com/questions/37948135/how-do-i-stub-a-chain-of-methods-in-sinon)
- fix tightly coupled http and controller
- optimize HATEOS

## The plan

- [x] REST API and HATEOS (dev webserver, linting, routes, get, post, put, patch, unit tests, unit http tests, test data)
- [/] OAuth/passport (local and github strategy, logout, save user in db, secure routes)
- Front-end basics (proxy, fetch, dev server for front-end, watching files and building, refactoring, testing)
- Front-end cosmetics (header, footer, menu, views, routes, secure routes, refactoring, testing)
- Front-end data (interfaces, services, refactoring, testing)
- e2e tests
- Best practices extracting POJO's, benchmark tests and optimalization
- Lessons learned

## Benchmark


## References
- [Running node in background](https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953#29042953)
- [Chalk colors](https://www.npmjs.com/package/chalk#256-and-truecolor-color-support)
- [Dockerize](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [supertest api](https://github.com/visionmedia/supertest#api)
- [presentation about supertest](http://willi.am/node-mocha-supertest/)
