FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/eloyasr/tfg
COPY . /app
WORKDIR /app

ENV REACT_APP_API_URI=$API_URI
ENV MONGODB_ATLAS=$MONGODB_ATLAS
ENV SECRETORPRIVATEKEY=$SECRETORPRIVATEKEY
ENV RIOT_APIKEY=$RIOT_APIKEY

#Install the dependencies
RUN npm install
CMD [ "npm", "start" ]
