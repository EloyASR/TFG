const { Router } = require('express')

const {findAll, find, add, upd, del} = require('../controllers/prize')

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Prize:
 *       type: object
 *       required:
 *         - name
 *         - creator
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the Prize
 *         name:
 *           type: string
 *           description: The name of the prize
 *         description:
 *           type: string
 *           description: The description of the prize
 *         image:
 *           type: string
 *           description: The name of the image of the prize
 *         creator:
 *           type: string
 *           format: ObjectId
 *           description: The id identifying the creator of the prize
 */

/**
 * @swagger
 * tags:
 *   name: Prizes
 *   description: The series managing API
 */

/**
 * @swagger
 * /prizes:
 *   get:
 *     summary: Find all series that match the query
 *     tags: [Prizes]
 */
router.get('/', findAll);

/**
 * @swagger
 * /prizes/{id}:
 *   get:
 *     summary: Find an existing serie by id
 *     tags: [Prizes]
 */
router.get('/:id', find);

/**
 * @swagger
 * /prizes:
 *   post:
 *     summary: Create a new serie
 *     tags: [Prizes]
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
 * /prizes:
 *   put:
 *     summary: Update an existing serie
 *     tags: [Prizes]
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
 * /prizes/{id}:
 *   delete:
 *     summary: Remove the serie by id
 *     tags: [Prizes]
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