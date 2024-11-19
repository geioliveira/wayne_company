const bcrypt = require('bcryptjs');

// Substitua 'suaSenha' pela senha desejada
const hashedPassword = bcrypt.hashSync('789', 10);
console.log(hashedPassword);
