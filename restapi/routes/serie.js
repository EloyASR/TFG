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
 *         - type
 *         - mode
 *         - game
 *         - bestOf
 *         - result
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the serie
 *         type:
 *           type: string
 *           enum: [SINGLE,TEAM]
 *         mode:
 *           type: string
 *           description: The mode of the game of the serie
 *         game:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the game of the serie
 *         bestOf:
 *           type: integer
 *           description: The max number of games of the serie
 *         home_participant:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the home participant of the serie
 *         away_participant:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the away participant of the serie
 *         result:
 *           type: object
 *           properties:
 *             winner:
 *               type: string
 *               format: ObjectId
 *               description: The id identifying the winner of the serie
 *             home_result:
 *               type: integer
 *               description: The result of the home participant of the serie
 *             away_result:
 *               type: integer
 *               description: The result of the away participant of the serie
 *             matches:
 *               type: array
 *               items:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the match
 *               description: The matches of the serie
 *           description: The result of the serie
 *         status:
 *           type: string
 *           enum: [SCHEDULED,IN_GAME,FINISHED]
 *           description: The status of the serie
 */

/**
 * @swagger
 * tags:
 *   name: Series
 *   description: The series managing API
 */

/**
 * @swagger
 * /series/{id}:
 *   get:
 *     summary: Find an existing serie by id
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The serie id
 *     responses:
 *       200:
 *         description: Serie found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the serie
 *                 type:
 *                   type: string
 *                   enum: [SINGLE,TEAM]
 *                 mode:
 *                   type: string
 *                   description: The mode of the game of the serie
 *                 game:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the game of the serie
 *                 bestOf:
 *                   type: integer
 *                   description: The max number of games of the serie
 *                 home_participant:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the home participant of the serie
 *                 away_participant:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the away participant of the serie
 *                 result:
 *                   type: object
 *                   properties:
 *                     winner:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the winner of the serie
 *                     home_result:
 *                       type: integer
 *                       description: The result of the home participant of the serie
 *                     away_result:
 *                       type: integer
 *                       description: The result of the away participant of the serie
 *                     matches:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the match
 *                       description: The matches of the serie
 *                   description: The result of the serie
 *                 status:
 *                   type: string
 *                   enum: [SCHEDULED,IN_GAME,FINISHED]
 *                   description: The status of the serie
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
 * /series:
 *   get:
 *     summary: Find all series that match the query
 *     tags: [Series]
 *     responses:
 *       200:
 *         description: Series found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prizes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uid:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id of the serie
 *                       type:
 *                         type: string
 *                         enum: [SINGLE,TEAM]
 *                       mode:
 *                         type: string
 *                         description: The mode of the game of the serie
 *                       game:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the game of the serie
 *                       bestOf:
 *                         type: integer
 *                         description: The max number of games of the serie
 *                       home_participant:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the home participant of the serie
 *                       away_participant:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the away participant of the serie
 *                       result:
 *                         type: object
 *                         properties:
 *                           winner:
 *                             type: string
 *                             format: ObjectId
 *                             description: The id identifying the winner of the serie
 *                           home_result:
 *                             type: integer
 *                             description: The result of the home participant of the serie
 *                           away_result:
 *                             type: integer
 *                             description: The result of the away participant of the serie
 *                           matches:
 *                             type: array
 *                             items:
 *                               type: string
 *                               format: ObjectId
 *                               description: The id identifying the match
 *                             description: The matches of the serie
 *                         description: The result of the serie
 *                       status:
 *                         type: string
 *                         enum: [SCHEDULED,IN_GAME,FINISHED]
 *                         description: The status of the serie
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
 * /series:
 *   post:
 *     summary: Create a new serie
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [SINGLE,TEAM]
 *               mode:
 *                 type: string
 *                 description: The mode of the game of the serie
 *               game:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the game of the serie
 *               bestOf:
 *                 type: integer
 *                 description: The max number of games of the serie
 *               home_participant:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the home participant of the serie
 *               away_participant:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the away participant of the serie
 *               result:
 *                 type: object
 *                 properties:
 *                   winner:
 *                     type: string
 *                     format: ObjectId
 *                     description: The id identifying the winner of the serie
 *                   home_result:
 *                     type: integer
 *                     description: The result of the home participant of the serie
 *                   away_result:
 *                     type: integer
 *                     description: The result of the away participant of the serie
 *                   matches:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the match
 *                     description: The matches of the serie
 *                 description: The result of the serie
 *               status:
 *                 type: string
 *                 enum: [SCHEDULED,IN_GAME,FINISHED]
 *                 description: The status of the serie
 *     responses:
 *       201:
 *         description: Serie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The id of the serie
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
 * /series/{id}:
 *   put:
 *     summary: Update an existing serie
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The serie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [SINGLE,TEAM]
 *               mode:
 *                 type: string
 *                 description: The mode of the game of the serie
 *               game:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the game of the serie
 *               bestOf:
 *                 type: integer
 *                 description: The max number of games of the serie
 *               home_participant:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the home participant of the serie
 *               away_participant:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the away participant of the serie
 *               result:
 *                 type: object
 *                 properties:
 *                   winner:
 *                     type: string
 *                     format: ObjectId
 *                     description: The id identifying the winner of the serie
 *                   home_result:
 *                     type: integer
 *                     description: The result of the home participant of the serie
 *                   away_result:
 *                     type: integer
 *                     description: The result of the away participant of the serie
 *                   matches:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the match
 *                     description: The matches of the serie
 *                 description: The result of the serie
 *               status:
 *                 type: string
 *                 enum: [SCHEDULED,IN_GAME,FINISHED]
 *                 description: The status of the serie
 *     responses:
 *       200:
 *         description: Serie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Serie updated successfully message
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
 * /series/{id}:
 *   delete:
 *     summary: Delete a serie by id
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The serie id
 *     responses:
 *       200:
 *         description: Serie deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Serie deleted successfully message
 *                 serie:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id of the serie
 *                     type:
 *                       type: string
 *                       enum: [SINGLE,TEAM]
 *                     mode:
 *                       type: string
 *                       description: The mode of the game of the serie
 *                     game:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the game of the serie
 *                     bestOf:
 *                       type: integer
 *                       description: The max number of games of the serie
 *                     home_participant:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the home participant of the serie
 *                     away_participant:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the away participant of the serie
 *                     result:
 *                       type: object
 *                       properties:
 *                         winner:
 *                           type: string
 *                           format: ObjectId
 *                           description: The id identifying the winner of the serie
 *                         home_result:
 *                           type: integer
 *                           description: The result of the home participant of the serie
 *                         away_result:
 *                           type: integer
 *                           description: The result of the away participant of the serie
 *                         matches:
 *                           type: array
 *                           items:
 *                             type: string
 *                             format: ObjectId
 *                             description: The id identifying the match
 *                           description: The matches of the serie
 *                       description: The result of the serie
 *                     status:
 *                       type: string
 *                       enum: [SCHEDULED,IN_GAME,FINISHED]
 *                       description: The status of the serie
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