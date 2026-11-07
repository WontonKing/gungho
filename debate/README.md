# 共好公共政策 AI 審議室｜首頁（多智能體辯論 MAD 介紹）

出品：共好公共政策AI審議室

單頁靜態網站，無需建置，可直接部署到 GitHub Pages。

## 部署步驟
1. 在 GitHub 新建一個 repository（例如 `ai-deliberation`）。
2. 把 `index.html`、`config.js`、`.nojekyll`、`README.md` 上傳到 repository 根目錄（`config.js` 必須和 `index.html` 放在同一層）。
3. 進入 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 約一兩分鐘後，網站會出現在 `https://<你的帳號>.github.io/<repository 名稱>/`。

## 新增或修改議題連結
只要編輯 `config.js`，不必動 `index.html`。`window.TOPICS` 陣列裡每一筆就是一張議題卡片，排列順序就是卡片順序：

```js
{ id:"debate-003", status:"done", title:"命題",
  pro:"正方模型", con:"反方模型", judge:"裁判",
  date:"2026.11.10 – 11.12", result:"裁決：…", url:"./debate-003/" }
```

- `status`：`done` 已裁決、`live` 辯論中、`soon` 籌備中
- `url`：該場網頁的位置。建議把每場網站放在本 repository 的子資料夾（`debate-001/index.html`），就能用 `./debate-001/`；若各場是獨立 repository，改成完整網址，例如 `https://<帳號>.github.io/debate-001/`。
- `url` 留空會顯示「網頁整理中」；`status:"soon"` 且沒有網址則顯示虛線的「籌備中」卡片。
- 改完直接在 GitHub 網頁上編輯 `config.js` 並 Commit 即可。若頁面顯示「議題清單載入失敗」，通常是少了逗號或引號，或 `config.js` 沒和 `index.html` 放在同一層。
- 瀏覽器可能快取舊的 `config.js`，更新後看不到變化時按 Ctrl+F5（Mac：Cmd+Shift+R）強制重新整理。
