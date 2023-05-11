const { Router } = require('express')
const { getTournament } = require('../controllers/tournament')

const router = Router()

router.get('/:tournamentId', getTournament);

router.get('/:tournamentId/info')

module.exports = router