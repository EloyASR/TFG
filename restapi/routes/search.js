const { Router } = require('express')
const { getTournaments } = require('../controllers/search')

const router = Router()

router.get('/tournaments', getTournaments);

module.exports = router