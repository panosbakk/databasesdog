const express = require('express');
const projectsController = require('../controllers/projects');

const router = express.Router();

router.get('/', projectsController.getProjects);
router.get('/show-researchers/:id', projectsController.getSelectResearcherProject);
router.post('/create', projectsController.postProject);
router.post('/delete/:id', projectsController.postDeleteProject);
router.post('/update/:id', projectsController.postUpdateProject);
router.post('/show-researchers/add', projectsController.postAddResearcher);



module.exports = router;