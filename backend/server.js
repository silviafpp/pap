const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passwordUtils = require('./security');

const app = express();
app.use(cors());
app.use(express.json());

// Chave secreta para assinar os tokens (Muda isto para algo complexo na PAP)
const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_super_segura_123';

const pool = new Pool({
  user: 'admin',
  host: 'db', // 'db' para Docker, 'localhost' para correr node localmente
  database: 'bus_app',
  password: 'admin123',
  port: 5432,
});

// Teste de conexão
pool.connect((err) => {
  if (err) console.error('ERRO DE CONEXÃO À BD:', err.stack);
  else console.log('Conectado à base de dados com sucesso!');
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
        // 1. Procurar user
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        // 2. Verificar password e gerar Token
        if (user && await passwordUtils.verifyPassword(user.password_hash, password)) {
            
            // Gerar o JWT (Expira em 24h)
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

        // Se falhar user ou password
        res.status(401).json({ error: 'Credenciais inválidas' });

    } catch (err) {
        console.error("Erro no Login:", err.message);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.listen(3000, () => console.log("Servidor ligado na porta 3000"));