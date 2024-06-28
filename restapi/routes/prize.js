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
 *         - description
 *         - creator
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: The auto-generated id of the prize
 *         name:
 *           type: string
 *           description: The name of the prize
 *         description:
 *           type: string
 *           description: The description of the prize
 *         image:
 *           type: string
 *           description: The url of the image of the prize
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
 * /prizes/{id}:
 *   get:
 *     summary: Find an existing prize by id
 *     tags: [Prizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The prize id
 *     responses:
 *       200:
 *         description: Prize found correctly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the game
 *                 name:
 *                   type: string
 *                   description: The name of the prize
 *                 description:
 *                   type: string
 *                   description: The description of the prize
 *                 image:
 *                   type: string
 *                   description: The url of the image of the prize
 *                 creator:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id identifying the creator of the prize
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
 * /prizes:
 *   get:
 *     summary: Find all prizes that match the query
 *     tags: [Prizes]
 *     responses:
 *       200:
 *         description: Prizes found successfully
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
 *                         description: The id of the game
 *                       name:
 *                         type: string
 *                         description: The name of the prize
 *                       description:
 *                         type: string
 *                         description: The description of the prize
 *                       image:
 *                         type: string
 *                         description: The url of the image of the prize
 *                       creator:
 *                         type: string
 *                         format: ObjectId
 *                         description: The id identifying the creator of the prize
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
 * /prizes:
 *   post:
 *     summary: Create a new prize
 *     tags: [Prizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the prize
 *               description:
 *                 type: string
 *                 description: The description of the prize
 *               image:
 *                 type: string
 *                 description: The url of the image of the prize
 *               creator:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the creator of the prize
 *     responses:
 *       201:
 *         description: Prize created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: ObjectId
 *                   description: The id of the prize
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
 * /prizes/{id}:
 *   put:
 *     summary: Update an existing serie
 *     tags: [Prizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: The prize id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the prize
 *               description:
 *                 type: string
 *                 description: The description of the prize
 *               image:
 *                 type: string
 *                 description: The url of the image of the prize
 *               creator:
 *                 type: string
 *                 format: ObjectId
 *                 description: The id identifying the creator of the prize
 *     responses:
 *       200:
 *         description: Prize updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Prize updated successfully message
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
 * /prizes/{id}:
 *   delete:
 *     summary: Delete a prize by id
 *     tags: [Prizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The prize id
 *     responses:
 *       200:
 *         description: Prize deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Prize deleted successfully message
 *                 prize:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id of the game
 *                     name:
 *                       type: string
 *                       description: The name of the prize
 *                     description:
 *                       type: string
 *                       description: The description of the prize
 *                     image:
 *                       type: string
 *                       description: The url of the image of the prize
 *                     creator:
 *                       type: string
 *                       format: ObjectId
 *                       description: The id identifying the creator of the prize
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