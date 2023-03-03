require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

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
    appenders: { actividad: { type: "file", filename: "actividad.log" } },
    categories: { default: { appenders: ["actividad"], level: "info" } }
});

let logger = log4js.getLogger("actividad");
app.set('logger', logger);

dbConnection()

app.use('/api/login', require('./routes/auth.js'))

//Puerto del servidor
app.set('port', process.env.PORT || 5000);

//Lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo en puerto:" + app.get('port'));
    logger.info("Servidor activo en puerto:" + app.get('port'));
});
