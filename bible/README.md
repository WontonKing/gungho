# 一年讀經（網頁版）

360 天讀完整本聖經：每天三段和合本經文（詩歌智慧書、舊約、新約）、讀經筆記、關鍵字查經。
手機、平板、電腦都能用，可以加到主畫面，沒有網路也能讀。筆記只存在使用者自己的裝置上。

## 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 repository（例如 `bible1y`），設為 **Public**。
2. 把這個資料夾裡的所有檔案（含 `.nojekyll` 和 `icons` 資料夾）上傳到 repository 的根目錄。
3. 到 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾 `/ (root)`，按 **Save**。
4. 一兩分鐘後，網址會是 `https://<你的帳號>.github.io/bible1y/`。

## 更新版本

改完 `index.html` 後，把 `sw.js` 第一行的 `VERSION` 加 1（例如 `bible1y-v2`）再上傳，
使用者下次開啟時就會換成新版。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 主程式（內含和合本經文與讀經計畫） |
| `guide.html` | 使用說明 |
| `manifest.webmanifest`、`icons/` | 加到主畫面用的名稱與圖示 |
| `sw.js` | 離線快取 |
| `.nojekyll` | 讓 GitHub Pages 直接提供檔案 |

經文：中文和合本（繁體），公有領域。
