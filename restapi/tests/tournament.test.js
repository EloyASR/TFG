const request  =  require('supertest');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require("../database/config");
const {tournamentIds, tournaments} = require('./mock_data/tournament');
const Tournament = require("../models/tournament");
const Prize = require("../models/prize");
const mongoose = require("mongoose");
const {User} = require("../models/user");
const {users, userIds} = require("./mock_data/user");
const {prizeIds, prizes} = require("./mock_data/prize");
const Game = require("../models/game");
const {games, gameIds} = require("./mock_data/game");

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

    await Game.insertMany(games)
        .catch(function (err) {
            console.log(err);
        });

    await Tournament.insertMany(tournaments)
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
        });

    await Game.deleteMany({_id: { $in: gameIds}})
        .catch(function(err){
            console.log(err);
        })

    await Tournament.deleteMany({_id: { $in: tournamentIds}})
        .catch(function(err){
            console.log(err);
        })
})

//PRUEBAS BÚSQUEDA DE TORNEOS CON FILTROS

describe('GET /api/tournaments', () => {
    it("Buscar todos los torneos", async ()=>{
        const res = await request(app)
            .get('/api/tournaments');
        expect(res.statusCode).toEqual(200);
        expect(res.body.tournaments.length).toBeGreaterThan(2);
    })

    it("Buscar todos los torneos con status closed", async ()=>{
        const res = await request(app)
            .get('/api/tournaments?status=CLOSED');
        expect(res.statusCode).toEqual(200);
        expect(res.body.tournaments.length).toBeGreaterThan(1);
    })

    it("Buscar todos los torneos de un juego", async ()=>{
        const res = await request(app)
            .get('/api/tournaments?game=65df8098fc13ae2387cd3c60');
        expect(res.statusCode).toEqual(200);
        expect(res.body.tournaments).toHaveLength(2);
    })

    it("Buscar todos los torneos de un creador", async ()=>{
        const res = await request(app)
            .get('/api/tournaments?creator=65f25284fc13ae2dcb316ea7');
        expect(res.statusCode).toEqual(200);
        expect(res.body.tournaments).toHaveLength(2);
    })

    it("Buscar todos los torneos con un sponsor", async ()=>{
        const res = await request(app)
            .get('/api/tournaments?sponsor=664f5a92fc13ae6981c6417e');
        expect(res.statusCode).toEqual(200);
        expect(res.body.tournaments).toHaveLength(1);
    })
})

describe('GET /api/tournaments/:id', () => {
    it("Buscar torneo con id inválido", async ()=>{
        const res = await request(app).get('/api/tournaments/pruebaid');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid tournament Id: {pruebaid}");
    })

    it("Buscar torneo inexistente", async ()=>{
        const res = await request(app).get('/api/tournaments/664f530afc13ae6854c64954');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Tournament with Id:{664f530afc13ae6854c64954} not found");
    })

    it("Buscar torneo con id válido", async ()=>{
        const res = await request(app).get('/api/tournaments/666edb0dfc13ae6b27234522');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('rules');
    })
})

