# 腸腦聊天室｜共好小學堂 GitHub Pages 部署版

約 20 分鐘的單次課程，含角色對話、腸腦溝通路徑、飲食解說、餐盤練習、三餐範例、生活行動與五題測驗。
已刪除頁面的「插圖使用說明」。

## 檔案

- `index.html`：完整課程；樣式與 JavaScript 已內嵌，無須安裝套件或編譯。
- `assets/gut-friends.webp`：課程卡通插圖。
- `.nojekyll`：靜態網站設定。
- `.github/workflows/deploy.yml`：GitHub Pages 自動部署。
- `README.md`：本說明。

## 部署為獨立 GitHub Pages 網站

1. 解壓縮 ZIP。
2. 建立專門放這堂課的 GitHub repository，預設分支使用 `main`。
3. 將解壓縮後的全部內容放到 repository 根目錄。首頁必須是根目錄的 `index.html`；不要在外面多包一層資料夾。請確保 `.nojekyll` 與 `.github/workflows/deploy.yml` 也有上傳。
4. 在 repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
5. 開啟 **Actions → Deploy to GitHub Pages → Run workflow**，選 `main` 執行第一次部署。設定完成後，每次更新 `main` 都會自動部署。
6. 工作成功後，可從 **Settings → Pages** 或部署工作的 **github-pages** 連結開啟網站。

一般專案網站網址格式為 `https://你的帳號.github.io/儲存庫名稱/`。請使用 GitHub 顯示的實際網址。

若習慣網頁版上傳：用 Add file → Upload files 上傳 `index.html` 與 `assets`；用 Add file → Create new file 建立 `.nojekyll`（空白內容可留一個換行）及 `.github/workflows/deploy.yml`（複製本包同名檔內容）。

## 併入既有小學堂網站

若既有網站已有首頁，不要以本包的 `index.html` 覆蓋原首頁。

1. 在現有網站建立課程子資料夾，例如 `KS/gutbrain/`。
2. 只將本包 `index.html` 與 `assets/` 放入該課程子資料夾；沿用現有網站的部署設定，不需要加入本包 workflow。
3. 小學堂主頁的課程卡片，填入實際完整網址，例如 `https://www.gungho.idv.tw/KS/gutbrain/index.html`。
4. 本課程「回小學堂」連結已指向 `https://www.gungho.idv.tw/KS/index.html`。

圖片使用相對路徑 `assets/gut-friends.webp`，可在 GitHub Pages 專案路徑或既有網站子資料夾使用。

## 本機使用與更新

- 解壓縮後雙擊 `index.html` 即可閱讀與操作。保持 `assets` 與 `index.html` 的相對位置。
- 互動餐盤、生活勾選與測驗都在瀏覽器中操作；重新整理即重置，不傳送個人資料。
- 更新時修改 `index.html` 或替換 `assets`，再上傳至同一位置。
- 自動部署採用 `main` 分支；若實際使用其他分支，請同步修改 workflow 的 `branches`。

## 部署文件來源

[GitHub 官方：Deploying your website automatically](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically)

編製日期：2026-10-09。
