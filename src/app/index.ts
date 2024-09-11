import express, { Express, Request, Response, NextFunction } from 'express';
import postRouter from '../post/post.router.js';
import { defaultErrorHandler, requestUrl } from './app.middleware.js';

const app: Express = express();

app.use(express.json());
app.use(requestUrl); // 添加 URL 请求日志中间件
app.use(postRouter);
// 注册路由器
app.use('/api', postRouter); //这将在postRouter中的所有路由前添加/api

// 错误处理
app.use(defaultErrorHandler);
const PORT = process.env.PORT || 3004;


export default app;
