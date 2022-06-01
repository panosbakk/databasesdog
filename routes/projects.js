const express = require('express');
const projectsController = require('../controllers/projects');

const router = express.Router();

router.get('/', projectsController.getProjects);
router.post('/create', projectsController.postProject);
//router.post('/delete/:id', projectsController.postDeleteProject);
router.get('/show-researchers/:id', projectsController.getSelectResearcherProject);



module.exports = router;