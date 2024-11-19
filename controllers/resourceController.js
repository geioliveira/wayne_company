const Resource = require('../models/Resource');
const path = require('path');

// Função para exibir o formulário de adição de recurso
exports.showAddForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/resources/addResource.html'));
};

// Função para criar um novo recurso
exports.createResource = async (req, res) => {
  try {
    await Resource.createResource(req.body); // Salva o recurso no banco de dados
    res.redirect('/dashboard'); // Redireciona para o dashboard após a adição
  } catch (error) {
    console.error("Erro ao criar recurso:", error);
    res.status(500).send('Erro ao criar recurso.');
  }
};

// Função para exibir todos os recursos (exibido no dashboard)
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.getAllResources();
    res.render('dashboard', { resources }); // Renderiza o dashboard com os recursos
  } catch (error) {
    console.error("Erro ao buscar recursos:", error);
    res.status(500).send('Erro ao buscar recursos.');
  }
};

// Função para exibir o formulário de edição de recurso
exports.showEditForm = async (req, res) => {
  try {
    const resource = await Resource.getResourceById(req.params.id); // Busca o recurso pelo ID
    res.render('resources/editResource', { resource }); // Renderiza a página de edição com os dados
  } catch (error) {
    console.error("Erro ao carregar o recurso para edição:", error);
    res.status(500).send("Erro ao carregar o recurso.");
  }
};

// Função para atualizar um recurso existente
exports.updateResource = async (req, res) => {
  try {
    await Resource.updateResource(req.params.id, req.body); // Atualiza o recurso com os dados do formulário
    res.redirect('/dashboard'); // Redireciona para o dashboard após a atualização
  } catch (error) {
    console.error("Erro ao atualizar recurso:", error);
    res.status(500).send("Erro ao atualizar recurso.");
  }
};

// Função para deletar um recurso
exports.deleteResource = async (req, res) => {
  try {
    await Resource.deleteResource(req.params.id); // Exclui o recurso com o ID fornecido
    res.redirect('/dashboard'); // Redireciona de volta para o dashboard
  } catch (error) {
    console.error("Erro ao deletar recurso:", error);
    res.status(500).send("Erro ao deletar recurso.");
  }
};
