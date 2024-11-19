const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota do dashboard protegida pelo middleware de autenticação
router.get('/', authMiddleware, dashboardController.getDashboardData);

module.exports = router;
