const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const mongoose = require('mongoose');
const Team = require('../models/team');
const {teamIds, teams} = require('./mock_data/team');

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

    app.use('/api/teams',require('../routes/team.js'))

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

    await Team.insertMany(teams)
        .catch(function (err) {
            console.log(err);
        });
})

afterEach( async () =>{

    await Team.deleteMany({_id: { $in: teamIds}})
        .catch(function(err){
            console.log(err);
        })
})

describe('GET /api/teams', () => {
    it("Buscar todos los equipos", async ()=>{
        const res = await request(app)
            .get('/api/teams');
        expect(res.statusCode).toEqual(200);
        expect(res.body.teams.length).toBeGreaterThan(3);
    })
})

describe('GET /api/teams/:id', () => {

    it("Buscar equipo con id inválido", async ()=>{
        const res = await request(app).get('/api/teams/prueba');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid team Id: {prueba}");
    })

    it("Buscar equipo inexistente", async ()=>{
        const res = await request(app).get('/api/teams/664f530afc13ae6854c64965');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Team with Id:{664f530afc13ae6854c64965} not found");
    })

    it("Buscar equipo con id válido", async ()=>{
        const res = await request(app).get('/api/teams/65df8098fc13ae2387cd3c66');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
    })
})

