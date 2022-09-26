FROM node:alpine
WORKDIR /usr/src/app
COPY ./package* /usr/src/app/
RUN npm install —legacy-peer-deps
COPY ./ /usr/src/app/
CMD ["npm","run","start"]