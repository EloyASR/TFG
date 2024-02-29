const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const mongoose = require('mongoose');
const Match = require('../models/match');
const User = require('../models/user');
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

    app.use('/api/matches',require('../newroutes/match.js'))

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

    it("Buscar partidos por mas de un filtro a la vez", async ()=>{
        const res = await request(app).get('/api/matches?game=65df8098fc13ae2387cd3c60&mode=Tournament&user=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("msg");
        expect(res.body.msg).toEqual("There cannot be two filters together with exception of game and mode")
    })

    it("Buscar últimos partidos de un juego", async ()=>{
        const res = await request(app).get('/api/matches?game=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(5);
    })

    it("Buscar últimos partidos de un juego y un modo", async ()=>{
        const res = await request(app).get('/api/matches?game=65df8098fc13ae2387cd3c60&mode=Tournament');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(4);
    })

    it("Buscar últimos partidos de un jugador para un juego en especifico", async ()=>{
        const res = await request(app).get('/api/matches?user=65df8098fc13ae2387cd3c61');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
    })

    it("Buscar últimos partidos de un equipo", async ()=>{
        const res = await request(app).get('/api/matches?team=65df8098fc13ae2387cd3c66');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    })
})

//PRUEBAS FIND UN SOLO MATCH

describe('GET /api/matches/{id}', () => {

    it('Passed an existing id should return a match', async () => {
        const res = await request(app).get('/api/matches/65df8098fc13ae2387cd3c5f');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('date');
        expect(res.body).toHaveProperty('game');
        expect(res.body).toHaveProperty('mode');
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('type');
    })

    it('Passed an invalid id should return error 400', async () => {
        const res = await request(app).get('/api/matches/prueba');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid Match Id: {prueba}");
    })

    it('Passed a none existing id should return error 404', async () => {
        const res = await request(app).get('/api/matches/65d804c41c1127813e516f6a');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Match with Id:{65d804c41c1127813e516f6a} not found");
    })
})

//PRUEBAS CREACIÓN DE UN MATCH

describe('POST /api/matches', () => {
    it('Create a match without participants', async () => {
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
    })

    it('Try to create a match with only one participant', async () => {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "TOURNAMENT",
                game: "65df8098fc13ae2387cd3c60",
                participant1: "65df8098fc13ae2387cd3c65",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "SCHEDULED_WITH_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    })

    it('Try to create a match with two participants that dont exist', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "TOURNAMENT",
                game: "65df8098fc13ae2387cd3c60",
                participant1: "65ce00ced1a5897d2764a23e",
                participant2: "65ce00ced1a5897d2764a23e",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "SCHEDULED_WITH_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with Id:{65ce00ced1a5897d2764a23e} or Id:{65ce00ced1a5897d2764a23e} not found")
    })

    it('Try to create a match with no participants and a correct resolution of the match', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "1VS1",
                mode: "ARAM_1VS1",
                game: "65df8098fc13ae2387cd3c60",
                win: "65df8098fc13ae2387cd3c61",
                lose: "65df8098fc13ae2387cd3c62",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "SCHEDULED_NO_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Both participants should be assigned before u assign the winner or loser of the match");
    })

    it('Try to create a match with two participants and a correct resolution of the match', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "1VS1",
                mode: "VGC",
                game: "65df8098fc13ae2387cd3c68",
                participant1: "65df8098fc13ae2387cd3c61",
                participant2: "65df8098fc13ae2387cd3c62",
                win: "65df8098fc13ae2387cd3c62",
                lose: "65df8098fc13ae2387cd3c61",
                date: "2024-04-10T18:00:00.000+00:00",
                status: "FINISHED"
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    })
})

//PRUEBAS DE UPDATE DE UN MATCH

describe('PUT /api/matches', () => {
    it("Try to update a none existing match", async () => {

    })

    it("Update the participants of an existing match", async () => {

    })

    it("Update the winner and losser of an existing match", async () => {

    })

    it("Update the state of an existing match", async () => {

    })
})

//PRUEBAS DE BORRADO DE UN MATCH

describe('DELETE /api/matches/{id}', ()=>{
    it('Try to delete a none existing match', async ()=>{
        const res = await request(app)
            .delete('/api/matches/65d804c41c1127813e516f6a')
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Match with Id:{65d804c41c1127813e516f6a} not found")
    })

    it('Try to delete a match with a non valid id', async ()=>{
        const res = await request(app)
            .delete('/api/matches/pruebaid')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid Match Id:{pruebaid}");
    })

    it('Delete an existing match', async ()=> {
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
