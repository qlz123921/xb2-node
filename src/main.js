const http = require('http')
const fs = require('fs')
const path = require('path')

// 定义数据文件路径
const dataFilePath = path.join(__dirname, 'data.json')

// 读取文件中的数据，如果文件不存在则使用默认数据
let data = [
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
    content: '江南好，风景曾旧忆。日出江花红胜火，春来江水绿如蓝。能不忆江南?',
  },
]

// 尝试从文件中读取数据
try {
  const fileData = fs.readFileSync(dataFilePath, 'utf-8')
  data = JSON.parse(fileData) // 解析为JSON对象数组
} catch (error) {
  console.log('未找到数据文件，使用默认数据。')
}

// 生成新 ID（基于当前最大 ID）
function generateNewId() {
  const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0)
  return maxId + 1
}

// 保存数据到文件
function saveDataToFile() {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const id = parseInt(url.pathname.split('/')[1])

  // 处理POST请求（增加数据）
  if (request.method === 'POST') {
    let body = ''

    // 接收数据
    request.on('data', (chunk) => {
      body += chunk
    })

    // 数据接收完毕
    request.on('end', () => {
      try {
        const parsedData = JSON.parse(body)

        // 如果新数据没有 id，生成一个新 ID
        if (!parsedData.id) {
          parsedData.id = generateNewId()
        }

        // 查找是否已有该ID的项
        const existingDataIndex = data.findIndex((item) => item.id === parsedData.id)

        if (existingDataIndex > -1) {
          // 如果存在该ID，则更新
          if (parsedData.title) data[existingDataIndex].title = parsedData.title
          if (parsedData.content) data[existingDataIndex].content = parsedData.content
        } else {
          // 如果不存在该ID，则添加新的数据项
          data.push(parsedData)
        }

        // 保存数据
        saveDataToFile()

        const jsonData = JSON.stringify(data)

        response.writeHead(200, {
          'Content-type': 'application/json;charset=utf-8',
        })

        response.write(jsonData)
        response.end()
      } catch (error) {
        response.writeHead(400, { 'Content-Type': 'application/json;charset=utf-8' })
        response.write(JSON.stringify({ error: 'Invalid JSON' }))
        response.end()
      }
    })
  }

  // 处理GET请求（查询所有或单个数据）
  else if (request.method === 'GET') {
    if (!isNaN(id)) {
      // 查找指定ID的数据
      const item = data.find((item) => item.id === id)

      if (item) {
        response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
        response.write(JSON.stringify(item))
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' })
        response.write(JSON.stringify({ error: 'Item not found' }))
      }
    } else {
      // 返回所有数据
      response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
      response.write(JSON.stringify(data))
    }
    response.end()
  }

  // 处理PUT请求（修改数据）
  else if (request.method === 'PUT' && !isNaN(id)) {
    let body = ''

    // 接收数据
    request.on('data', (chunk) => {
      body += chunk
    })

    // 数据接收完毕
    request.on('end', () => {
      try {
        const parsedData = JSON.parse(body)

        // 查找并更新数据
        const existingDataIndex = data.findIndex((item) => item.id === id)

        if (existingDataIndex > -1) {
          // 更新对应ID的数据
          if (parsedData.title) data[existingDataIndex].title = parsedData.title
          if (parsedData.content) data[existingDataIndex].content = parsedData.content

          // 保存数据
          saveDataToFile()

          response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
          response.write(JSON.stringify(data[existingDataIndex]))
        } else {
          response.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' })
          response.write(JSON.stringify({ error: 'Item not found' }))
        }
        response.end()
      } catch (error) {
        response.writeHead(400, { 'Content-Type': 'application/json;charset=utf-8' })
        response.write(JSON.stringify({ error: 'Invalid JSON' }))
        response.end()
      }
    })
  }

  // 处理DELETE请求（删除数据）
  else if (request.method === 'DELETE' && !isNaN(id)) {
    const index = data.findIndex((item) => item.id === id)

    if (index > -1) {
      // 删除对应ID的数据
      data.splice(index, 1)

      // 保存数据
      saveDataToFile()

      response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
      response.write(JSON.stringify({ message: 'Item deleted successfully' }))
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' })
      response.write(JSON.stringify({ error: 'Item not found' }))
    }
    response.end()
  }

  // 请求方法不支持
  else {
    response.writeHead(405, { 'Content-Type': 'application/json;charset=utf-8' })
    response.write(JSON.stringify({ error: 'Method not allowed' }))
    response.end()
  }
})

server.listen(3002, () => {
  console.log('🚀服务已启动!')
})
