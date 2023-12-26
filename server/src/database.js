const pkg = require('pg');
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'senha',
  port: 5432,
  database: 'todolist'
});

module.exports = pool;