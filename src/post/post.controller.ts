import { Request, Response, NextFunction, request } from 'express';
import { getPosts } from './post.server.js';
/**
 * 内容列表
 */
export const index = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 请求头里面的authorization 为SECRET 时才能输出数据 请求数据时要加上请求头数据authorization为SECRET
  if (request.headers.authorization !== 'SECRET') {
    return next(new Error());
  }
  const posts = getPosts();
  response.send(posts);
};
