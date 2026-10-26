# 共好小團契

共好小團契讀經筆記的首頁。`index.html` 加上 `config.js`，無需建置，可直接部署到 GitHub Pages。

## 部署步驟

1. 在 GitHub 建立 repository（或使用現有的 fellowship 站台 repo）。
2. 上傳 `index.html`、`config.js`（及本 README）到首頁所在的資料夾（例如 repository 根目錄，或 `fellowship/`）。
3. 進入 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾 `/ (root)`，按 Save。
4. 若使用自訂網域（如 `www.gungho.idv.tw`），在 Pages 設定填入 Custom domain。

## 新增一篇讀經筆記

打開 `config.js`，在 `notes` 陣列最後加一筆：

```js
{
  title: "新文章標題",
  subtitle: "經卷章節或副標",
  url: "https://www.gungho.idv.tw/fellowship/新資料夾/",
  date: ""          // 可填 "2026.12.01"，也可留空
}
```

清單依陣列順序顯示；要把新文章放最上面，就加在陣列最前面。若希望連結另開分頁，可加上 `newTab: true`。

## 其他可在 config.js 修改的項目

- `siteTitle`：網站名稱（頂欄、主標題、頁尾）
- `tabTitle`、`description`：瀏覽器分頁標題與網頁描述
- `verse`：主標題下的經文、出處與連結
- `podcast`：右上角 Podcast 圖示的名稱與連結
- `notesHeading`：清單標題

社群平台分享預覽讀的是 `index.html` 裡 `<head>` 的 og 標籤，修改網站名稱或描述時兩處一併更新。

`config.js` 不存在時，頁面會顯示 `index.html` 內寫好的預設內容。
