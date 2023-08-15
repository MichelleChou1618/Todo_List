//設定 home 路由模組: 專門管理首頁

// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')
// 定義首頁路由: 直接把首頁的路由 GET / 搬進來即可，注意需要依前後文修改變數名稱，把 app.get 改成 router.get
// 設定首頁路由: 瀏覽所有To-do
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router