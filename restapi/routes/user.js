const { Router } = require('express');
const { find, findAll, add, upd, del } = require('../controllers/user');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         role:
 *           type: string
 *           enum: [USER, ADMIN, COMPANY]
 *         icon:
 *           type: string
 *           description: The name of the icon of the user
 *         accounts:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - game
 *             properties:
 *               game:
 *                 type: string
 *                 format: ObjectId
 *                 description: The game of the account
 *               leagueOfLegendsAccountInfo:
 *                 type: object
 *                 required:
 *                   - puuid
 *                   - gameName
 *                   - tagLine
 *                   - summonerId
 *                   - accountId
 *                 properties:
 *                   puuid:
 *                     type: string
 *                     description: The puuid of the account
 *                   gameName:
 *                     type: string
 *                     description: The name of the account in game
 *                   tagLine:
 *                     type: string
 *                     description: The tag of the account
 *                   summonerId:
 *                     type: string
 *                     description: The id of the summoner
 *                   accountId:
 *                     type: string
 *                     description: The id of the account
 *                 description: The data if the game is League of Legends
 *               valorantAccountInfo:
 *                 type: object
 *                 required:
 *                   - puuid
 *                   - tagLine
 *                   - summonerId
 *                   - accountId
 *                 properties:
 *                   puuid:
 *                     type: string
 *                     description: The puuid of the account
 *                   tagLine:
 *                     type: string
 *                     description: The tag of the account
 *                   summonerId:
 *                     type: string
 *                     description: The id of the summoner
 *                   accountId:
 *                     type: string
 *                     description: The id of the account
 *                 description: The data if the game is Valorant
 *               pokemonAccountInfo:
 *                 type: object
 *                 required:
 *                   - profileId
 *                 properties:
 *                   profileId:
 *                     type: string
 *                     description: The id of the account
 *                 description: The data if the game is Pokemon VGC
 *             description: Account of the user
 *           description: The accounts of the user
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Find an existing user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                 role:
 *                   type: string
 *                   enum: [USER, ADMIN, COMPANY]
 *                 icon:
 *                   type: string
 *                   description: The name of the icon of the user
 *                 accounts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - game
 *                     properties:
 *                       game:
 *                         type: string
 *                         format: ObjectId
 *                         description: The game of the account
 *                       leagueOfLegendsAccountInfo:
 *                         type: object
 *                         properties:
 *                           puuid:
 *                             type: string
 *                             description: The puuid of the account
 *                           gameName:
 *                             type: string
 *                             description: The name of the account in game
 *                           tagLine:
 *                             type: string
 *                             description: The tag of the account
 *                           summonerId:
 *                             type: string
 *                             description: The id of the summoner
 *                           accountId:
 *                             type: string
 *                             description: The id of the account
 *                         description: The data if the game is League of Legends
 *                       valorantAccountInfo:
 *                         type: object
 *                         properties:
 *                           puuid:
 *                             type: string
 *                             description: The puuid of the account
 *                           tagLine:
 *                             type: string
 *                             description: The tag of the account
 *                           summonerId:
 *                             type: string
 *                             description: The id of the summoner
 *                           accountId:
 *                             type: string
 *                             description: The id of the account
 *                         description: The data if the game is Valorant
 *                       pokemonAccountInfo:
 *                         type: object
 *                         properties:
 *                           profileId:
 *                             type: string
 *                             description: The id of the account
 *                         description: The data if the game is Pokemon VGC
 *                     description: Account of the user
 *                   description: The accounts of the user
 *       400:
 *         description: Some error with the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message explaining the error
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message that indicate the missing resource
 */
router.get('/:id', find);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Find all users that match the query
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uid:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id of the user
 *                       name:
 *                         type: string
 *                         description: The name of the user
 *                       email:
 *                         type: string
 *                         description: The email of the user
 *                       role:
 *                         type: string
 *                         enum: [USER, ADMIN, COMPANY]
 *                       icon:
 *                         type: string
 *                         description: The name of the icon of the user
 *                       accounts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           required:
 *                             - game
 *                           properties:
 *                             game:
 *                               type: string
 *                               format: ObjectId
 *                               description: The game of the account
 *                             leagueOfLegendsAccountInfo:
 *                               type: object
 *                               properties:
 *                                 puuid:
 *                                   type: string
 *                                   description: The puuid of the account
 *                                 gameName:
 *                                   type: string
 *                                   description: The name of the account in game
 *                                 tagLine:
 *                                   type: string
 *                                   description: The tag of the account
 *                                 summonerId:
 *                                   type: string
 *                                   description: The id of the summoner
 *                                 accountId:
 *                                   type: string
 *                                   description: The id of the account
 *                               description: The data if the game is League of Legends
 *                             valorantAccountInfo:
 *                               type: object
 *                               properties:
 *                                 puuid:
 *                                   type: string
 *                                   description: The puuid of the account
 *                                 tagLine:
 *                                   type: string
 *                                   description: The tag of the account
 *                                 summonerId:
 *                                   type: string
 *                                   description: The id of the summoner
 *                                 accountId:
 *                                   type: string
 *                                   description: The id of the account
 *                               description: The data if the game is Valorant
 *                             pokemonAccountInfo:
 *                               type: object
 *                               properties:
 *                                 profileId:
 *                                   type: string
 *                                   description: The id of the account
 *                               description: The data if the game is Pokemon VGC
 *                           description: Account of the user
 *                         description: The accounts of the user
 *       400:
 *         description: Some error with the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message explaining the error
 */
