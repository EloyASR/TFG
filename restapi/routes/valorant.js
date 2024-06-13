const { Router } = require('express');
const { findAccountData } = require('../controllers/valorant');

const router = Router();

router.post('/info/account', findAccountData);

module.exports = router;