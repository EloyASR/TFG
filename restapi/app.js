require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

//SWAGGER DOCUMENTATION
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "TFG-RestAPI",
            version: "0.1.0",
            description:
                "This a simple CRUD API made with Express and documented with Swagger",
            contact: {
                name: "Eloy Alfredo Schmidt Rodríguez",
                email: "uo271588@uniovi.es",
            },
        },
        servers: [
            {
                url: "http://localhost:5000/api/",
            },
        ],
    },
    apis: ["./routes/*.js", "./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer:true}));

const cors = require('cors');

app.options('*', cors());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Logger
let log4js = require('log4js');
const { dbConnection } = require("./database/config.js");
log4js.configure({
    appenders: {
        info: { type: "file", filename: "info.log" },
        error: { type: "file", filename: "error.log"}
    },
    categories: {
        error: {
            appenders: ["error"],
            level: "error"
        },
        default: {
            appenders: ["info"],
            level: "info"
        }
    }
});

let loggerInfo = log4js.getLogger("default");
let loggerError = log4js.getLogger("error");
app.set('loggerInfo', loggerInfo);
app.set('loggerError', loggerError);

dbConnection()

//NEW ROUTES
app.use('/api/', require('./routes/app.js'))
app.use('/api/login', require('./routes/auth.js'))
app.use('/api/matches',require('./routes/match.js'))
app.use('/api/series',require('./routes/serie.js'))
app.use('/api/prizes',require('./routes/prize.js'))
app.use('/api/users',require('./routes/user.js'))
app.use('/api/games',require('./routes/game.js'))
app.use('/api/tournaments',require('./routes/tournament.js'))

app.use('/leagueoflegends', require('./routes/leagueOfLegends.js'))
app.use('/valorant', require('./routes/valorant.js'))

//Puerto del servidor
app.set('port', process.env.PORT || 5000);

//Lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo en puerto:" + app.get('port'));
    loggerInfo.info("Servidor activo en puerto:" + app.get('port'));
});
