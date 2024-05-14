const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Configuração do banco de dados
const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  password: 'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port:3001
};

// Conexão com o banco de dados
const db = mysql.createPool(dbConfig);

// Rota de registro
app.post('/api/registro', async (req, res) => {
  const { email, senha } = req.body;
  const senhaHash = await bcrypt.hash(senha, 8);
  try {
    await db.execute('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senhaHash]);
    res.status(201).send('Usuário registrado com sucesso.');
  } catch (error) {
    res.status(500).send('Erro no registro do usuário.');
  }
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [usuarios] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarios.length > 0) {
      const usuario = usuarios[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (senhaValida) {
        const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: '1h' });
        res.json({ mensagem: 'Login bem-sucedido.', token });
      } else {
        res.status(401).send('Senha incorreta.');
      }
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    res.status(500).send('Erro no login.');
  }
});

// Middleware para verificar o token
function verificarToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('Token não fornecido.');
  }
  jwt.verify(token, 'chave_secreta', (err, decoded) => {
    if (err) {
      return res.status(401).send('Falha na autenticação do token.');
    }
    req.usuarioId = decoded.id;
    next();
  });
}

// Rota protegida que redireciona para a página de compras
app.get('/api/pagina-de-compras', verificarToken, (req, res) => {
  // Aqui você pode implementar a lógica para exibir a página de compras
  // Por exemplo, você pode retornar um link para a página de compras
  res.redirect('por a página aqui');
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(//localhost:8080/mydb ${});
  )})
