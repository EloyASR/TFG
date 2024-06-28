const {Router} = require("express");
const {isUp} = require("../controllers/app");
const router = Router();

router.get("/",isUp);

module.exports = router;