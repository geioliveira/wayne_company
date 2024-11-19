const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, resourceController.getAllResources);
router.post('/add', authMiddleware, resourceController.createResource);
router.post('/update/:id', authMiddleware, resourceController.updateResource);
router.get('/delete/:id', authMiddleware, resourceController.deleteResource);

router.get('/add', authMiddleware, resourceController.showAddForm);
router.post('/add', authMiddleware, resourceController.createResource);

router.get('/edit/:id', authMiddleware, resourceController.showEditForm);
router.post('/update/:id', authMiddleware, resourceController.updateResource);

module.exports = router;
