Back-End application
---

This is the back-end part of the website.

# Quick Start
To start the application as it is, just run from command line:
```
docker build -t owner/myapp-be .
docker run --name myapp-be -d --rm -p 8080:8080 owner/myapp-be
```
Then you can open your browser on `http://localhost:8080`.
