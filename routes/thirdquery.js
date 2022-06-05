const express = require('express');
const thirdController = require('../controllers/thirdquery');

const router = express.Router();

router.get('/:id', thirdController.getProjectsScFi);
module.exports = router;