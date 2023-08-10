// 設定資料庫連線: 把 app.js 裡和「資料庫連線」有關的程式碼都複製過來一份，另外，也要一併載入 Todo model，因為這裡要操作的資料和 Todo 有關
const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  //新增 10 筆資料
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})