router.get('/', findAll);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN, COMPANY]
 *               icon:
 *                 type: string
 *                 description: The name of the icon of the user
 *               accounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - game
 *                   properties:
 *                     game:
 *                       type: string
 *                       format: ObjectId
 *                       description: The game of the account
 *                     leagueOfLegendsAccountInfo:
 *                       type: object
 *                       required:
 *                         - puuid
 *                         - gameName
 *                         - tagLine
 *                         - summonerId
 *                         - accountId
 *                       properties:
 *                         puuid:
 *                           type: string
 *                           description: The puuid of the account
 *                         gameName:
 *                           type: string
 *                           description: The name of the account in game
 *                         tagLine:
 *                           type: string
 *                           description: The tag of the account
 *                         summonerId:
 *                           type: string
 *                           description: The id of the summoner
 *                         accountId:
 *                           type: string
 *                           description: The id of the account
 *                       description: The data if the game is League of Legends
 *                     valorantAccountInfo:
 *                       type: object
 *                       required:
 *                         - puuid
 *                         - tagLine
 *                         - summonerId
 *                         - accountId
 *                       properties:
 *                         puuid:
 *                           type: string
 *                           description: The puuid of the account
 *                         tagLine:
 *                           type: string
 *                           description: The tag of the account
 *                         summonerId:
 *                           type: string
 *                           description: The id of the summoner
 *                         accountId:
 *                           type: string
 *                           description: The id of the account
 *                       description: The data if the game is Valorant
 *                     pokemonAccountInfo:
 *                       type: object
 *                       required:
 *                         - profileId
 *                       properties:
 *                         profileId:
 *                           type: string
 *                           description: The id of the account
 *                       description: The data if the game is Pokemon VGC
 *                   description: Account of the user
 *                 description: The accounts of the user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the user
 *       400:
 *         description: Some error with the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message explaining the error
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message that indicate the missing resource
 */
router.post('/', add);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing match
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN, COMPANY]
 *               icon:
 *                 type: string
 *                 description: The name of the icon of the user
 *               accounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - game
 *                   properties:
 *                     game:
 *                       type: string
 *                       format: ObjectId
 *                       description: The game of the account
 *                     leagueOfLegendsAccountInfo:
 *                       type: object
 *                       required:
 *                         - puuid
 *                         - gameName
 *                         - tagLine
 *                         - summonerId
 *                         - accountId
 *                       properties:
 *                         puuid:
 *                           type: string
 *                           description: The puuid of the account
 *                         gameName:
 *                           type: string
 *                           description: The name of the account in game
 *                         tagLine:
 *                           type: string
 *                           description: The tag of the account
 *                         summonerId:
 *                           type: string
 *                           description: The id of the summoner
 *                         accountId:
 *                           type: string
 *                           description: The id of the account
 *                       description: The data if the game is League of Legends
 *                     valorantAccountInfo:
 *                       type: object
 *                       required:
 *                         - puuid
 *                         - tagLine
 *                         - summonerId
 *                         - accountId
 *                       properties:
 *                         puuid:
 *                           type: string
 *                           description: The puuid of the account
 *                         tagLine:
 *                           type: string
 *                           description: The tag of the account
 *                         summonerId:
 *                           type: string
 *                           description: The id of the summoner
 *                         accountId:
 *                           type: string
 *                           description: The id of the account
 *                       description: The data if the game is Valorant
 *                     pokemonAccountInfo:
 *                       type: object
 *                       required:
 *                         - profileId
 *                       properties:
 *                         profileId:
 *                           type: string
 *                           description: The id of the account
 *                       description: The data if the game is Pokemon VGC
 *                   description: Account of the user
 *                 description: The accounts of the user
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: User updated successfully message
 *       400:
 *         description: Some error with the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message explaining the error
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message that indicate the missing resource
 */
router.put('/:id', upd);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: User deleted successfully message
 *                 prize:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id of the user
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                     role:
 *                       type: string
 *                       enum: [USER, ADMIN, COMPANY]
 *                     icon:
 *                       type: string
 *                       description: The name of the icon of the user
 *                     accounts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - game
 *                         properties:
 *                           game:
 *                             type: string
 *                             format: ObjectId
 *                             description: The game of the account
 *                           leagueOfLegendsAccountInfo:
 *                             type: object
 *                             properties:
 *                               puuid:
 *                                 type: string
 *                                 description: The puuid of the account
 *                               gameName:
 *                                 type: string
 *                                 description: The name of the account in game
 *                               tagLine:
 *                                 type: string
 *                                 description: The tag of the account
 *                               summonerId:
 *                                 type: string
 *                                 description: The id of the summoner
 *                               accountId:
 *                                 type: string
 *                                 description: The id of the account
 *                             description: The data if the game is League of Legends
 *                           valorantAccountInfo:
 *                             type: object
 *                             properties:
 *                               puuid:
 *                                 type: string
 *                                 description: The puuid of the account
 *                               tagLine:
 *                                 type: string
 *                                 description: The tag of the account
 *                               summonerId:
 *                                 type: string
 *                                 description: The id of the summoner
 *                               accountId:
 *                                 type: string
 *                                 description: The id of the account
 *                             description: The data if the game is Valorant
 *                           pokemonAccountInfo:
 *                             type: object
 *                             properties:
 *                               profileId:
 *                                 type: string
 *                                 description: The id of the account
 *                             description: The data if the game is Pokemon VGC
 *                         description: Account of the user
 *                       description: The accounts of the user
 *       400:
 *         description: Some error with the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message explaining the error
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message that indicate the missing resource
 */
router.delete('/:id', del);

module.exports = router;