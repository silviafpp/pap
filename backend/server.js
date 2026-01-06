const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passwordUtils = require('./security');

const app = express();
app.use(cors());
app.use(express.json());

// 1. CHAVE SECRETA (Puxa das variáveis de ambiente do Railway)
const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_super_segura_123';

// 2. CONFIGURAÇÃO DA BASE DE DADOS (Ajustada para Railway)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para ligar a bases de dados na nuvem
  }
});

// Teste de conexão
pool.connect((err) => {
  if (err) console.error('ERRO DE CONEXÃO À BD NO RAILWAY:', err.stack);
  else console.log('Conectado à base de dados do Railway com sucesso!');
});

// --- ROTA DE REGISTO ---
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hash = await passwordUtils.hashPassword(password); 
        const query = 'INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, email';
        const result = await pool.query(query, [firstName, lastName, email, hash]); 
        
        res.status(201).json({ message: 'Registo efetuado!', user: result.rows[0] });
    } catch (err) {
        console.error("Erro no Registo:", err.message);
        res.status(500).json({ error: 'Erro ao registar utilizador' });
    }
});

// --- ROTA DE LOGIN ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (user && await passwordUtils.verifyPassword(user.password_hash, password)) {
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                SECRET_KEY,
                { expiresIn: '24h' }
            );

            return res.status(200).json({ 
                message: 'Login OK', 
                token: token, 
                user: { 
                    id: user.id, 
                    firstName: user.first_name,
                    email: user.email 
                } 
            });
        }
        res.status(401).json({ error: 'Credenciais inválidas' });
    } catch (err) {
        console.error("Erro no Login:", err.message);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// 3. PORTA DINÂMICA (O Railway atribui a porta automaticamente)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ativo em: http://0.0.0.0:${PORT}`);
});