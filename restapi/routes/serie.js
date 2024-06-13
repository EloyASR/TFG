const { Router } = require('express')
const {find, findAll, add, upd, del } = require('../controllers/serie');

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Serie:
 *       type: object
 *       required:
 *         - bestOf
 *         - mode
 *         - game
 *         - date
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the Match
 *         bestOf:
 *           type: integer
 *           description: The max number of games
 *         mode:
 *           type: string
 *           description: The mode of the game that its set for this Match
 *         game:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the game of the match
 *         participant1:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the first participant of the match
 *         participant2:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the second participant of the match
 *         win:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the winner of the match
 *         lose:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the loser of the match
 *         date:
 *           type: string
 *           format: Date
 *           description: The date when the match will be played
 *         matchData:
 *           type: object
 *           description: Additional info for the match
 */

/**
 * @swagger
 * tags:
 *   name: Series
 *   description: The series managing API
 */

/**
 * @swagger
 * /series:
 *   get:
 *     summary: Find all series that match the query
 *     tags: [Series]
 */
router.get('/', findAll);

/**
 * @swagger
 * /series/{id}:
 *   get:
 *     summary: Find an existing serie by id
 *     tags: [Series]
 */
router.get('/:id', find);

/**
 * @swagger
 * /series:
 *   post:
 *     summary: Create a new serie
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Serie'
 *     responses:
 *       201:
 *         description: Serie created correctly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the Match
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
 * /series:
 *   put:
 *     summary: Update an existing serie
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Serie'
 */
router.put('/:id', upd);

/**
 * @swagger
 * /series/{id}:
 *   delete:
 *     summary: Remove the serie by id
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The match id
 */
router.delete('/:id', del);

module.exports = router