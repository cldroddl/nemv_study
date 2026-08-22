// 테스트 전용 헬퍼: in-memory MongoDB를 띄우고, 그 URL을 MONGO_URL 로 주입한 뒤
// app.js(및 config/config.js)를 그 시점에 require 해서 실제 로컬/운영 DB(mongodb://localhost:27017/nemv)에는
// 절대 연결하지 않도록 한다.
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod

async function startTestApp() {
  mongod = await MongoMemoryServer.create()
  process.env.MONGO_URL = mongod.getUri()

  // app.js 는 require 시점에 mongoose.connect() 를 호출하므로, MONGO_URL 을 설정한 "이후"에 require 해야 한다.
  const app = require('../../app')

  await new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) return resolve()
    mongoose.connection.once('open', resolve)
    mongoose.connection.once('error', reject)
  })

  return app
}

async function stopTestApp() {
  await mongoose.disconnect()
  if (mongod) await mongod.stop()
}

async function clearCollections() {
  const collections = mongoose.connection.collections
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({})
  }
}

module.exports = { startTestApp, stopTestApp, clearCollections }
