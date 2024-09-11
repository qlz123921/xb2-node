
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
