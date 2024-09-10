import express, { Router } from 'express';
import { Request, Response } from 'express';
import * as postController from './post.controller.js';
import pkg from 'pg';
const { Client } = pkg;
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} from '../app/app.config.js';
import { requestUrl } from '../app/app.middleware.js';

const router: Router = express.Router();
// 创建 PostgreSQL 客户端
const client = new Client({
  host: DB_HOST,
  port: Number(DB_PORT),

  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
client.connect();

// 获取所有帖子
router.get('/posts', async (req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: '获取帖子失败' });
  }
});
/**
 * 获取单个帖子
 */
router.get('/posts/:id', requestUrl, postController.getPost);

// 创建一个新帖子
router.post('/posts', async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    await client.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [
      title,
      content,
    ]);
    res.status(201).json({ message: 'Post created' });
  } catch (error) {
    res.status(500).json({ message: '创建帖子失败' });
  }
});

/**
 * 更新帖子
 */
router.put('/posts/:id', requestUrl, postController.updatePost);

/**
 * 删除帖子
 */
router.delete('/posts/:id', requestUrl, postController.deletePost);

export default router;
