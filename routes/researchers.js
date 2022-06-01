const express = require('express');
const researcherscontroller = require('../controllers/researchers');

const router = express.Router();

router.get('/', researcherscontroller.getyoungResearchers);
router.post('/create', researcherscontroller.createResearcher);
//router.get('/', youngResearchersController.getLastQuery);
module.exports = router;