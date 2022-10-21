const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static('public'));

// Logger
let log4js = require('log4js');
log4js.configure({
    appenders: { actividad: { type: "file", filename: "actividad.log" } },
    categories: { default: { appenders: ["actividad"], level: "info" } }
});

let logger = log4js.getLogger("actividad");
app.set('logger', logger);

//Puerto del servidor
app.set('port', process.env.PORT || 8081);
//Lanzar el servidor

app.listen(app.get('port'), function() {
    console.log("Servidor activo en puerto:" + app.get('port'));
    logger.info("Servidor activo en puerto:" + app.get('port'));
});
