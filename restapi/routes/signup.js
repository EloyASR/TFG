const { Router } = require('express')
const { signup } = require('../controllers/signup')

const router = Router()

router.post('/', signup)

module.exports = router