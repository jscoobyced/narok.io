Back-End application
---

The Back-End application is a scala application running APIs. It is located in the `be` folder.

# Quick Start
To start the application as it is, just run from command line:
```
docker build --build-arg -t owner/myapp-be .
// or if you run from within "be" folder
docker build --build-arg JSCCURRENT="." -t owner/myapp-be .
docker run --name myapp-be -d --rm -p 8080:8080 owner/myapp-be
```
Then you can open your browser on `http://localhost:8080`.

# Development
The Back-End application is built with the Scala Build Tools (sbt) and supports the following commands:
- `sbt compile`: builds the project.
- `sbt run`: starts the application. It will be available on [http://localhost:8080](http://localhost:8080).