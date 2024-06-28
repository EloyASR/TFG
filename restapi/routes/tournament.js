const { Router } = require('express');
const { find, findAll, add, upd, del } = require('../controllers/tournament');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tournament:
 *       type: object
 *       required:
 *         - name
 *         - game
 *         - mode
 *         - size
 *         - participantsType
 *         - online
 *         - inscription
 *         - initDate
 *         - endDate
 *         - creator
 *         - currentPhase
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the tournament
 *         name:
 *           type: string
 *           enum: [SINGLE, TEAM]
 *         mode:
 *           type: string
 *           description: The mode of the game that its set for this tournament
 *         game:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the game of the tournament
 *         size:
 *           type: integer
 *           description: The size of the tournament
 *         participants:
 *           type: array
 *           items:
 *             type: object
 *             description: Participant of the tournament
 *           description: List of participants of the tournament
 *         description:
 *           type: string
 *           description: Description of the tournament
 *         rules:
 *           type: string
 *           description: Rules of the tournament
 *         participantsType:
 *           type: string
 *           description: Type of the participants of the tournament
 *         phases:
 *           type: array
 *           items:
 *              type: object
 *              description: Phase of the tournament
 *           description: Phases of the tournament
 *         online:
 *           type: boolean
 *           description: Indicate if the tournament is online
 *         location:
 *           type: string
 *           description: Location of the tournament
 *         inscription:
 *           type: boolean
 *           description: Indicate if the tournament have inscription
 *         inscriptionInitData:
 *           type: date
 *           description: Init inscription date of the tournament
 *         inscriptionEndDate:
 *           type: date
 *           description: End inscription date of the tournament
 *         initDate:
 *           type: date
 *           description: Init date of the tournament
 *         endDate:
 *           type: date
 *           description: End date of the tournament
 *         sponsoredBy:
 *           type: array
 *           items:
 *             type: object
 *             description: Sponsor of the tournament
 *           description: Sponsors of the tournament
 *         prize:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the prize of the tournament
 *         creator:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the creator of the tournament
 *         currentPhase:
 *           type: integer
 *           description: The current phase of the tournament
 *         status:
 *           type: string
 *           enum: [CLOSED, INSCRIPTIONS_OPEN, INSCRIPTIONS_CLOSED, ON_COURSE, FINISHED]
 *           description: The status of the tournament
 */

/**
 * @swagger
 * tags:
 *   name: Tournaments
 *   description: The tournaments managing API
 */

