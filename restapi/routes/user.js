const { Router } = require('express')
const { getUser } = require('../controllers/user')

const router = Router()

router.get('/:userId', getUser);

module.exports = router