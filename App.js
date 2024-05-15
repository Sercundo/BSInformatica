const express = require('express');
const mysql = require('mysql2/promise');

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
  port:3306
};

// Função para conectar ao banco de dados
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

// Conectar ao banco de dados
const db = connectToDatabase();

// Rota para obter todos os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const [rows] = await (await db).execute('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar produtos.' });
  }
});

// Rota para adicionar um novo produto
app.post('/api/produtos', async (req, res) => {
  const { nome, Descricao, codigo, cor } = req.body;
  try {
    const [result] = await (await db).execute(
      'INSERT INTO produtos (nome, descricao, codigo, cor) VALUES (?, ?, ?, ?)',
      [nome, descricao, codigo, cor]
    );
    res.status(201).json({ mensagem: 'Produto adicionado com sucesso.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao adicionar o produto.' });
  }
});

// Rota para atualizar um produto existente
app.put('/api/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, Descricao, codigo, cor } = req.body;
  try {
    const [result] = await (await db).execute(
      'UPDATE produtos SET nome = ?, Descricao = ?, codigo = ?, cor = ? WHERE id = ?',
      [nome, Descricao, codigo, cor, id]
    );
    if (result.affectedRows > 0) {
      res.send('Produto atualizado com sucesso.');
    } else {
      res.status(404).send('Produto não encontrado.');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar o produto.');
  }
});

app.listen(3001,() =>console.log(`API rodando na porta 3001`))