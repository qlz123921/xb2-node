import { Request, Response, NextFunction } from 'express';
import * as postService from './post.server.js';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
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
