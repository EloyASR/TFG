const { Router } = require('express');
const { find, findAll, add, upd, del } = require('../controllers/team');

const router = Router();

router.get('/:id', find);
router.get('/', findAll);
router.post('/', add);
router.put('/:id', upd);
router.delete('/:id', del);

module.exports = router;