/**
 * @swagger
 * /tournaments/{id}:
 *   get:
 *     summary: Find an existing tournament by id
 *     tags: [Tournaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The tournament id
 *     responses:
 *       200:
 *         description: Tournament found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the tournament
 *                 name:
 *                   type: string
 *                   enum: [SINGLE, TEAM]
 *                 mode:
 *                   type: string
 *                   description: The mode of the game that its set for this tournament
 *                 game:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the game of the tournament
 *                 size:
 *                   type: integer
 *                   description: The size of the tournament
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Participant of the tournament
 *                   description: List of participants of the tournament
 *                 description:
 *                   type: string
 *                   description: Description of the tournament
 *                 rules:
 *                   type: string
 *                   description: Rules of the tournament
 *                 participantsType:
 *                   type: string
 *                   description: Type of the participants of the tournament
 *                 phases:
 *                   type: array
 *                   items:
 *                      type: object
 *                      description: Phase of the tournament
 *                   description: Phases of the tournament
 *                 online:
 *                   type: boolean
 *                   description: Indicate if the tournament is online
 *                 location:
 *                   type: string
 *                   description: Location of the tournament
 *                 inscription:
 *                   type: boolean
 *                   description: Indicate if the tournament have inscription
 *                 inscriptionInitData:
 *                   type: date
 *                   description: Init inscription date of the tournament
 *                 inscriptionEndDate:
 *                   type: date
 *                   description: End inscription date of the tournament
 *                 initDate:
 *                   type: date
 *                   description: Init date of the tournament
 *                 endDate:
 *                   type: date
 *                   description: End date of the tournament
 *                 sponsoredBy:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Sponsor of the tournament
 *                   description: Sponsors of the tournament
 *                 prize:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the prize of the tournament
 *                 creator:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the creator of the tournament
 *                 currentPhase:
 *                   type: integer
 *                   description: The current phase of the tournament
 *                 status:
 *                   type: string
 *                   enum: [CLOSED, INSCRIPTIONS_OPEN, INSCRIPTIONS_CLOSED, ON_COURSE, FINISHED]
 *                   description: The status of the tournament
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
 * /tournaments:
 *   get:
 *     summary: Find all tournaments that match the query
 *     tags: [Tournaments]
 *     responses:
 *       200:
 *         description: Tournaments found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tournaments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uid:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id of the tournament
 *                       name:
 *                         type: string
 *                         enum: [SINGLE, TEAM]
 *                       mode:
 *                         type: string
 *                         description: The mode of the game that its set for this tournament
 *                       game:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the game of the tournament
 *                       size:
 *                         type: integer
 *                         description: The size of the tournament
 *                       participants:
 *                         type: array
 *                         items:
 *                           type: object
 *                           description: Participant of the tournament
 *                         description: List of participants of the tournament
 *                       description:
 *                         type: string
 *                         description: Description of the tournament
 *                       rules:
 *                         type: string
 *                         description: Rules of the tournament
 *                       participantsType:
 *                         type: string
 *                         description: Type of the participants of the tournament
 *                       phases:
 *                         type: array
 *                         items:
 *                            type: object
 *                            description: Phase of the tournament
 *                         description: Phases of the tournament
 *                       online:
 *                         type: boolean
 *                         description: Indicate if the tournament is online
 *                       location:
 *                         type: string
 *                         description: Location of the tournament
 *                       inscription:
 *                         type: boolean
 *                         description: Indicate if the tournament have inscription
 *                       inscriptionInitData:
 *                         type: date
 *                         description: Init inscription date of the tournament
 *                       inscriptionEndDate:
 *                         type: date
 *                         description: End inscription date of the tournament
 *                       initDate:
 *                         type: date
 *                         description: Init date of the tournament
 *                       endDate:
 *                         type: date
 *                         description: End date of the tournament
 *                       sponsoredBy:
 *                         type: array
 *                         items:
 *                           type: object
 *                           description: Sponsor of the tournament
 *                         description: Sponsors of the tournament
 *                       prize:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the prize of the tournament
 *                       creator:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the creator of the tournament
 *                       currentPhase:
 *                         type: integer
 *                         description: The current phase of the tournament
 *                       status:
 *                         type: string
 *                         enum: [CLOSED, INSCRIPTIONS_OPEN, INSCRIPTIONS_CLOSED, ON_COURSE, FINISHED]
 *                         description: The status of the tournament
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
router.get('/', findAll);

/**
 * @swagger
 * /tournaments:
 *   post:
 *     summary: Create a new tournament
 *     tags: [Tournaments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [SINGLE, TEAM]
 *               mode:
 *                 type: string
 *                 description: The mode of the game that its set for this tournament
 *               game:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the game of the tournament
 *               size:
 *                 type: integer
 *                 description: The size of the tournament
 *               participants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   description: Participant of the tournament
 *                 description: List of participants of the tournament
 *               description:
 *                 type: string
 *                 description: Description of the tournament
 *               rules:
 *                 type: string
 *                 description: Rules of the tournament
 *               participantsType:
 *                 type: string
 *                 description: Type of the participants of the tournament
 *               phases:
 *                 type: array
 *                 items:
 *                    type: object
 *                    description: Phase of the tournament
 *                 description: Phases of the tournament
 *               online:
 *                 type: boolean
 *                 description: Indicate if the tournament is online
 *               location:
 *                 type: string
 *                 description: Location of the tournament
 *               inscription:
 *                 type: boolean
 *                 description: Indicate if the tournament have inscription
 *               inscriptionInitData:
 *                 type: date
 *                 description: Init inscription date of the tournament
 *               inscriptionEndDate:
 *                 type: date
 *                 description: End inscription date of the tournament
 *               initDate:
 *                 type: date
 *                 description: Init date of the tournament
 *               endDate:
 *                 type: date
 *                 description: End date of the tournament
 *               sponsoredBy:
 *                 type: array
 *                 items:
 *                   type: object
 *                   description: Sponsor of the tournament
 *                 description: Sponsors of the tournament
 *               prize:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the prize of the tournament
 *               creator:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the creator of the tournament
 *               currentPhase:
 *                 type: integer
 *                 description: The current phase of the tournament
 *               status:
 *                 type: string
 *                 enum: [CLOSED, INSCRIPTIONS_OPEN, INSCRIPTIONS_CLOSED, ON_COURSE, FINISHED]
 *                 description: The status of the tournament
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the tournament
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
 * /tournaments/{id}:
 *   put:
 *     summary: Update an existing tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The tournament id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [SINGLE, TEAM]
 *               mode:
 *                 type: string
 *                 description: The mode of the game that its set for this tournament
 *               game:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the game of the tournament
 *               size:
 *                 type: integer
 *                 description: The size of the tournament
 *               participants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   description: Participant of the tournament
 *                 description: List of participants of the tournament
 *               description:
 *                 type: string
 *                 description: Description of the tournament
 *               rules:
 *                 type: string
 *                 description: Rules of the tournament
 *               participantsType:
 *                 type: string
 *                 description: Type of the participants of the tournament
 *               phases:
 *                 type: array
 *                 items:
 *                    type: object
 *                    description: Phase of the tournament
 *                 description: Phases of the tournament
 *               online:
 *                 type: boolean
 *                 description: Indicate if the tournament is online
 *               location:
 *                 type: string
 *                 description: Location of the tournament
 *               inscription:
 *                 type: boolean
 *                 description: Indicate if the tournament have inscription
 *               inscriptionInitData:
 *                 type: date
 *                 description: Init inscription date of the tournament
 *               inscriptionEndDate:
 *                 type: date
 *                 description: End inscription date of the tournament
 *               initDate:
 *                 type: date
 *                 description: Init date of the tournament
 *               endDate:
 *                 type: date
 *                 description: End date of the tournament
 *               sponsoredBy:
 *                 type: array
 *                 items:
 *                   type: object
 *                   description: Sponsor of the tournament
 *                 description: Sponsors of the tournament
 *               prize:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the prize of the tournament
 *               creator:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the creator of the tournament
 *               currentPhase:
 *                 type: integer
 *                 description: The current phase of the tournament
 *               status:
 *                 type: string
 *                 enum: [CLOSED, INSCRIPTIONS_OPEN, INSCRIPTIONS_CLOSED, ON_COURSE, FINISHED]
 *                 description: The status of the tournament
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Tournament updated successfully message
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
 * /tournaments/{id}:
 *   delete:
 *     summary: Delete a tournament by id
 *     tags: [Tournaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The tournament id
 *     responses:
 *       200:
 *         description: Tournament deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Tournament deleted successfully message
 *                 tournament:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id of the tournament
 *                     name:
 *                       type: string
 *                       enum: [SINGLE, TEAM]
 *                     mode:
 *                       type: string
 *                       description: The mode of the game that its set for this tournament
 *                     game:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the game of the tournament
 *                     size:
 *                       type: integer
 *                       description: The size of the tournament
 *                     participants:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Participant of the tournament
 *                       description: List of participants of the tournament
 *                     description:
 *                       type: string
 *                       description: Description of the tournament
 *                     rules:
 *                       type: string
 *                       description: Rules of the tournament
 *                     participantsType:
 *                       type: string
 *                       description: Type of the participants of the tournament
 *                     phases:
 *                       type: array
 *                       items:
 *                          type: object
 *                          description: Phase of the tournament
 *                       description: Phases of the tournament
 *                     online:
 *                       type: boolean
 *                       description: Indicate if the tournament is online
 *                     location:
 *                       type: string
 *                       description: Location of the tournament
 *                     inscription:
 *                       type: boolean
 *                       description: Indicate if the tournament have inscription
 *                     inscriptionInitData:
 *                       type: date
 *                       description: Init inscription date of the tournament
 *                     inscriptionEndDate:
 *                       type: date
 *                       description: End inscription date of the tournament
 *                     initDate:
 *                       type: date
 *                       description: Init date of the tournament
 *                     endDate:
 *                       type: date
 *                       description: End date of the tournament
 *                     sponsoredBy:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Sponsor of the tournament
 *                       description: Sponsors of the tournament
 *                     prize:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the prize of the tournament
 *                     creator:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the creator of the tournament
 *                     currentPhase:
 *                       type: integer
 *                       description: The current phase of the tournament
 *                     status:
 *                       type: string
 *                       enum: [CLOSED, INSCRIPTIONS_OPEN, INSCRIPTIONS_CLOSED, ON_COURSE, FINISHED]
 *                       description: The status of the tournament
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