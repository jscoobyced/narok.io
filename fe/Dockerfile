FROM node:latest AS build-env
WORKDIR /build

## Install dependencies packages
ENV TZ Asia/Bangkok

# Build application
ARG JSCCURRENT="./fe"
ARG JSCMODE="prod"
COPY ${JSCCURRENT} .
RUN yarn install
RUN /bin/bash -c 'yarn build:${JSCMODE}'

# Deploy
FROM nginx:latest
ENV TZ Asia/Bangkok
RUN set -ex; apt-get -qqy update && apt-get -qqy upgrade
LABEL maintainer="JscDroidDev"
WORKDIR /tmp

RUN rm -Rf /usr/share/nginx/html/ && mkdir -p /usr/share/nginx/html/assets
COPY --from=build-env /build/dist /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
VOLUME ["/usr/share/nginx/html/assets"]