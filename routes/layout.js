const express = require('express');
const layoutController = require('../controllers/layout');

const router = express.Router();

router.get('/', layoutController.getLanding);

router.get('/program-creation-page', layoutController.getCreateProgram);
router.get('/researcher-creation-page', layoutController.getCreateResearcher);

router.get('/project-creation-page', layoutController.getCreateProject)
module.exports = router;