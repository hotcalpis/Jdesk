FROM node

RUN mkdir -p /myapp/client
WORKDIR /myapp/client

ENV PATH /myapp/client/node_modules/.bin:$PATH

COPY package.json /myapp/client/package.json
RUN npm install