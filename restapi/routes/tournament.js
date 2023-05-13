const { Router } = require('express')
const { getTournament, createTournament } = require('../controllers/tournament')

const router = Router()

router.post('/create', createTournament);

router.get('/:tournamentId', getTournament);

router.get('/:tournamentId/info')



module.exports = router