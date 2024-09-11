import pool from '../database.js';

export const getAllPosts = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM content'); // Adjust schema and table name
    return res.rows;
  } finally {
    client.release();
  }
};

export const getPostById = async (id: number) => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM content WHERE id = $1', [id]);
    return res.rows[0];
  } finally {
    client.release();
  }
};

export const createPost = async (title: string, content: string) => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO content (title, content) VALUES ($1, $2) RETURNING *',
      [title, content],
    );
    return res.rows[0];
  } finally {
    client.release();
  }
};

export const updatePost = async (
  id: number,
  title: string,
  content: string,
) => {
const client = await pool.connect();
  try {
    const res = await client.query(
      'UPDATE content SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id],
    );
    return res.rows[0];
  } finally {
    client.release();
  }
};


export const deletePost = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM content WHERE id = $1', [id]);
  } finally {
    client.release();
  }
};