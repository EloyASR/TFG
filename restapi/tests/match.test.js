const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const mongoose = require('mongoose');
const Match = require('../models/match');
const {User} = require('../models/user');
const Game = require('../models/game');
const Team = require('../models/team');
const Serie = require('../models/serie');
const Tournament = require('../models/tournament');
const {matchIds, matches} = require('./mock_data/match');
const {userIds, users} = require('./mock_data/user');
const {gameIds, games} = require('./mock_data/game');
const {teamIds, teams} = require('./mock_data/team');
const {serieIds, series} = require('./mock_data/serie');
const {tournamentIds, tournaments} = require('./mock_data/tournament');

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

    app.use('/api/matches',require('../routes/match.js'))

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

    await Match.insertMany(matches)
        .catch(function (err) {
            console.log(err);
        });

    await Tournament.insertMany(tournaments)
        .catch(function (err) {
            console.log(err);
        });

    await Serie.insertMany(series)
        .catch(function (err) {
            console.log(err);
        });

    await Team.insertMany(teams)
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

    await Tournament.deleteMany({_id: { $in: tournamentIds}})
        .catch(function(err){
            console.log(err);
        })

    await Serie.deleteMany({_id: { $in: serieIds}})
        .catch(function(err){
            console.log(err);
        })

    await Team.deleteMany({_id: { $in: teamIds}})
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

//PRUEBAS FIND DE MATCHES CON FILTRO

