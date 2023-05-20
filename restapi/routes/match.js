const { Router } = require('express')
const { getMatch, getMatchs } = require('../controllers/match');

const router = Router()

router.get('/:matchId', getMatch);

router.post('/find', getMatchs)



module.exports = router