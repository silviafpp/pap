const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'db', // 'db' é o nome do serviço no docker-compose
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'bus_app',
  port: 5432,
});

module.exports = pool;