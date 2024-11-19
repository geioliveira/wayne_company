const db = require('../config/db');

exports.createResource = async (data) => {
  const { name, type, status, description } = data;
  await db.query('INSERT INTO resources (name, type, status, description) VALUES (?, ?, ?, ?)', [name, type, status, description]);
};

exports.getAllResources = async () => {
    try {
      const [resources] = await db.query('SELECT * FROM resources');
      return resources;
    } catch (error) {
      console.error("Erro ao buscar recursos:", error);
      throw error; // Repassa o erro para que ele seja capturado no controlador
    }
  };

exports.updateResource = async (id, data) => {
  const { name, type, status, description } = data;
  await db.query('UPDATE resources SET name = ?, type = ?, status = ?, description = ? WHERE id = ?', [name, type, status, description, id]);
};

exports.deleteResource = async (id) => {
  await db.query('DELETE FROM resources WHERE id = ?', [id]);
};

exports.getResourceById = async (id) => {
  const [resource] = await db.query('SELECT * FROM resources WHERE id = ?', [id]);
  return resource[0];
};

exports.updateResource = async (id, data) => {
  const { name, type, status, description } = data;
  await db.query('UPDATE resources SET name = ?, type = ?, status = ?, description = ? WHERE id = ?', [name, type, status, description, id]);
};