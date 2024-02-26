const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const http = require('http');
const {dbConnection} = require("../database/config");

let app;
let server;

beforeAll(done => {
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

    dbConnection()

    app.use('/api/matches',require('../newroutes/match.js'))

    //Puerto del servidor
    app.set('port', 5000);

    //Lanzar el servidor
    server = app.listen(app.get('port'), function () {
        console.log("Servidor activo en puerto:" + app.get('port'));
        loggerInfo.info("Servidor activo en puerto:" + app.get('port'));
    });

    done();
})

afterAll(done => {
    //BORRAR TODOS LOS DATOS
    server.close();
    done();
})

//PRUEBAS FIND DE MATCHES CON FILTRO

describe('GET /api/matches', () => {

    it("Buscar multiples partidos", async ()=>{

    })

    it("Buscar últimos partidos de un juego", async ()=>{

    })

    it("Buscar últimos partidos de un jugador para un juego en especifico", async ()=>{

    })

    it("Buscar últimos partidos de un equipo", async ()=>{

    })
})

//PRUEBAS FIND UN SOLO MATCH

describe('GET /api/matches/{id}', () => {

    it('Passed an existing id should return a match', async () => {
        const res = await request(app).get('/api/matches/65d804c41c1127813e516f6b');
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
                mode: "tournament",
                game: "65ce00ced1a5897d2764a23e",
                date: "2024-04-10T18:00:00.000Z",
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
                mode: "tournament",
                game: "65ce00ced1a5897d2764a23e",
                participant1: "65ce00ced1a5897d2764a23e",
                date: "2024-04-10T18:00:00.000Z",
                status: "SCHEDULED_NO_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Both participants should be assigned");
    })

    it('Try to create a match with two participants that dont exist', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "tournament",
                game: "65ce00ced1a5897d2764a23e",
                participant1: "65ce00ced1a5897d2764a23e",
                participant2: "65ce00ced1a5897d2764a23e",
                date: "2024-04-10T18:00:00.000Z",
                status: "SCHEDULED_NO_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with Id:{65ce00ced1a5897d2764a23e} or Id:{65ce00ced1a5897d2764a23e} not found")
    })

    it('Try to create a match with no participants and a correct resolution of the match', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "tournament",
                game: "65ce00ced1a5897d2764a23e",
                win: "65dc97e28f56b981cbb7afde",
                lose: "65dc97e68f56b981cbb7afdf",
                date: "2024-04-10T18:00:00.000Z",
                status: "SCHEDULED_NO_PARTICIPANTS"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Both participants should be assigned befare u assign the winner or loser of the match");
    })

    it('Try to create a match with two participants and a correct resolution of the match', async ()=> {
        const res = await request(app)
            .post('/api/matches')
            .send({
                type: "5VS5",
                mode: "tournament",
                game: "65ce00ced1a5897d2764a23e",
                participant1: "65dc97e28f56b981cbb7afde",
                participant2: "65dc97e68f56b981cbb7afdf",
                win: "65dc97e28f56b981cbb7afde",
                lose: "65dc97e68f56b981cbb7afdf",
                date: "2024-04-10T18:00:00.000Z",
                status: "SCHEDULED_NO_PARTICIPANTS"
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

    })

    it('Try to delete a match with a non valid id', async ()=>{

    })

    it('Delete an existing match', async ()=> {

    })
})
