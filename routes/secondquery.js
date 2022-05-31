const express = require('express');
const secondController = require('../controllers/secondquery');

const router = express.Router();

router.get('/', secondController.getSecQuery);
//router.get('/', youngResearchersController.getLastQuery);
module.exports = router;