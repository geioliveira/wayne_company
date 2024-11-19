const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Função de Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (user.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com a senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gerar token JWT com o ID e a função do usuário
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Armazenar o token em um cookie HTTP-only para segurança
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expira em 1 hora

    // Confirmação de login bem-sucedido e redirecionamento para o dashboard
    console.log('Login bem-sucedido para o usuário:', username);
    return res.redirect('/dashboard'); // Redireciona para o dashboard após o login
  } catch (error) {
    console.error('Erro no servidor durante o login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

// Função de Registro (opcional, dependendo da lógica do seu sistema)
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Verificar se o usuário já existe
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário no banco de dados
    await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      role,
    ]);

    console.log('Usuário registrado com sucesso:', username);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro no servidor durante o registro:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
