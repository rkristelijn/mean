# Basic mean app

These are my notes to create a simple boilerplate for a full MEAN stack application

to get started:
- clone repo (`git clonesh://git@github.com/rkristelijn/mean.git`)
- install node_modules (`cd mean && npm i`)
- start app (`npm start --silent`)

Steps done:
- git init
- npm init
- created github repo
- added express and basic node app
- added chalk for console highlighting
- added linting using eslint
- added testing using mocha and chai
- added nodemon, restart test and lint

## The plan

- REST API and HATEOS (dev webserver, linting, routes, get, post, put, patch, unit tests, unit http tests, test data)
- OAuth/passport (local and github strategy, logout, save user in db, secure routes)
- Front-end basics (proxy, fetch, dev server for front-end, watching files and building, refactoring, testing)
- Front-end cosmetics (header, footer, menu, views, routes, secure routes, refactoring, testing)
- Front-end data (interfaces, services, refactoring, testing)
- e2e tests
- Best practices extracting POJO's, benchmark tests and optimalization
- Lessons learned

## References
- [Running node in background](https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953#29042953)
- [Chalk colors](https://www.npmjs.com/package/chalk#256-and-truecolor-color-support)
- [Dockerize](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
