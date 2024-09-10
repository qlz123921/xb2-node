import express, { Express } from 'express';
import postRouter from '../post/post.router.js';
import { defaultErrorHangler } from './app.middleware.js';
/**
 * 创建应用
 */
const app: Express = express();

/**
 * 处理 JSON
 */
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world! Welcome to the home page.');
});
/**
 * 路由
 */
app.use(postRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHangler);

/**
 * 导出应用
 */
export default app;
