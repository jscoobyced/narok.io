# Docker Front-End And Back-End

This project is a skeleton to create a full-stack web-application.

The Front-End consists of a TypeScript and ReactJS application that runs in a nginx docker container.

The Back-End consists of an akka Scala API that runs in a docker container.

The [docker-compose](docker-compose.yml) file allows to start the whole stack:
```
docker-compose up -d
```

The application will be available at [http://localhost](http://localhost).

## Development
### Front-End

The Front-End application is a pure javascript application running as static resources in the nginx server.

It is located in the `fe` folder and support the following commands:
- `yarn lint`: runs the ES Linter. You can customize the rules in [fe/.eslintrc.json](fe/.eslintrc.json)
- `yarn start`: this will start the application in `development` mode, with hot-reload. It is useful while implementing the Front-End code
- `yarn test`: runs the ES Linter then the Jest tests. It also generates coverage in the `coverage` folder.
- `yarn test:coverage`: runs the same as `yarn test` but also display the test coverage on the console.
- `yarn build`: generates all the assets and place them in the `dist` folder.
- `yarn dist`: generates all the assets and zip them in root fodler. You must have [7z](https://www.7-zip.org/) installed and available in the PATH.

You can use the `fe/public` fodler to place any static assets. They will be copies at the root of the web-application folder. You can create sub-folders if you don't want to mix everything.

### Back-End

The Back-End application is a scala application running APIs.

It is located in the `be` folder and support the following commands:
- `sbt compile`: builds the project.
- `sbt run`: starts the application. It will be available on [http://localhost:8080](http://localhost:8080).

### Ports in use

If you want to change the ports, you can edit the [docker-compose](docker-compose.yml)
```
  jscfe:
    ...
    ports:
      - "80:80"
  jscbe:
    ...
    ports:
      - "8080:8080"
```
and modify the left side the "portA:portB" settings. If you change the Back-End API port binding, you must also update the Front-End application configuration to use this port in [fe/src/services/config/config.json](fe/src/services/config/config.json):
```
{
    "api": {
        "port": 8080
    }
    ...
}
```

---
This is still work in progress and only Front-End is currently implemented, without calling a back-end service.