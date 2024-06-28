const { Router } = require('express');
const { find, findAll, add, upd, del } = require('../controllers/game');

const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - _name
 *         - name
 *         - modes
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the game
 *         _name:
 *           type: string
 *           description: The private name of the game
 *         name:
 *           type: string
 *           description: The public name of the game
 *         modes:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - _name
 *               - name
 *             properties:
 *               _name:
 *                 type: string
 *                 description: The private name of the mode
 *               name:
 *                 type: string
 *                 description: The public name of the mode
 *             description: A game mode
 *           description: The modes of the game
 */

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: The games managing API
 */

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Find an existing game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: Game found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the game
 *                 _name:
 *                   type: string
 *                   description: The private name of the game
 *                 name:
 *                   type: string
 *                   description: The public name of the game
 *                 modes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - _name
 *                       - name
 *                     properties:
 *                       _name:
 *                         type: string
 *                         description: The private name of the mode
 *                       name:
 *                         type: string
 *                         description: The public name of the mode
 *                     description: A game mode
 *                   description: The modes of the game
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
 *
 */
router.get('/:id', find);

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Find all games that match the query
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Games found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 games:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uid:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id of the game
 *                       _name:
 *                         type: string
 *                         description: The private name of the game
 *                       name:
 *                         type: string
 *                         description: The public name of the game
 *                       modes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           required:
 *                             - _name
 *                             - name
 *                           properties:
 *                             _name:
 *                               type: string
 *                               description: The private name of the mode
 *                             name:
 *                               type: string
 *                               description: The public name of the mode
 *                           description: A game mode
 *                         description: The modes of the game
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
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _name:
 *                 type: string
 *                 description: The private name of the game
 *               name:
 *                 type: string
 *                 description: The public name of the game
 *               modes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - _name
 *                     - name
 *                   properties:
 *                     _name:
 *                       type: string
 *                       description: The private name of the mode
 *                     name:
 *                       type: string
 *                       description: The public name of the mode
 *                   description: A game mode
 *                 description: The modes of the game
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the game
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
router.post('/', add);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update an existing game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The game id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _name:
 *                 type: string
 *                 description: The private name of the game
 *               name:
 *                 type: string
 *                 description: The public name of the game
 *               modes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - _name
 *                     - name
 *                   properties:
 *                     _name:
 *                       type: string
 *                       description: The private name of the mode
 *                     name:
 *                       type: string
 *                       description: The public name of the mode
 *                   description: A game mode
 *                 description: The modes of the game
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Game updated successfully message
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
 *
 */
router.put('/:id', upd);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Game deleted successfully message
 *                 game:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id of the game
 *                     _name:
 *                       type: string
 *                       description: The private name of the game
 *                     name:
 *                       type: string
 *                       description: The public name of the game
 *                     modes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - _name
 *                           - name
 *                         properties:
 *                           _name:
 *                             type: string
 *                             description: The private name of the mode
 *                           name:
 *                             type: string
 *                             description: The public name of the mode
 *                         description: A game mode
 *                       description: The modes of the game
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