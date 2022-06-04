const express = require('express');

const fourthqueryController = require('../controllers/fourthquery');

const router = express.Router();

router.get('/', fourthqueryController.getFourthQuery);
module.exports = router;