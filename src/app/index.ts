import express, { Express, Request, Response, NextFunction } from 'express'
import postRouter from '../post/post.router.js'
import { defaultErrorHandler, requestUrl } from './app.middleware.js'
import cors from 'cors'
const app: Express = express()

// 使用 CORS 中间件
app.use(cors())

app.use(requestUrl) // 添加 URL 请求日志中间件

// 解析 JSON 请求体
app.use(express.json())

// 注册路由器
app.use('/api', postRouter) //这将在postRouter中的所有路由前添加/api

// 错误处理
app.use(defaultErrorHandler)

const PORT = process.env.PORT || 3004

export default app
