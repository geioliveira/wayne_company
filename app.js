const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const config = require('./config/config');

// Configuração do mecanismo de visualização (Handlebars ou outro)
app.set('view engine', 'ejs'); // Usando Handlebars como exemplo
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Rota principal (login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'auth', 'login.html'));
});

// Roteamento
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/resources', resourceRoutes);
app.use('/dashboard', dashboardRoutes);

// Iniciar o servidor
app.listen(config.PORT, () => {
  console.log(`Servidor rodando na porta ${config.PORT}`);
});
