const Resource = require('../models/Resource');

const path = require('path');

exports.getDashboardData = async (req, res) => {
    try {
      console.log("Iniciando a consulta dos recursos para o dashboard...");
      const resources = await Resource.getAllResources();
      console.log("Recursos obtidos:", resources);
  
      res.render('dashboard/dashboard', { resources });
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
      res.status(500).send("Erro ao carregar o dashboard.");
    }
  };
  