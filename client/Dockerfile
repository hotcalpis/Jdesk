FROM node

WORKDIR /myapp/client

ENV PATH /myapp/client/node_modules/.bin:$PATH

COPY package*.json /myapp/client/
RUN npm install
