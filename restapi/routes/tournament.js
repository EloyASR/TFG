const { Router } = require('express')
const { getTournament } = require('../controllers/tournament')

const router = Router()

router.get('/:tournamentId', getTournament);

module.exports = router