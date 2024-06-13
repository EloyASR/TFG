FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/eloyasr/tfg
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI="http://13.38.43.35:5000/api"

#Create an optimized version of the webapp
RUN npm run build

#Execute npm run prod to run the server
#CMD [ "npm", "run", "prod" ]
CMD ["npm", "start"]
