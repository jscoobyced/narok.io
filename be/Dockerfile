FROM jscdroiddev/docker-sbt:latest AS build-env
WORKDIR /build

# Update dependencies
ENV DEBIAN_FRONTEND noninteractive
RUN set -ex; apt-get install -qqy apt-utils && apt-get update && apt-get -qqy upgrade \
    && apt-get install -qqy p7zip-full

# Build application
ARG JSCCURRENT="./be"
COPY ${JSCCURRENT} src
RUN mkdir -p dist/jscbe

RUN cd src && sbt clean && sbt compile && sbt universal:packageBin
RUN cd src && JSCBEVERSION=$(sbt version | tail -n 1 | cut -d" " -f2) \
    && 7z x target/universal/jscbe-${JSCBEVERSION}.zip \
    && mv jscbe-${JSCBEVERSION}/lib ../dist/jscbe/ \
    && mv jscbe-${JSCBEVERSION}/bin ../dist/jscbe/

# Deploy
FROM openjdk:11-jdk
WORKDIR /build

LABEL maintainer="JscDroidDev"

RUN mkdir -p /opt/jscbe

COPY --from=build-env /build/dist/jscbe /opt/jscbe
RUN chmod u+x /opt/jscbe/bin/*
ENTRYPOINT ["bash"]
CMD ["/opt/jscbe/bin/jscbe"]
EXPOSE 8080

