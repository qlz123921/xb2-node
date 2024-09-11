import express, { Router,Request, Response,NextFunction } from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './post.server.js';
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
    // 这里的content 就是xb2-node服务器里面创建的 content 
    const result = await client.query('SELECT * FROM content');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: '获取帖子失败' });
  }
});
// 获取单个帖子
router.get('/posts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const post = await getPostById(Number(id));
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: '获取帖子失败' });
  }
});

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
    console.error('Error creating post:', error);
    res.status(500).json({ message: '创建帖子失败' });
  }
});

/**
 * 更新帖子
 */
router.put('/posts/:id', requestUrl, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    // 更新 content 表中的数据
    await client.query(
      'UPDATE content SET title = $1, content = $2 WHERE id = $3',
      [title, content, id]
    );
    res.status(200).json({ message: 'Post updated' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: '更新帖子失败' });
  }
});


/**
 * 删除帖子
 */
router.delete('/posts/:id', requestUrl, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // 从 content 表中删除数据
    await client.query('DELETE FROM content WHERE id = $1', [id]);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: '删除帖子失败' });
  }
});

export default router;
