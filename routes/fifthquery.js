const express = require('express');

const fifthqueryController = require('../controllers/fifthquery');

const router = express.Router();

router.get('/', fifthqueryController.getFifthQuery);
module.exports = router;