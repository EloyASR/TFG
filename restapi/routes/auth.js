const { Router } = require('express')
const {find, findAll, add, upd, del } = require('../controllers/serie');
const {login} = require("../controllers/auth");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate in the app and return a JWT token
 *     tags: [Auth]
 */
router.post('/', login);

module.exports = router;