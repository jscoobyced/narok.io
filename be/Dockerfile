FROM jscdroiddev/docker-sbt:latest AS build-env
WORKDIR /build

# Update dependencies
ENV DEBIAN_FRONTEND noninteractive
ENV TZ Asia/Bangkok
RUN set -ex; apt-get install -qqy apt-utils && apt-get update && apt-get -qqy upgrade \
    && apt-get install -qqy p7zip-full nginx

# Build application
ARG JSCCURRENT="./be"
COPY ${JSCCURRENT} src
RUN mkdir -p dist/jscbe

RUN cd src && sbt clean compile universal:packageBin
RUN cd src && JSCBEVERSION=$(sbt version | tail -n 1 | cut -d" " -f2) \
    && 7z x target/universal/jscbe-${JSCBEVERSION}.zip \
    && mv jscbe-${JSCBEVERSION}/lib ../dist/jscbe/ \
    && mv jscbe-${JSCBEVERSION}/bin ../dist/jscbe/ \
    && mkdir ../dist/jscbe/conf

# Deploy
FROM openjdk:11-jdk
WORKDIR /build
ENV TZ Asia/Bangkok

LABEL maintainer="JscDroidDev"

RUN mkdir -p /opt/jscbe

COPY --from=build-env /build/dist/jscbe /opt/jscbe
RUN chmod u+x /opt/jscbe/bin/jscbe
RUN rm -Rf /usr/share/nginx/html/ && mkdir -p /usr/share/nginx/html/assets
COPY --from=build-env /build/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /opt/jscbe

ENTRYPOINT ["bash"]
CMD ["/opt/jscbe/bin/jscbe", "-Dsbt.gigahorse=false", "-Dconfig.resource=production.conf"]
EXPOSE 9001
VOLUME [ "/opt/jscbe/conf" ]
VOLUME ["/opt/jscbe/assets"]
