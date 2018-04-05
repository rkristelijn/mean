# Basic mean app

These are my notes to create a simple boilerplate for a full MEAN stack application

to get started:
- clone repo (`git clone git@github.com/rkristelijn/mean.git`)
- install global dependancies: (`sudo npm i -g nodemon gnomon nsp nsp-reporter-checkstyle`)
- install node_modules (`cd mean && npm i`)
- start app with linting, tests (`npm start --silent`)
- start app fast (`npm run start:fast --silent`)

Steps done:

[x] git init
[x] npm init
[x] created github repo
[x] added express and basic node app
[x] added chalk for console highlighting
[x] added linting using eslint
[x] added testing using mocha and chai
[x] added nodemon, restart test and lint
[x] added timing using gnomon
[x] time build, better output
[x] watch files and run npm-run-all on change
[x] added tests with sinon
[x] added findById + test
[x] REST API: CRUD operations for service - get, post, put, patch, delete
[x] added adapter to enable better testing
[x] added testing adapter and controller
[x] added supertest for intergration tests
[x] testing routes
[x] passport local strategy
[x] find out when to use let and const: const need to be assigned directly and cannot be reassigned.
[x] simple login form on url http://localhost:3100/api/auth/local/login
[x] remove console output
[x] chase linting errors
[-] merge code
[x] add tests

todo (low prio):
- login module
  - protected routes
  - connect user to passport in local-strategy
- Mockgoose doesn't run on the pi: unsupported architecture, ia32 and x64 are the only valid options
@see [github.com/mccormicka/Mockgoose/issues/231](https://github.com/mccormicka/Mockgoose/issues/231)
- add sinon test for [chained function calls](https://stackoverflow.com/questions/37948135/how-do-i-stub-a-chain-of-methods-in-sinon)
- fix tightly coupled http and controller
- optimize HATEOS
- implement helmet https://www.npmjs.com/package/helmet
- play around with nodegoat https://github.com/OWASP/NodeGoat

## The plan

- [x] REST API and HATEOS (dev webserver, linting, routes, get, post, put, patch, unit tests, unit http tests, test data)
- [ ] OAuth/passport (local and github strategy, logout, save user in db, secure routes)
- [ ] Front-end basics (proxy, fetch, dev server for front-end, watching files and building, refactoring, testing)
- [ ] Front-end cosmetics (header, footer, menu, views, routes, secure routes, refactoring, testing)
- [ ] Front-end data (interfaces, services, refactoring, testing)
- [ ] e2e tests
- [ ] Best practices extracting POJO's, benchmark tests and optimalization
- [ ] Lessons learned

## Benchmark


## References
- [Running node in background](https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953#29042953)
- [Chalk colors](https://www.npmjs.com/package/chalk#256-and-truecolor-color-support)
- [Dockerize](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [supertest api](https://github.com/visionmedia/supertest#api)
- [presentation about supertest](http://willi.am/node-mocha-supertest/)
