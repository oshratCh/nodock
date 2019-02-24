FROM phusion/baseimage:0.9.19
FROM node:8.2

RUN apt-get update &&\
    apt-get install -y npm
    # apt-get install curl &&\
    # curl -sL https://deb.nodesource.com/setup_4.x | bash &&\
    # apt-get install nodejs

ARG NODE_ENV=production
ARG NODE_VERSION=latest
ARG PROJECT_PATH=/opt/app/
ARG YARN=false

ENV YARN=$YARN
ENV PROJECT_PATH=$PROJECT_PATH
ENV NODE_ENV=$NODE_ENV

# Add
RUN groupadd -r www-app &&\
    useradd -r -g www-app www-app

RUN mkdir -p /home/www-app &&\
    chmod 777 /home/www-app -R

# Install the specified NODE_VERSION or grab latest
#RUN n 8.15.0

# Install Yarn

RUN if [ ${YARN} = true ]; then \
    npm install -g yarn \
;fi

COPY scripts/run-nodock.sh /usr/bin/run-nodock

RUN chmod 700 /usr/bin/run-nodock

WORKDIR /opt/app
