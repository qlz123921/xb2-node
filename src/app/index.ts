import express, { Express, Request, Response, NextFunction } from 'express';
import postRouter from '../post/post.router.js';
import { defaultErrorHandler, requestUrl } from './app.middleware.js';

const app: Express = express();

app.use(express.json());
app.use(requestUrl); // 添加 URL 请求日志中间件
app.use(postRouter);

// 测试用的错误路由
app.get('/test-error', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('This is a test error');
  next(error);
});

app.use(defaultErrorHandler);

export default app;
