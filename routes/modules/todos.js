//設定 todos 路由模組
//直接在總路由器檢查網址前綴是否以 /todos 開頭，有的話才分流到 todos 模組裡，因此在設定 todos 模組時，裡面的路由清單不再需要處理前綴詞 /todos

// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')

/* 特別注意中間路由清單的處理：
- 將 app 改成 router
- 把路由的前綴詞 /todos 刪掉，這一段已經在總路由器檢查完畢
*/

// 設定首頁 - 點擊'Create' button - 路由: 至New頁面: 表單
router.get('/new', (req, res) => {
  return res.render('new')
})

//設定New頁面 - 點擊'Create' button -路由: 新增一筆To-do
router.post('/', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 存入資料庫 => Todo.create(): 資料庫新增資料
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//設定首頁 - 點擊'Detail' button -路由: 至Detail頁面 => 瀏覽特定 To-do 
router.get('/:id', (req, res) => {
  const id = req.params.id //從req.params取出動態路由裡的id => 每一筆 todo 的識別碼
  return Todo.findById(id) //至資料庫用id查詢特定一筆 todo 資料 => Todo.findById()
    .lean()               //轉換成乾淨的 JavaScript 資料物件
    .then((todo) => res.render('detail', { todo })) //資料會被存在 todo 變數裡，傳給樣板引擎，請 Handlebars 幫忙組裝 detail 頁面
    .catch(error => console.log(error))
})

//設定首頁, Detail頁面 - 點擊'Edit' button - 路由: 至Edit頁面: 表單with 預設資料 
router.get('/:id/edit', (req, res) => {
  const id = req.params.id //從req.params取出動態路由裡的id => 每一筆 todo 的識別碼
  return Todo.findById(id) //至資料庫用id查詢特定一筆 todo 資料 => Todo.findById()
    .lean()               //轉換成乾淨的 JavaScript 資料物件
    .then((todo) => res.render('edit', { todo })) //資料會被存在 todo 變數裡，傳給樣板引擎，請 Handlebars 幫忙組裝 edit 頁面
    .catch(error => console.log(error))
})

//設定Edit頁面 - 點擊'Edit' button - 路由: Update一筆To-do
router.put('/:id', (req, res) => {
  const id = req.params.id   //從req.params取出動態路由裡的id => 每一筆 todo 的識別碼
  //const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  console.log(req.body)
  const { name, isDone } = req.body //解構賦值: 把物件裡的屬性一項項拿出來存成變數時，可以使用的一種縮寫
  return Todo.findById(id)   //至資料庫用id查詢特定一筆 todo 資料 => Todo.findById()
    .then(todo => {          // 如果查詢成功, 修改後儲存資料
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`)) //如果儲存成功, 導回Detail頁面
    .catch(error => console.log(error))      //任一步驟出現失敗，都會跳進錯誤處理
})

//設定首頁, Detail頁面 - 點擊'Delete' button - 路由: 刪除該筆todo 
router.delete('/:id', (req, res) => {
  const id = req.params.id      //取得網址上的識別碼，用來查詢使用者想刪除的 To-do
  return Todo.findById(id)      //使用 Todo.findById() 查詢資料，資料庫查詢成功以後，會把資料放進 todo
    .then(todo => todo.remove()) //用 todo.remove() 刪除這筆資料
    .then(() => res.redirect('/')) //成功刪除以後，使用 redirect 重新呼叫首頁，此時會重新發送請求給 GET /，進入到另一條路由。
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router