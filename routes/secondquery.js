const express = require('express');
const secondController = require('../controllers/secondquery');

const router = express.Router();

router.get('/', secondController.getSecQuery);
module.exports = router;