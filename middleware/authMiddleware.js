const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Pega o token do cookie
  const token = req.cookies.token;
  if (!token) {
    // Se não houver token, redireciona para a página de login
    return res.redirect('/');
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Se o token for inválido, redireciona para a página de login
      return res.redirect('/');
    }
    req.user = user; // Armazena os dados do usuário no objeto `req` para uso posterior
    next(); // Permite que a solicitação continue para a próxima função
  });
};
