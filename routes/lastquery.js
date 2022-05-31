const express = require('express');
const app = require('../app');
const lastqueryController = require('../controllers/lastquery');

const router = express.Router();

router.get('/', lastqueryController.getLastQuery);
module.exports = router;