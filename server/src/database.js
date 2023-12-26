import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'senha',
  port: 5432,
  database: 'todolist'
});

export default pool;