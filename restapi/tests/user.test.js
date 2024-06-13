const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const mongoose = require('mongoose');
const {User} = require('../models/user');
const Game = require('../models/game');
const {userIds, users} = require('./mock_data/user');
const {gameIds, games} = require("./mock_data/game");
const Prize = require("../models/prize");

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

    app.use('/api/users',require('../routes/user.js'))

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

    await Game.insertMany(games)
        .catch(function (err) {
            console.log(err);
        });
})

afterEach( async () =>{

    await User.deleteMany({_id: { $in: userIds}})
        .catch(function(err){
            console.log(err);
        })

    await Game.deleteMany({_id: { $in: gameIds}})
        .catch(function(err){
            console.log(err);
        })
})

describe('GET /api/users', () => {
    it("Buscar todos los usuarios", async ()=>{
        const res = await request(app)
            .get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.users.length).toBeGreaterThan(3);
    })
})

describe('GET /api/users/:id', () => {
    it("Buscar usuario con id inválido", async ()=>{
        const res = await request(app).get('/api/users/prueba');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid user Id: {prueba}");
    })

    it("Buscar usuario inexistente", async ()=>{
        const res = await request(app).get('/api/users/664f530afc13ae6854c64954');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with Id:{664f530afc13ae6854c64954} not found");
    })

    it("Buscar usuario con id válido", async ()=>{
        const res = await request(app).get('/api/users/65df8098fc13ae2387cd3c61');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('role');
    })
})

describe('POST /api/users', () => {
    it('Crear un usuario con un nombre ya existente', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: "USER 2",
                password: "user2password",
                email: "user2@gmail.com",
                role: "USER"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with name:{USER 2} already exists");
    })

    it('Crear un usuario sin un campo obligatorio', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                password: "user2password",
                email: "user2@gmail.com",
                role: "USER"
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
    })

    it('Crear un usuario con un account sin campo "game"', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: "TestUser2",
                password: "testuser2",
                email: "testuser2@gmail.com",
                role: "USER",
                accounts: [
                    {

                    }
                ]
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
    })

    it('Crear un usuario con un account con campo "game" inválido', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: "TestUser2",
                password: "testuser2",
                email: "testuser2@gmail.com",
                role: "USER",
                accounts: [
                    {
                        game: "prueba"
                    }
                ]
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Game with Id:{prueba} not found");
    })

    it('Crear un usuario con un account con campo "game" no existente', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: "TestUser2",
                password: "testuser2",
                email: "testuser2@gmail.com",
                role: "USER",
                accounts: [
                    {
                        game: "65df8098fc13ae2387cd3c18"
                    }
                ]
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Game with Id:{65df8098fc13ae2387cd3c18} not found");
    })

    it('Crear un usuario válido', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: "TestUser2",
                password: "testuser2",
                email: "testuser2@gmail.com",
                role: "USER",
                accounts: [
                    {
                        game: "65df8098fc13ae2387cd3c60"
                    }
                ]
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await User.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })
})

describe('PUT /api/users/:id', () => {
    it('Actualizar un usuario con un nombre ya existente', async () => {
        const res = await request(app)
            .put('/api/users/664f5a92fc13ae6981c6417e')
            .send({
                user:{
                    name: "USER 2",
                    password: "user2password",
                    email: "user2@gmail.com",
                    role: "USER"
                }
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with name:{USER 2} already exists");
    })

    it("Actualizar un usuario inexistente", async () => {
        const res = await request(app)
            .put('/api/users/pruebadeid')
            .send({
                user: {
                    name: "TestUser2",
                    password: "testuser2",
                    email: "testuser2@gmail.com",
                    role: "USER"
                }
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with Id:{pruebadeid} not found");
    })

    it('Actualizar un usuario con un account sin campo "game"', async () => {
        const res = await request(app)
            .put('/api/users/664f5a92fc13ae6981c6417e')
            .send({
                user: {
                    name: "TestUser2",
                    password: "testuser2",
                    email: "testuser2@gmail.com",
                    role: "USER",
                    accounts: [
                        {}
                    ]
                }
            })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
    })

    it('Actualizar un usuario con un account con campo "game" inválido', async () => {
        const res = await request(app)
            .put('/api/users/664f5a92fc13ae6981c6417e')
            .send({
                user: {
                    name: "TestUser2",
                    password: "testuser2",
                    email: "testuser2@gmail.com",
                    role: "USER",
                    accounts: [
                        {
                            game: "prueba"
                        }
                    ]
                }
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Game with Id:{prueba} not found");
    })

    it('Actualizar un usuario con un account con campo "game" no existente', async () => {
        const res = await request(app)
            .put('/api/users/664f5a92fc13ae6981c6417e')
            .send({
                user: {
                    name: "TestUser2",
                    password: "testuser2",
                    email: "testuser2@gmail.com",
                    role: "USER",
                    accounts: [
                        {
                            game: "65df8098fc13ae2387cd3c18"
                        }
                    ]
                }
            })
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Game with Id:{65df8098fc13ae2387cd3c18} not found");
    })

    it('Actualizar un usuario válido', async () => {
        const res = await request(app)
            .put('/api/users/664f5a92fc13ae6981c6417e')
            .send({
                user: {
                    name: "TestUser2",
                    password: "testuser2",
                    email: "testuser2@gmail.com",
                    role: "USER",
                    accounts: [
                        {
                            game: "65df8098fc13ae2387cd3c60"
                        }
                    ]
                }
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User {664f5a92fc13ae6981c6417e} updated successfully")
        await Prize.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })
})

describe('DELETE /api/users/:id', () => {
    it('Borrar un usuario inexistente', async ()=>{
        const res = await request(app)
            .delete('/api/users/664f530afc13ae6854c64945')
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with Id:{664f530afc13ae6854c64945} not found")
    })

    it('Borrar un usuario invalido', async ()=>{
        const res = await request(app)
            .delete('/api/users/pruebaid')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid user Id:{pruebaid}");
    })

    it('Borrar un usuario existente', async ()=> {
        const res = await request(app)
            .delete('/api/users/65f25284fc13ae2dcb316ea7')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("User with Id:{65f25284fc13ae2dcb316ea7} deleted successfully");
        expect(res.body).toHaveProperty('user');
    })
})