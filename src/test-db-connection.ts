// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// export default pool;

// const testConnection = async () => {
//   try {
//     const client = await pool.connect();

//     console.log('Database connected successfully!');
//     client.release();
//   } catch (error) {
//     console.error('Database connection failed:', error);
//   }
// };

// testConnection();

// src/test-db-connection.ts
import pool from './database.js';

const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()'); // Simple query to test connection

    console.log('Database connection test successful:', result.rows);
    client.release();
  } catch (error) {
    console.error('Database connection test failed:', error);
  }
};

testConnection();
