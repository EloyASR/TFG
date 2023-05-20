const { Router } = require('express')
const { getSerie, createSerie } = require('../controllers/serie')

const router = Router()

router.post('/create', createSerie);

router.get('/:serieId', getSerie);

module.exports = router