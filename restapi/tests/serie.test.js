const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const mongoose = require('mongoose');
const Match = require('../models/match');
const {User} = require('../models/user');
const Game = require('../models/game');
const Serie = require('../models/serie');
const {matchIds, matches} = require('./mock_data/match');
const {userIds, users} = require('./mock_data/user');
const {gameIds, games} = require('./mock_data/game');
const {serieIds, series} = require('./mock_data/serie');

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

    app.use('/api/series',require('../routes/serie.js'))

    //Puerto del servidor
    app.set('port', 5000);

    //Lanzar el servidor
    server = app.listen(app.get('port'), function () {
        loggerInfo.info("Servidor activo en puerto:" + app.get('port'));
    });
})

afterAll(() => {
    //BORRAR TODOS LOS DATOS
    server.close();
})

beforeEach(async () => {

    await Match.insertMany(matches)
        .catch(function (err) {
            console.log(err);
        });

    await Serie.insertMany(series)
        .catch(function (err) {
            console.log(err);
        });

    await User.insertMany(users)
        .catch(function (err) {
            console.log(err);
        });

    await Game.insertMany(games)
        .catch(function (err) {
            console.log(err);
        });
})

afterEach( async () =>{

    await Match.deleteMany({_id: { $in: matchIds}})
        .catch(function(err){
            console.log(err);
        })

    await Serie.deleteMany({_id: { $in: serieIds}})
        .catch(function(err){
            console.log(err);
        })

    await User.deleteMany({_id: { $in: userIds}})
        .catch(function(err){
            console.log(err);
        })

    await Game.deleteMany({_id: { $in: gameIds}})
        .catch(function(err){
            console.log(err);
        })
})

//PRUEBAS FIND DE SERIES CON FILTRO

