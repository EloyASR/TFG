const { Router } = require('express')
const { lolinfo } = require('../controllers/info')

const router = Router()

router.post('/lol', lolinfo)

module.exports = router