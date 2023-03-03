FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/EloyASR/TFG
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install
CMD [ "npm", "start" ]