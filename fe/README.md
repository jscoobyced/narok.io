Front-End application
---

This is the front-end part of the website.

# Quick Start
To start the application as it is, just run from command line:
```
docker build --build-arg -t owner/myapp-fe .
// or if you run from within "fe" folder
docker build --build-arg JSCCURRENT="." -t owner/myapp-fe .
docker run --name myapp-fe -d --rm -p 80:80 owner/myapp-fe
```
Then you can open your browser on `http://localhost`.


# Development
## Getting started
The Front-End application is a pure javascript application (transpiled from TypeScript) running as static resources in an nginx server.

It is located in the `fe` folder and support the following commands:
- `yarn lint`: runs the ES Linter. You can customize the rules in [fe/.eslintrc.json](fe/.eslintrc.json)
- `yarn start`: this will start the application in `development` mode, with hot-reload. It is useful while implementing the Front-End code
- `yarn test`: runs the ES Linter then the Jest tests. It also generates coverage in the `coverage` folder.
- `yarn test:coverage`: runs the same as `yarn test` but also display the test coverage on the console.
- `yarn build`: generates all the assets and place them in the `dist` folder.
- `yarn dist`: generates all the assets and zip them in root fodler. You must have [7z](https://www.7-zip.org/) installed and available in the PATH.

You can use the `fe/public` folder to place any static assets. They will be copied at the root of the web-application folder. You can create sub-folders if you don't want to mix everything.


## Hot reload

This application is packed with [webpack](https://webpack.js.org/) and uses the `webpack-dev-server` plugins to run you development code.
Simply run from the command line:
```
yarn start
```
Any code change you make to existing files will automatically reload. 

## Production code
Sometimes the application seems fine in development mode, but when packaged and running behind nginx in the docker container, it doesn't work exactly the same (i.e. encoding of non UTF-8 characters are broken, path not valid...). You can run a development version of the production code by running these commands:
```
docker build -t owner/myapp-fe ./Dockerfile.dev
docker run --name myapp-fe -d --rm -p 80:80 -v "$(pwd)/dist:/usr/share/nginx/html/" owner/myapp-fe
yarn build
```
Applicatin will be available on `http://localhost` as usual. You can make the necessary code change to fix packaged code, run the `yarn build` command again, reload the page and see the result.