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

    app.use('/api/series',require('../newroutes/serie.js'))

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

describe('GET /api/series', () => {

    it("Buscar series por mas de un filtro a la vez", async ()=>{
        /*const res = await request(app).get('/api/series?game=65df8098fc13ae2387cd3c60&mode=Tournament&user=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("msg");
        expect(res.body.msg).toEqual("There cannot be two filters together with exception of game and mode")*/
    })

    it("Buscar últimas series de un juego", async ()=>{
        /*const res = await request(app).get('/api/series?game=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(5);*/
    })

    it("Buscar últimas series de un juego y un modo", async ()=>{
        /*const res = await request(app).get('/api/series?game=65df8098fc13ae2387cd3c60&mode=TOURNAMENT');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(4);*/
    })

    it("Buscar últimas series de un jugador para un juego en especifico", async ()=>{
        /*const res = await request(app).get('/api/series?user=65df8098fc13ae2387cd3c61');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);*/
    })

    it("Buscar últimas series de un equipo", async ()=>{
        /*const res = await request(app).get('/api/series?team=65df8098fc13ae2387cd3c66');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);*/

    })
})

//PRUEBAS FIND UN SOLO MATCH

describe('GET /api/series/{id}', () => {

    it('Passed an existing id should return a serie', async () => {
        let serie = await Serie.findById("65e0f577fc13ae063acd367e");
        const res = await request(app).get('/api/series/65e0f577fc13ae063acd367e');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('date');
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

//PRUEBAS CREACIÓN DE UN MATCH

describe('POST /api/series', () => {
    it('Create a serie without participants', async () => {
        /*const res = await request(app)
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
        await Match.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});*/
    })

    it('Try to create a serie with only one participant', async () => {
        /*const res = await request(app)
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
        await Match.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});*/
    })

    it('Try to create a serie with a not found tournament', ()=>{
        //TODO
    })

    it('Try to create a serie with two participants that dont exist', async ()=> {
        /*const res = await request(app)
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
        expect(res.body.msg).toEqual("Participant with Id:{65ce00ced1a5897d2764a23e} not found")*/
    })

    it('Try to create a serie with no participants and a correct resolution of the serie', async ()=> {
        /*const res = await request(app)
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
        expect(res.body.msg).toEqual("At least one participant should be assigned before you assign the winner or loser of the match");*/
    })

    it('Try to create a serie with two participants and a correct resolution of the serie', async ()=> {
        /*const res = await request(app)
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
        await Match.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});*/
    })
})

//PRUEBAS DE UPDATE DE UN MATCH

describe('PUT /api/series', () => {
    it("Try to update a none existing series", async () => {
        /*const res = await request(app)
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
        expect(res.body.msg).toEqual("Match with Id:{pruebadeid} not found");*/
    })

    it('Try to update a serie with not found participant', ()=>{
        //TODO
    })

    it('Try to update a serie with a not found tournament', ()=>{
        //TODO
    })

    it('Try to update a serie with resolution but no participants', ()=>{
        //TODO
    })

    it("Update an existing serie", async () => {
        /*const res = await request(app)
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
        expect(res.body.msg).toEqual("Match {65df8098fc13ae2387cd3c67} updated successfully");*/
    })
})

//PRUEBAS DE BORRADO DE UN MATCH

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
        expect(res.body.serie).toHaveProperty('mode');
        expect(res.body.serie.mode).toEqual('TOURNAMENT');
    })
})
