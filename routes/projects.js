const express = require('express');
const projectsController = require('../controllers/projects');

const router = express.Router();

router.get('/', projectsController.getProjects);
router.post('/create', projectsController.postProject);
router.post('/delete/:id', projectsController.postDeleteProject);
router.post('/update/:id', projectsController.postUpdateProject);
router.get('/show-researchers/:id', projectsController.getSelectResearcherProject);
router.post('/add-researcher', projectsController.postAddResearcher);
router.post('/delete-researcher', projectsController.postDeleteResearcher);
module.exports = router;