FROM node

RUN mkdir -p /myapp/client
WORKDIR /myapp/client

ENV PATH /myapp/client/node_modules/.bin:$PATH

COPY package.json /myapp/client/package.json
RUN npm install --silent
RUN npm install react-script@1.1.1 -g --silent