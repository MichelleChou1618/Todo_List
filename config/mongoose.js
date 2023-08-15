//抽取 app.js 連線設定

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