describe('POST /api/tournaments', () => {
    it("Crear torneo valido", async ()=> {
        const res = await request(app)
            .post('/api/tournaments')
            .send({
                currentPhase: 0,
                status: "INSCRIPTIONS_CLOSED",
                participants:[],
                phases: [
                    {
                        phaseOrder: 1,
                        formatType: "BRACKET_PHASE",
                        phaseName: "FASE_1_TORNEO",
                        bracketData: {
                            size: 2,
                            tieBreaker: false,
                            bestOf: 1,
                            rounds: [
                                {
                                    roundNumber: 0,
                                    series: [
                                        {
                                            serieNumber: 0,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 0,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 1,
                                            next_round: 1,
                                            next_serie: 0,
                                        },
                                        {
                                            serieNumber: 1,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 2,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 3,
                                            next_round: 1,
                                            next_serie: 0,
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                sponsoredBy: [
                    {
                        id: new mongoose.mongo.ObjectId("664f5a92fc13ae6981c6417e"), //USER 4
                        prize: new mongoose.mongo.ObjectId("664f530afc13ae6854c649b3") //PRIZE 2
                    }
                ],
                creator:new mongoose.mongo.ObjectId("65f25284fc13ae2dcb316ea7"), //USER 3
                name:"TOURNAMENT TEST",
                size:8,
                description:"Descripción TOURNAMENT TEST",
                rules:"Reglas TOURNAMENT TEST",
                game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
                mode:"ARAM_1VS1",
                participantsType:"SINGLE",
                online:true,
                initDate:new Date(new Date().setDate(new Date().getDate() + 3)),
                endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                inscription: true,
                inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                prize: new mongoose.mongo.ObjectId("664f530afc13ae6854c649b2") //PRIZE 1
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        await Tournament.deleteOne({_id: new mongoose.mongo.ObjectId(res.body.id)});
    })

    it("Crear torneo con creator inexistente", async ()=> {
        const res = await request(app)
            .post('/api/tournaments')
            .send({
                currentPhase: 0,
                status: "INSCRIPTIONS_CLOSED",
                participants:[],
                phases: [
                    {
                        phaseOrder: 1,
                        formatType: "BRACKET_PHASE",
                        phaseName: "FASE_1_TORNEO",
                        bracketData: {
                            size: 2,
                            tieBreaker: false,
                            bestOf: 1,
                            rounds: [
                                {
                                    roundNumber: 0,
                                    series: [
                                        {
                                            serieNumber: 0,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 0,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 1,
                                            next_round: 1,
                                            next_serie: 0,
                                        },
                                        {
                                            serieNumber: 1,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 2,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 3,
                                            next_round: 1,
                                            next_serie: 0,
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                sponsoredBy: [
                    {
                        id: "664f5a92fc13ae6981c6417e", //USER 4
                        prize: "664f530afc13ae6854c649b3" //PRIZE 2
                    }
                ],
                creator:"65f25284fc13ae2dcb316e32",
                name:"TOURNAMENT TEST",
                size:8,
                description:"Descripción TOURNAMENT TEST",
                rules:"Reglas TOURNAMENT TEST",
                game:"65df8098fc13ae2387cd3c60", //LEAGUE OF LEGENDS
                mode:"ARAM_1VS1",
                participantsType:"SINGLE",
                online:true,
                initDate:new Date(new Date().setDate(new Date().getDate() + 3)),
                endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                inscription: true,
                inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                prize: "664f530afc13ae6854c649b2" //PRIZE 1
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Crear torneo con creator invalido", async ()=> {
        const res = await request(app)
            .post('/api/tournaments')
            .send({
                currentPhase: 0,
                status: "INSCRIPTIONS_CLOSED",
                participants:[],
                phases: [
                    {
                        phaseOrder: 1,
                        formatType: "BRACKET_PHASE",
                        phaseName: "FASE_1_TORNEO",
                        bracketData: {
                            size: 2,
                            tieBreaker: false,
                            bestOf: 1,
                            rounds: [
                                {
                                    roundNumber: 0,
                                    series: [
                                        {
                                            serieNumber: 0,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 0,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 1,
                                            next_round: 1,
                                            next_serie: 0,
                                        },
                                        {
                                            serieNumber: 1,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 2,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 3,
                                            next_round: 1,
                                            next_serie: 0,
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                sponsoredBy: [
                    {
                        id:"664f5a92fc13ae6981c6417e", //USER 4
                        prize: "664f530afc13ae6854c649b3" //PRIZE 2
                    }
                ],
                creator:"pruebaid", //USER 3
                name:"TOURNAMENT TEST",
                size:8,
                description:"Descripción TOURNAMENT TEST",
                rules:"Reglas TOURNAMENT TEST",
                game:"65df8098fc13ae2387cd3c60", //LEAGUE OF LEGENDS
                mode:"ARAM_1VS1",
                participantsType:"SINGLE",
                online:true,
                initDate:new Date(new Date().setDate(new Date().getDate() + 3)),
                endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                inscription: true,
                inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                prize:"664f530afc13ae6854c649b2" //PRIZE 1
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Crear torneo con game inexistente", async ()=> {
        const res = await request(app)
            .post('/api/tournaments')
            .send({
                currentPhase: 0,
                status: "INSCRIPTIONS_CLOSED",
                participants:[],
                phases: [
                    {
                        phaseOrder: 1,
                        formatType: "BRACKET_PHASE",
                        phaseName: "FASE_1_TORNEO",
                        bracketData: {
                            size: 2,
                            tieBreaker: false,
                            bestOf: 1,
                            rounds: [
                                {
                                    roundNumber: 0,
                                    series: [
                                        {
                                            serieNumber: 0,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 0,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 1,
                                            next_round: 1,
                                            next_serie: 0,
                                        },
                                        {
                                            serieNumber: 1,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 2,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 3,
                                            next_round: 1,
                                            next_serie: 0,
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                sponsoredBy: [
                    {
                        id: new mongoose.mongo.ObjectId("664f5a92fc13ae6981c6417e"), //USER 4
                        prize: new mongoose.mongo.ObjectId("664f530afc13ae6854c649b3") //PRIZE 2
                    }
                ],
                creator:new mongoose.mongo.ObjectId("65f25284fc13ae2dcb316ea7"), //USER 3
                name:"TOURNAMENT TEST",
                size:8,
                description:"Descripción TOURNAMENT TEST",
                rules:"Reglas TOURNAMENT TEST",
                game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3f12"),
                mode:"ARAM_1VS1",
                participantsType:"SINGLE",
                online:true,
                initDate:new Date(new Date().setDate(new Date().getDate() + 3)),
                endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                inscription: true,
                inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                prize: new mongoose.mongo.ObjectId("664f530afc13ae6854c649b2") //PRIZE 1
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Crear torneo con game invalido", async ()=> {
        const res = await request(app)
            .post('/api/tournaments')
            .send({
                currentPhase: 0,
                status: "INSCRIPTIONS_CLOSED",
                participants:[],
                phases: [
                    {
                        phaseOrder: 1,
                        formatType: "BRACKET_PHASE",
                        phaseName: "FASE_1_TORNEO",
                        bracketData: {
                            size: 2,
                            tieBreaker: false,
                            bestOf: 1,
                            rounds: [
                                {
                                    roundNumber: 0,
                                    series: [
                                        {
                                            serieNumber: 0,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 0,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 1,
                                            next_round: 1,
                                            next_serie: 0,
                                        },
                                        {
                                            serieNumber: 1,
                                            roundNumber: 0,
                                            home_participant_parent_round: -1,
                                            home_participant_parent_serie: 2,
                                            away_participant_parent_round: -1,
                                            away_participant_parent_serie: 3,
                                            next_round: 1,
                                            next_serie: 0,
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                sponsoredBy: [
                    {
                        id: "664f5a92fc13ae6981c6417e", //USER 4
                        prize: "664f530afc13ae6854c649b3" //PRIZE 2
                    }
                ],
                creator:"65f25284fc13ae2dcb316ea7", //USER 3
                name:"TOURNAMENT TEST",
                size:8,
                description:"Descripción TOURNAMENT TEST",
                rules:"Reglas TOURNAMENT TEST",
                game:"pruebaid",
                mode:"ARAM_1VS1",
                participantsType:"SINGLE",
                online:true,
                initDate:new Date(new Date().setDate(new Date().getDate() + 3)),
                endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                inscription: true,
                inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                prize:"664f530afc13ae6854c649b2" //PRIZE 1
            })
        expect(res.statusCode).toEqual(404);
    })
})

describe('PUT /api/tournaments/:id', () => {
    it("Actualizar torneo valido", async ()=> {
        const res = await request(app)
            .put('/api/tournaments/666edb0dfc13ae6b27234522')
            .send({
                tournament: {
                    currentPhase: 0,
                    status: "INSCRIPTIONS_CLOSED",
                    participants: [],
                    phases: [
                        {
                            phaseOrder: 1,
                            formatType: "BRACKET_PHASE",
                            phaseName: "FASE_1_TORNEO",
                            bracketData: {
                                size: 2,
                                tieBreaker: false,
                                bestOf: 1,
                                rounds: [
                                    {
                                        roundNumber: 0,
                                        series: [
                                            {
                                                serieNumber: 0,
                                                roundNumber: 0,
                                                home_participant_parent_round: -1,
                                                home_participant_parent_serie: 0,
                                                away_participant_parent_round: -1,
                                                away_participant_parent_serie: 1,
                                                next_round: 1,
                                                next_serie: 0,
                                            },
                                            {
                                                serieNumber: 1,
                                                roundNumber: 0,
                                                home_participant_parent_round: -1,
                                                home_participant_parent_serie: 2,
                                                away_participant_parent_round: -1,
                                                away_participant_parent_serie: 3,
                                                next_round: 1,
                                                next_serie: 0,
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    sponsoredBy: [
                        {
                            id: "664f5a92fc13ae6981c6417e", //USER 4
                            prize: "664f530afc13ae6854c649b3" //PRIZE 2
                        }
                    ],
                    creator: "65f25284fc13ae2dcb316ea7", //USER 3
                    name: "TOURNAMENT TEST",
                    size: 8,
                    description: "Descripción TOURNAMENT TEST",
                    rules: "Reglas TOURNAMENT TEST",
                    game: "65df8098fc13ae2387cd3c60", //LEAGUE OF LEGENDS
                    mode: "ARAM_1VS1",
                    participantsType: "SINGLE",
                    online: true,
                    initDate: new Date(new Date().setDate(new Date().getDate() + 3)),
                    endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                    inscription: true,
                    inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                    inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                    prize: "664f530afc13ae6854c649b2" //PRIZE 1
                }
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Tournament {666edb0dfc13ae6b27234522} updated successfully");
    })

    it("Actualizar torneo con game inexistente", async ()=> {
        const res = await request(app)
            .put('/api/tournaments/666edb0dfc13ae6b27234522')
            .send({
                tournament: {
                    currentPhase: 0,
                    status: "INSCRIPTIONS_CLOSED",
                    participants: [
                        {
                            id: "65df8098fc13ae2387cd3c62",
                            participantType: "SINGLE"
                        }
                    ],
                    phases: [
                        {
                            phaseOrder: 1,
                            formatType: "BRACKET_PHASE",
                            phaseName: "FASE_1_TORNEO",
                            bracketData: {
                                size: 2,
                                tieBreaker: false,
                                bestOf: 1,
                                rounds: [
                                    {
                                        roundNumber: 0,
                                        series: [
                                            {
                                                serieNumber: 0,
                                                roundNumber: 0,
                                                home_participant_parent_round: -1,
                                                home_participant_parent_serie: 0,
                                                away_participant_parent_round: -1,
                                                away_participant_parent_serie: 1,
                                                next_round: 1,
                                                next_serie: 0,
                                            },
                                            {
                                                serieNumber: 1,
                                                roundNumber: 0,
                                                home_participant_parent_round: -1,
                                                home_participant_parent_serie: 2,
                                                away_participant_parent_round: -1,
                                                away_participant_parent_serie: 3,
                                                next_round: 1,
                                                next_serie: 0,
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    sponsoredBy: [
                        {
                            id: "664f5a92fc13ae6981c6417e", //USER 4
                            prize: "664f530afc13ae6854c649b3" //PRIZE 2
                        }
                    ],
                    creator: "65f25284fc13ae2dcb316ea7", //USER 3
                    name: "TOURNAMENT TEST",
                    size: 8,
                    description: "Descripción TOURNAMENT TEST",
                    rules: "Reglas TOURNAMENT TEST",
                    game: "65df8098fc13ae2387cd3c34",
                    mode: "ARAM_1VS1",
                    participantsType: "SINGLE",
                    online: true,
                    initDate: new Date(new Date().setDate(new Date().getDate() + 3)),
                    endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                    inscription: true,
                    inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                    inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                    prize: "664f530afc13ae6854c649b2" //PRIZE 1
                }
            })
        expect(res.statusCode).toEqual(404);
    })

    it("Actualizar torneo con game invalido", async ()=> {
        const res = await request(app)
            .put('/api/tournaments/666edb0dfc13ae6b27234522')
            .send({
                tournament: {
                    currentPhase: 0,
                    status: "INSCRIPTIONS_CLOSED",
                    participants: [],
                    phases: [
                        {
                            phaseOrder: 1,
                            formatType: "BRACKET_PHASE",
                            phaseName: "FASE_1_TORNEO",
                            bracketData: {
                                size: 2,
                                tieBreaker: false,
                                bestOf: 1,
                                rounds: [
                                    {
                                        roundNumber: 0,
                                        series: [
                                            {
                                                serieNumber: 0,
                                                roundNumber: 0,
                                                home_participant_parent_round: -1,
                                                home_participant_parent_serie: 0,
                                                away_participant_parent_round: -1,
                                                away_participant_parent_serie: 1,
                                                next_round: 1,
                                                next_serie: 0,
                                            },
                                            {
                                                serieNumber: 1,
                                                roundNumber: 0,
                                                home_participant_parent_round: -1,
                                                home_participant_parent_serie: 2,
                                                away_participant_parent_round: -1,
                                                away_participant_parent_serie: 3,
                                                next_round: 1,
                                                next_serie: 0,
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    sponsoredBy: [
                        {
                            id: "664f5a92fc13ae6981c6417e", //USER 4
                            prize: "664f530afc13ae6854c649b3" //PRIZE 2
                        }
                    ],
                    creator: "65f25284fc13ae2dcb316ea7", //USER 3
                    name: "TOURNAMENT TEST",
                    size: 8,
                    description: "Descripción TOURNAMENT TEST",
                    rules: "Reglas TOURNAMENT TEST",
                    game: "pruebaid",
                    mode: "ARAM_1VS1",
                    participantsType: "SINGLE",
                    online: true,
                    initDate: new Date(new Date().setDate(new Date().getDate() + 3)),
                    endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
                    inscription: true,
                    inscriptionInitDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                    inscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                    prize: "664f530afc13ae6854c649b2" //PRIZE 1
                }
            })
        expect(res.statusCode).toEqual(404);
    })
})

describe('DELETE /api/tournaments/:id', ()=>{
    it('Borrar un torneo inexistente', async ()=>{
        const res = await request(app)
            .delete('/api/tournaments/664f530afc13ae6854c64945')
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Tournament with Id:{664f530afc13ae6854c64945} not found")
    })

    it('Borrar un torneo invalido', async ()=>{
        const res = await request(app)
            .delete('/api/tournaments/pruebaid')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Invalid tournament Id:{pruebaid}");
    })

    it('Borrar un torneo existente', async ()=> {
        const res = await request(app)
            .delete('/api/tournaments/666edb0dfc13ae6b27234522')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual("Tournament with Id:{666edb0dfc13ae6b27234522} deleted successfully");
        expect(res.body).toHaveProperty('tournament');
    })
})