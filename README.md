# Vue Todo-App

使用 Vue 進行 Todo List 的練習，這個專案的主要實踐項目如下

- [x] 使用 Vue CLI 進行開發
- [x] 使用 Vue 進行生命週期管理、資料綁定、事件處理及條件渲染等基本操作
- [x] 使用 Vue Test Utils 進行單元測試
- [x] 使用 Bootstrap 進行 CSS 的開發
- [x] 使用 Pug 進行 HTML 的模板撰寫
- [x] 使用 ESLint 進行程式碼檢查
- [x] 使用 Prettier 進行程式碼自動格式化
- [x] 使用 PostCSS 進行 SASS 的編譯

使用 [My JSON Server](https://my-json-server.typicode.com/) 提供的假 API 進行資料庫模擬

https://my-json-server.typicode.com/siang-chang/json-server-demo/

## Development

對於開發環境，請參考下列說明來設定與啟動服務

### Install Dependencies

在本地端的 `node_modules` 資料夾裡面安裝相依套件

```sh
$ npm ci
```

### Development Server

啟動基於 [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) 的開發伺服器，並且支援 Hot-Module-Replacement (HMR)，所有對程式碼的更動都會即時反映在瀏覽器，使用瀏覽器開啟 http://localhost:8080 即可瀏覽頁面

```sh
$ npm run serve
```


### Build

對於生產環境，請參考下列說明來建構服務

編譯前端程式碼，並存放於 `dist` 資料夾，編譯後的檔案更小，並且不需要動態伺服器也可以運作

```sh
$ npm run build
```

您可以將 `dist` 資料夾裡面的檔案更新至 `docs` 資料夾，並且將 `docs` 資料夾設定為 GitHub Pages 的根目錄，這樣就可以透過 GitHub Pages 來提供服務

## Testing

我們使用 [Vue Test Utils](https://test-utils.vuejs.org/) 來撰寫測試，它是 Vue 官方提供的測試工具，語法與 [Jest](https://jestjs.io/) 類似，請參考下列說明來執行測試

### Unit Test

執行單元測試，預設會從 `src` 資料夾裡面搜尋以 `spec.js` 或 `test.js` 結尾的測試檔案

```sh
$ npm run test:unit
```

您也可以指定要執行的測試檔案名稱，測試程式會在前述資料夾裡面尋找符合的檔案

```sh
$ npm run test:unit file.test.js
```

### Coverage Report

您可以執行下列指令來產生測試覆蓋率報告，報告會存放於 `coverage` 資料夾

```sh
$ npm run test:coverage
```