describe('GET /api/series', () => {

    it("Buscar series por mas de un filtro a la vez", async ()=>{
        const res = await request(app).get('/api/series?game=65df8098fc13ae2387cd3c60&mode=Tournament&user=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("msg");
        expect(res.body.msg).toEqual("There cannot be two filters together with exception of game and mode")
    })

    it("Buscar últimas series de un juego", async ()=>{
        const res = await request(app).get('/api/series?game=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(3);
    })

    it("Buscar últimas series de un juego y un modo", async ()=>{
        const res = await request(app).get('/api/series?game=65df8098fc13ae2387cd3c60&mode=ARAM_1VS1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(3);
    })

    it("Buscar últimas series de un jugador", async ()=>{
        const res = await request(app).get('/api/series?user=65df8098fc13ae2387cd3c61');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(4);
    })
})

//PRUEBAS FIND UNA SOLA SERIE
describe('GET /api/series/{id}', () => {

    it('Passed an existing id should return a serie', async () => {
        let serie = await Serie.findById("65e0f577fc13ae063acd367e");
        const res = await request(app).get('/api/series/65e0f577fc13ae063acd367e');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('game');
        expect(res.body).toHaveProperty('mode');
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('type');
    })

    it('Passed an invalid id should return error 400', async () => {
        const res = await request(app).get('/api/series/prueba');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid Serie Id: {prueba}");
    })

    it('Passed a none existing id should return error 404', async () => {
        const res = await request(app).get('/api/series/65d804c41c1127813e516f6a');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Serie with Id:{65d804c41c1127813e516f6a} not found");
    })
})

//PRUEBAS CREACIÓN DE UNA SERIE

describe('POST /api/series', () => {
    it('Crear una serie sin participantes', async () => {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Serie.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })

    it('Crear una serie con un solo participante', async () => {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "65df8098fc13ae2387cd3c62",
                status: "SCHEDULED",
                result: {
                    matches:["65df8098fc13ae2387cd3c63"],
                },
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Serie.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })

    it('Crear una serie con dos participantes', async () => {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "65df8098fc13ae2387cd3c62",
                away_participant: "65df8098fc13ae2387cd3c61",
                status: "SCHEDULED",
                result: {
                    winner: "65df8098fc13ae2387cd3c62",
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Serie.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })

    it('Crear una serie con game invalido', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "pruebaid",
                home_participant: "65df8098fc13ae2387cd3c62",
                away_participant: "65df8098fc13ae2387cd3c61",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con game inexistente', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c62",
                home_participant: "65df8098fc13ae2387cd3c62",
                away_participant: "65df8098fc13ae2387cd3c61",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con modo inexistente', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "PRUEBA_MODO",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "65df8098fc13ae2387cd3c62",
                away_participant: "65df8098fc13ae2387cd3c61",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con away_participant inexistente', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                away_participant: "65df8098fc13ae2387cd3c43",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con away_participant invalido', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                away_participant: "pruebaid",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con home_participant inexistente', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "65df8098fc13ae2387cd3c43",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con home_participant invalido', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "pruebaid",
                status: "SCHEDULED",
                result: {
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con winner y participantes no establecidos', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                status: "SCHEDULED",
                result: {
                    winner: "65df8098fc13ae2387cd3c62",
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(400);
    })

    it('Crear una serie con winner no existente entre los participantes', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "65df8098fc13ae2387cd3c61",
                status: "SCHEDULED",
                result: {
                    winner: "65df8098fc13ae2387cd3c62",
                    matches:[],
                },
            })
        expect(res.statusCode).toEqual(400);
    })

    it('Crear una serie con match invalido', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                status: "SCHEDULED",
                result: {
                    matches:["pruebaid"],
                },
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Crear una serie con match inexistente', async ()=> {
        const res = await request(app)
            .post('/api/series')
            .send({
                type: "SINGLE",
                mode: "ARAM_1VS1",
                bestOf: 1,
                game: "65df8098fc13ae2387cd3c60",
                status: "SCHEDULED",
                result: {
                    matches:["65df8098fc13ae2387cd3c34"],
                },
            })
        expect(res.statusCode).toEqual(404);
    })
})

//PRUEBAS DE UPDATE DE UNA SERIE

describe('PUT /api/series', () => {

    it("Actualizar una serie valida", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        winner: "65df8098fc13ae2387cd3c61",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Serie {65e0f577fc13ae063acd367e} updated successfully");
    })

    it("Actualizar una serie con game invalido", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "pruebaid",
                    home_participant: "65df8098fc13ae2387cd3c62",
                    away_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        winner: "65df8098fc13ae2387cd3c61",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar una serie con game inexistente", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c62",
                    home_participant: "65df8098fc13ae2387cd3c62",
                    away_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        winner: "65df8098fc13ae2387cd3c61",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar una serie con modo no existente", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "PRUEBA_MODO",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c62",
                    away_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        winner: "65df8098fc13ae2387cd3c61",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar una serie con home_participant invalido", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "pruebaid",
                    away_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        winner: "65df8098fc13ae2387cd3c61",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar una serie con home_participant inexistente", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c32",
                    away_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        winner: "65df8098fc13ae2387cd3c61",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar una serie con away_participant invalido", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    away_participant: "pruebaid",
                    result:{
                        winner: "65df8098fc13ae2387cd3c61",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar una serie con away_participant inexistente", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c62",
                    away_participant: "65df8098fc13ae2387cd3c32",
                    result:{
                        winner: "65df8098fc13ae2387cd3c62",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar una serie con winner y participantes no establecidos ", async () => {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    result:{
                        winner: "65df8098fc13ae2387cd3c62",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(400);
    })

    it('Actualizar una serie con winner no existente entre los participantes', async ()=> {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        winner: "65df8098fc13ae2387cd3c62",
                        matches: []
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(400);
    })

    it('Actualizar una serie con match inexistente', async ()=> {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        matches: ["65df8098fc13ae2387cd3c62"]
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it('Actualizar una serie con match invalido', async ()=> {
        const res = await request(app)
            .put('/api/series/65e0f577fc13ae063acd367e')
            .send({
                serie: {
                    type: "SINGLE",
                    mode: "VGC",
                    bestOf: 2,
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c61",
                    result:{
                        matches: ["pruebaid"]
                    },
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
    })
})

//PRUEBAS DE BORRADO DE UNA SERIE

describe('DELETE /api/series/{id}', ()=>{
    it('Try to delete a none existing serie', async ()=>{
        const res = await request(app)
            .delete('/api/series/65d804c41c1127813e516f6a')
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Serie with Id:{65d804c41c1127813e516f6a} not found")
    })

    it('Try to delete a serie with a non valid id', async ()=>{
        const res = await request(app)
            .delete('/api/series/pruebaid')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid Serie Id:{pruebaid}");
    })

    it('Delete an existing serie', async ()=> {
        const res = await request(app)
            .delete('/api/series/65e0f577fc13ae063acd367e')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Serie Id:{65e0f577fc13ae063acd367e} deleted successfully");
    })
})
