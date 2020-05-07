# Home of [narok.io](https://narok.io).

[![CircleCI](https://circleci.com/gh/jscoobyced/narok.io.svg?style=svg)](https://circleci.com/gh/jscoobyced/narok.io)  
[![codecov](https://codecov.io/gh/jscoobyced/narok.io/branch/master/graph/badge.svg)](https://codecov.io/gh/jscoobyced/narok.io)

This is a full-stack application built from the [jsc-fe-be](https://github.com/jscoobyced/jsc-fe-be) template.

## Quick Start

You can run `docker-compose` to start the application:
```
docker-compose up -d
```
This will pull the image from docker repository. If you want to run a local build:
```
docker-compose -f docker-compose-dev.yml up --build -d
```

### Ports in use
The front-end application needs port 8080 to be available. Otherwise update in the [docker-compose.yml](./docker-compose.yml) end [docker-compose-dev.yml](./docker-compose-dev.yml) files.

## Front-End

![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/jscdroiddev/narokio-fe)

The Front-End consists of a TypeScript and ReactJS application that runs in a nginx docker container.

More details in Front-End [readme](./fe/README.md) file.

## Back-End

![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/jscdroiddev/narokio-be)

The Back-End consists of an akka Scala API that runs in a docker container.

More details in Front-End [readme](./be/README.md) file.
