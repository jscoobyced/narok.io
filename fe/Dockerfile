FROM node:latest AS build-env
WORKDIR /build

## Install dependencies packages
RUN set -ex; apt-get -qqy update && apt-get -qqy upgrade
RUN set -ex; apt-get install -qqy --no-install-recommends \
        ca-certificates apt-transport-https \
        software-properties-common dirmngr python

# Build application
ARG JSCCURRENT="./fe"
ARG JSCMODE="prod"
COPY ${JSCCURRENT} .
RUN yarn install
RUN /bin/bash -c 'yarn build:${JSCMODE}'

# Deploy
FROM nginx:latest
LABEL maintainer="JscDroidDev"
WORKDIR /build

COPY --from=build-env /build/dist /usr/share/nginx/html/
EXPOSE 80 443
