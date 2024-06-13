const { Router } = require('express');
const { getAccountData, getGamesData, getProfileData} = require('../controllers/leagueOfLegends');

const router = Router();

router.post('/info/account', getAccountData);
router.post('/info/games', getGamesData);
router.post('/info/profile', getProfileData);

module.exports = router;