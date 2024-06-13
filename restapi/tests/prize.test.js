const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const mongoose = require('mongoose');
const {User} = require('../models/user');
const Prize = require('../models/prize');
const {userIds, users} = require('./mock_data/user');
const {prizeIds, prizes} = require('./mock_data/prize');
const log4js = require("log4js");
const Match = require("../models/match");
const {matchIds} = require("./mock_data/match");
const Tournament = require("../models/tournament");
const {tournamentIds} = require("./mock_data/tournament");
const Serie = require("../models/serie");
const {serieIds} = require("./mock_data/serie");
const Team = require("../models/team");
const {teamIds} = require("./mock_data/team");
const Game = require("../models/game");
const {gameIds} = require("./mock_data/game");

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

    app.use('/api/prizes',require('../routes/prize.js'))

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

    await User.insertMany(users)
        .catch(function (err) {
            console.log(err);
        });

    await Prize.insertMany(prizes)
        .catch(function (err) {
            console.log(err);
        });
})

afterEach( async () =>{

    await User.deleteMany({_id: { $in: userIds}})
        .catch(function(err){
            console.log(err);
        })

    await Prize.deleteMany({_id: { $in: prizeIds}})
        .catch(function(err){
            console.log(err);
        })
})

describe('GET /api/prizes', () => {
    it("Buscar premios por creador", async ()=>{
        const res = await request(app)
            .get('/api/prizes?creator=664f5a92fc13ae6981c6417e');
        expect(res.statusCode).toEqual(200);
        expect(res.body.prizes).toHaveLength(2);
    })

    it("Buscar premios sin especificar un creador", async ()=>{
        const res = await request(app)
            .get('/api/prizes');
        expect(res.statusCode).toEqual(200);
        expect(res.body.prizes.length).toBeGreaterThan(2);
    })
})

describe('GET /api/prizes/:id', () => {
    it("Buscar premio con id inválido", async ()=>{
        const res = await request(app).get('/api/prizes/prueba');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid prize Id: {prueba}");
    })

    it("Buscar premio inexistente", async ()=>{
        const res = await request(app).get('/api/prizes/664f530afc13ae6854c64954');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Prize with Id:{664f530afc13ae6854c64954} not found");
    })

    it("Buscar premio con id válido", async ()=>{
        const res = await request(app).get('/api/prizes/664f530afc13ae6854c649b3');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('image');
        expect(res.body).toHaveProperty('creator');
    })
})

describe('POST /api/prizes', () => {

    it('Crear un premio con un creador inválido', async () => {
        const res = await request(app)
            .post('/api/prizes')
            .send({
                name: "Test 1",
                description: "Descripción test 1",
                image: "imagenTest1.png",
                creator: "prueba"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid user Id: {prueba}");
    })

    it('Crear un premio con creador inexistente', async () => {
        const res = await request(app)
            .post('/api/prizes')
            .send({
                name: "Test 2",
                description: "Descripción test 2",
                image: "imagenTest2.png",
                creator: "65df8098fc13ae2387cd3c68"
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with Id:{65df8098fc13ae2387cd3c68} not found");
    })

    it('Crear un premio con un creador que no es de tipo ADMIN o COMPANY', async () => {
        const res = await request(app)
            .post('/api/prizes')
            .send({
                name: "Test 3",
                description: "Descripción test 3",
                image: "imagenTest3.png",
                creator: "65df8098fc13ae2387cd3c61"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User creator must have role ADMIN or COMPANY");
    })

    it('Crear un premio sin nombre', async () => {
        const res = await request(app)
            .post('/api/prizes')
            .send({
                description: "Descripción test 4",
                image: "imagenTest4.png",
                creator: "664f5a92fc13ae6981c6417e"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
    })

    it('Crear un premio sin descripción', async () => {
        const res = await request(app)
            .post('/api/prizes')
            .send({
                name: "Test 5",
                image: "imagenTest5.png",
                creator: "664f5a92fc13ae6981c6417e"
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Prize.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })

    it('Crear un premio con todos los campos validos', async () => {
        const res = await request(app)
            .post('/api/prizes')
            .send({
                name: "Test 6",
                description: "Descripción test 6",
                image: "imagenTest6.png",
                creator: "664f5a92fc13ae6981c6417e"
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Prize.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })
})

describe('PUT /api/prizes/:id', () => {
    it("Actualizar un premio inexistente", async () => {
        const res = await request(app)
            .put('/api/prizes/pruebadeid')
            .send({
                prize: {
                    name: "UpdateTest1",
                    description: "Descripción UpdateTest1",
                    image: "UpdateImage1.png"
                }
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Prize with Id:{pruebadeid} not found");
    })

    it("Actualizar un premio existente", async () => {
        const res = await request(app)
            .put('/api/prizes/664f530afc13ae6854c649b2')
            .send({
                prize: {
                    name: "UpdateTest2",
                    description: "Descripción UpdateTest2",
                    image: "UpdateImage2.png"
                }
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Prize {664f530afc13ae6854c649b2} updated successfully");
    })
})

describe('DELETE /api/prizes/:id', ()=>{
    it('Borrar un premio inexistente', async ()=>{
        const res = await request(app)
            .delete('/api/prizes/664f530afc13ae6854c64945')
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Prize with Id:{664f530afc13ae6854c64945} not found")
    })

    it('Borrar un premio invalido', async ()=>{
        const res = await request(app)
            .delete('/api/prizes/pruebaid')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid prize Id:{pruebaid}");
    })

    it('Borrar un premio existente', async ()=> {
        const res = await request(app)
            .delete('/api/prizes/664f530afc13ae6854c649b3')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Prize with Id:{664f530afc13ae6854c649b3} deleted successfully");
        expect(res.body).toHaveProperty('prize');
    })
})