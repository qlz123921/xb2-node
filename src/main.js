const express = require('express')
const app = express()
const port = 3003

/**
 * 使用 JSON 中间件
 */
app.use(express.json())

app.listen(port, () => {
  console.log('🚀服务已启动!')
})

app.get('/', (request, response) => {
  response.send('你好')
})

const data = [
  {
    id: 1,
    title: '关山月',
    content: '明月出天山,苍茫云海间。长风几万里,吹度玉门关。',
  },
  {
    id: 2,
    title: '望岳',
    content: '岱宗夫如何，齐鲁青未了。造化钟神秀，阴阳割昏晓。荡胸生层云，决眦入归鸟。会当凌绝顶，一览众山小。',
  },
  {
    id: 3,
    title: '忆江南',
    content: '江南好,风景旧曾谙,日出江花红胜火,春来江水绿如蓝。能不忆江南?',
  },
]

app.get('/posts/:postId', (request, response) => {
  // 获取id
  const { postId } = request.params
  // 查找具体内容
  const posts = data.filter((item) => item.id == postId)
  // 做出响应
  response.send(posts[0])
})

/**
 * 创建内容
 */
app.post('/posts', (request, response) => {
  // 获取请求里的数据
  const { content } = request.body
  // 设置响应状态码
  response.status(201)
  // 输出请求头部数据
  console.log(request.headers['sing-along'])

  // 创建响应头部数据
  response.set('Sing-Along', 'How I wonder what you are!')
  // 做出响应
  response.send({
    message: `成功创建了内容:${content}`,
  })
})

// app.put('/posts/:postId', (request, response) => {})
// app.patch('/posts/:postId', (request, response) => {})
// app.delete('/posts/:postId', (request, response) => {
//   const { postId } = request.params
//   const index = data.findIndex((item) => item.id === postId)

//   if (index > -1) {
//     data.splice(index, 1)
//   }
//   response.send(data)
// })
// 创建内容
// app.post('/posts', handler)
// // 更新内容
// app.patch('/posts/:postId', handler)
// // 删除内容
// app.delete('/posts/:postId', handler)
// // 内容列表
// app.get('/posts', handler)
// // 单个内容
// app.get('/posts/:postId', handler)
