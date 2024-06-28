const { Router } = require('express')
const {find, findAll, add, upd, del } = require('../controllers/match');

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       required:
 *         - mode
 *         - game
 *         - serie
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the match
 *         type:
 *           type: string
 *           enum: [SINGLE, TEAM]
 *         mode:
 *           type: string
 *           description: The mode of the game that its set for this match
 *         game:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the game of the match
 *         serie:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the serie of the match
 *         matchData:
 *           type: object
 *           description: Additional info for the match
 */

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: The matches managing API
 */

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Find an existing match by id
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The match id
 *     responses:
 *       200:
 *         description: Match found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the match
 *                 type:
 *                   type: string
 *                   enum: [SINGLE, TEAM]
 *                 mode:
 *                   type: string
 *                   description: The mode of the game that its set for this Match
 *                 game:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the game of the match
 *                 serie:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the serie of the match
 *                 matchData:
 *                   type: object
 *                   description: Additional info for the match
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
 * /matches:
 *   get:
 *     summary: Find all matches that match the query
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Matches found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matches:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uid:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id of the match
 *                       type:
 *                         type: string
 *                         enum: [SINGLE, TEAM]
 *                       mode:
 *                         type: string
 *                         description: The mode of the game that its set for this Match
 *                       game:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the game of the match
 *                       serie:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the serie of the match
 *                       matchData:
 *                         type: object
 *                         description: Additional info for the match
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
 * /matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [SINGLE, TEAM]
 *               mode:
 *                 type: string
 *                 description: The mode of the game that its set for this Match
 *               game:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the game of the match
 *               serie:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the serie of the match
 *               matchData:
 *                 type: object
 *                 description: Additional info for the match
 *     responses:
 *       201:
 *         description: Match created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the match
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
 * /matches/{id}:
 *   put:
 *     summary: Update an existing match
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The match id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [SINGLE, TEAM]
 *               mode:
 *                 type: string
 *                 description: The mode of the game that its set for this Match
 *               game:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the game of the match
 *               serie:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the serie of the match
 *               matchData:
 *                 type: object
 *                 description: Additional info for the match
 *     responses:
 *       200:
 *         description: Match updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Match updated successfully message
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
 * /matches/{id}:
 *   delete:
 *     summary: Delete a match by id
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The match id
 *     responses:
 *       200:
 *         description: Match deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Match deleted successfully message
 *                 match:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id of the match
 *                     type:
 *                       type: string
 *                       enum: [SINGLE, TEAM]
 *                     mode:
 *                       type: string
 *                       description: The mode of the game that its set for this Match
 *                     game:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the game of the match
 *                     serie:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the serie of the match
 *                     matchData:
 *                       type: object
 *                       description: Additional info for the match
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

module.exports = router