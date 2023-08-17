# ToDo List 1.0

此專案用Express打造出一個使用者可自行管理的To-do列表清單, 供使用者查詢、新增、修改、刪除

## 功能列表

- 首頁檢視所有todos
- 點擊Create link可新增一筆 todo
- 點擊Edit link可更新已存在的 todo
- 點擊Delete button可刪除 todo

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 建立MongoDB 資料庫並取得連結
3. 將專案 clone 到本地
4. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

5. 安裝完畢後，先至.env 修該資料庫連線url
6. 儲存後，繼續輸入，產生seed data：

   ```bash
   npm run seed
   ```
7. 至資料庫檢查是否有seed data. 若有, 繼續輸入：

   ```bash
   npm run dev
   ```

8. 若看見此行訊息則代表順利運行,並已連線至資料庫，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   mongodb connected!
   ```

9. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 開發工具

- Node.js 18.17.0 
- Express 4.17.1
- Express-Handlebars 4.0.0
- MongoDB Atlas
- Robo3T
- body-parser 1.20.2
- mongoose 5.9.7
- dotenv 16.3.1
- method-override 3.0.0


