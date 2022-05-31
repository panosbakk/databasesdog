const express = require('express');
const projectsController = require('../controllers/projects');

const router = express.Router();

router.get('/', projectsController.getProjects);
//router.post('/delete/:id', projectsController.postDeleteProject);
router.get('/show-researchers/:id', projectsController.getSelectResearcherProject);
router.post('/by-category', projectsController.getSearchProject);
router.post('/create', projectsController.postProject);
router.get('/by-category/results', projectsController.getSearchProject);
module.exports = router;