const express = require('express')
const app = express()
const port = 3003

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

  const posts = data.filter((item) => item.id == postId)

  response.send(posts[0])
})
