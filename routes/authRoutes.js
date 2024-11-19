const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login
router.post('/login', authController.login);

// Rota de registro (opcional, dependendo do sistema)
router.post('/register', authController.register);

// Rota de logout
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Remove o cookie de autenticação
  res.redirect('/');        // Redireciona para a página de login
});

module.exports = router;
