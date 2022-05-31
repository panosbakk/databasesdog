const express = require('express');
const youngresearcherscontroller = require('../controllers/researchers');

const router = express.Router();

router.get('/', youngresearcherscontroller.getyoungResearchers);
//router.get('/', youngResearchersController.getLastQuery);
module.exports = router;