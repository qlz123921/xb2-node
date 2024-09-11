import { Request, Response, NextFunction } from 'express';
import * as postService from './post.server.js';
import pool from '../database.js';
export const getAllPosts = async () => {
  const client = await pool.connect();
  try {
    console.log('Fetching all posts from the database'); // Debugging line
    const res = await client.query('SELECT * FROM posts');
    console.log('Posts fetched successfully'); // Debugging line
    return res.rows;
  } catch (error) {
    console.error('Error fetching posts from the database:', error); // Debugging line
    throw error; // Rethrow the error to be caught by the route handler
  } finally {
    client.release();
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await postService.getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send({ message: 'Post not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content } = req.body;
    const newPost = await postService.createPost(title, content);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const updatedPost = await postService.updatePost(id, title, content);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).send({ message: 'Post not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    await postService.deletePost(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
