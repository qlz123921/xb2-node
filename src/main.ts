import app from './app/index.js'
import { APP_PORT } from './app/app.config.js'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

const prisma = new PrismaClient()

app.listen(APP_PORT, async () => {
  await prisma.$connect()

  // const content = await prisma.content.create({
  //   data: {
  //     title: 'sdafs',
  //     content: 'fasdfasdfasdf',
  //     date_created: dayjs().format(),
  //   },
  // })

  // console.log(content)

  const contents = await prisma.content.findFirst({
    where: {
      id: 1,
    },
  })

  console.log(contents)

  console.log('🚀服务已启动!!')
})