describe('GET /api/matches', () => {

    it("Buscar matches por mas de un filtro a la vez", async ()=>{
        const res = await request(app).get('/api/matches?game=65df8098fc13ae2387cd3c60&mode=Tournament&user=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("msg");
        expect(res.body.msg).toEqual("There cannot be two filters together with exception of game and mode")
    })

    it("Buscar últimos matches de un juego", async ()=>{
        const res = await request(app).get('/api/matches?game=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(5);
    })

    it("Buscar últimos matches de un juego y un modo", async ()=>{
        const res = await request(app).get('/api/matches?game=65df8098fc13ae2387cd3c60&mode=TOURNAMENT');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(4);
    })

    it("Buscar últimos matches de un jugador", async ()=>{
        const res = await request(app).get('/api/matches?user=65df8098fc13ae2387cd3c61');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
    })

    it("Buscar últimos matches de un equipo", async ()=>{
        const res = await request(app).get('/api/matches?team=65df8098fc13ae2387cd3c66');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    })
})

//PRUEBAS FIND UN SOLO MATCH

describe('GET /api/matches/:id', () => {

    it('Buscar un match válido', async () => {
        const res = await request(app).get('/api/matches/65df8098fc13ae2387cd3c5f');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('date');
        expect(res.body).toHaveProperty('game');
        expect(res.body).toHaveProperty('mode');
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('type');
    })

    it('Buscar un match inválido', async () => {
        const res = await request(app).get('/api/matches/prueba');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid Match Id: {prueba}");
    })

    it('Buscar un match inexistente', async () => {
        const res = await request(app).get('/api/matches/65d804c41c1127813e516f6a');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Match with Id:{65d804c41c1127813e516f6a} not found");
    })
})

//PRUEBAS CREACIÓN DE UN MATCH

describe('POST /api/matches', () => {
    it('Crear un match sin participantes', async () => {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "TOURNAMENT",
                game: "65df8098fc13ae2387cd3c60",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "SCHEDULED_NO_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Match.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })

    it('Crear un match con un solo participante', async () => {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "TOURNAMENT",
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "65df8098fc13ae2387cd3c65",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "SCHEDULED_WITH_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Match.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })

    it('Crear un match con una serie inexistente', ()=>{
        //TODO
    })

    it('Crear un match con un torneo inexistente', ()=>{
        //TODO
    })

    it('Crear un match con participantes inexistentes', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "TOURNAMENT",
                game: "65df8098fc13ae2387cd3c60",
                home_participant: "65ce00ced1a5897d2764a23e",
                away_participant: "65ce00ced1a5897d2764a23e",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "SCHEDULED_WITH_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Participant with Id:{65ce00ced1a5897d2764a23e} not found")
    })

    it('Crear un match sin participantes y con un resultado válido', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "1VS1",
                mode: "ARAM_1VS1",
                game: "65df8098fc13ae2387cd3c60",
                winner: "65df8098fc13ae2387cd3c61",
                loser: "65df8098fc13ae2387cd3c62",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "SCHEDULED_NO_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("At least one participant should be assigned before you assign the winner or loser of the match");
    })

    it('Crear un match con participantes y con resultado válido', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "1VS1",
                mode: "VGC",
                serie: "65e0f577fc13ae063acd367e",
                game: "65df8098fc13ae2387cd3c68",
                home_participant: "65df8098fc13ae2387cd3c61",
                away_participant: "65df8098fc13ae2387cd3c62",
                winner: "65df8098fc13ae2387cd3c62",
                loser: "65df8098fc13ae2387cd3c61",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "FINISHED"
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Match.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })
})

//PRUEBAS DE UPDATE DE UN MATCH

describe('PUT /api/matches/:id', () => {
    it("Actualizar un match inexistente", async () => {
        const res = await request(app)
            .put('/api/matches/pruebadeid')
            .send({
                match: {
                    type: "1VS1",
                    mode: "VGC",
                    serie: "65e0f577fc13ae063acd367e",
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c61",
                    away_participant: "65df8098fc13ae2387cd3c62",
                    winner: "65df8098fc13ae2387cd3c62",
                    loser: "65df8098fc13ae2387cd3c61",
                    date: "2024-04-10T18:00:00.000+00:00",
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Match with Id:{pruebadeid} not found");
    })

    it('Actualizar un match existente sin participantes', ()=>{
        //TODO
    })

    it('Actualizar un match existente con un tournament inexistente', ()=>{
        //TODO
    })

    it('Actualizar un match existente con una serie inexistente', ()=>{
        //TODO
    })

    it('Actualizar un match existente con resultado correcto pero sin participantes', ()=>{
        //TODO
    })

    it("Actualizar un match existente", async () => {
        const res = await request(app)
            .put('/api/matches/65df8098fc13ae2387cd3c67')
            .send({
                match: {
                    type: "1VS1",
                    mode: "VGC",
                    serie: "65e0f577fc13ae063acd367e",
                    game: "65df8098fc13ae2387cd3c68",
                    home_participant: "65df8098fc13ae2387cd3c61",
                    away_participant: "65df8098fc13ae2387cd3c62",
                    winner: "65df8098fc13ae2387cd3c62",
                    loser: "65df8098fc13ae2387cd3c61",
                    date: "2024-04-10T18:00:00.000+00:00",
                    status: "FINISHED"
                }
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Match {65df8098fc13ae2387cd3c67} updated successfully");
    })
})

//PRUEBAS DE BORRADO DE UN MATCH

describe('DELETE /api/matches/:id', ()=>{
    it('Borrar un match inexistente', async ()=>{
        const res = await request(app)
            .delete('/api/matches/65d804c41c1127813e516f6a')
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Match with Id:{65d804c41c1127813e516f6a} not found")
    })

    it('Borrar un match invalido', async ()=>{
        const res = await request(app)
            .delete('/api/matches/pruebaid')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid Match Id:{pruebaid}");
    })

    it('Borrar un match existente', async ()=> {
        const res = await request(app)
            .delete('/api/matches/65df8098fc13ae2387cd3c67')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Match Id:{65df8098fc13ae2387cd3c67} deleted successfully");
        expect(res.body).toHaveProperty('match');
        expect(res.body.match).toHaveProperty('mode');
        expect(res.body.match.mode).toEqual('VGC');
    })
})
