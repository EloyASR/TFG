const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const mongoose = require('mongoose');
const Tournament = require('../models/team');
const {tournamentIds, tournaments} = require('./mock_data/tournament');
const log4js = require("log4js");

let app;
let server;

beforeAll(async () => {
    app = express();

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

    await dbConnection()

    app.use('/api/tournaments',require('../routes/tournament.js'))

    //Puerto del servidor
    app.set('port', 5000);

    //Lanzar el servidor
    server = app.listen(app.get('port'), function () {
        console.log("Servidor activo en puerto:" + app.get('port'));
        loggerInfo.info("Servidor activo en puerto:" + app.get('port'));
    });
})

afterAll(() => {
    //BORRAR TODOS LOS DATOS
    server.close();
})

beforeEach(async () => {

    await Tournament.insertMany(tournaments)
        .catch(function (err) {
            console.log(err);
        });
})

afterEach( async () =>{

    await Tournament.deleteMany({_id: { $in: tournamentIds}})
        .catch(function(err){
            console.log(err);
        })
})

describe('GET /api/tournaments', () => {
    it("Buscar todos los torneos", async ()=>{
        const res = await request(app)
            .get('/api/tournaments');
        expect(res.statusCode).toEqual(200);
        expect(res.body.tournaments.length).toBeGreaterThan(3);
    })
})