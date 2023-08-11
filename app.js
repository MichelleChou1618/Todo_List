// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const port = 3000
// 載入express-handlebars
const exphbs = require('express-handlebars');

// 載入 Todo model
const Todo = require('./models/todo')

// 引用 body-parser
const bodyParser = require('body-parser')

// 載入 mongoose
const mongoose = require('mongoose')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv: dotenv 是一個方便我們管理環境變數的工具，他可以讓我們把環境變數直接寫在專案裡，以專案為單位去管理。引入 dotenv，讓 Node.js 能抓到寫在 .env 上的環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 設定連線到 mongoDB: mongoose.connect(連線字串) => 連線字串用"環境變數"取代
//環境變數: 當我們想要隱藏一些敏感資訊時，我們會藉由設定環境變數的方式，來將指定資訊傳入程式碼，同時又可以避免敏感資訊直接暴露在程式碼中. 「環境變數」可以理解成宣告在 Node.js 外部的變數，然後在 Node.js 中去取用他.
//環境變數定義在".env"
//第二個參數: 處理 terminal上的 DeprecationWarning 警告
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


//建立樣板引擎hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//啟用 樣板引擎hbs
app.set('view engine', 'hbs')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  //res.send('hello world')
  //res.render('index')

  //把 Todo model 的資料傳到樣板裡
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 設定New頁面路由
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

//Create 功能：資料庫新增資料
app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})