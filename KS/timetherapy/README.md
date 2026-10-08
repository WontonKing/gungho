# 逆時鐘的心念魔法｜共好小學堂

以哈佛大學艾倫．蘭格博士（Dr. Ellen Langer）的「逆時鐘研究」為主軸的樂齡身心健康課程網頁。

整個網站只有一個 `index.html`，插圖都是內嵌的原創 SVG，不需要任何建置工具。

## 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 repository，例如 `counterclockwise`，設為 Public。
2. 把這個資料夾裡的所有檔案上傳到 repository 根目錄：`index.html`、`.nojekyll`、`README.md`。
   - 網頁上傳：在 repository 頁面點「Add file」→「Upload files」，把檔案拖進去，再按「Commit changes」。
   - 指令上傳：
     ```bash
     git init
     git add .
     git commit -m "共好小學堂：逆時鐘的心念魔法"
     git branch -M main
     git remote add origin https://github.com/<你的帳號>/counterclockwise.git
     git push -u origin main
     ```
3. 到 repository 的「Settings」→「Pages」。
4. 在「Build and deployment」的 Source 選「Deploy from a branch」，Branch 選 `main`、資料夾選 `/ (root)`，按「Save」。
5. 等一到兩分鐘，網址會是：`https://<你的帳號>.github.io/counterclockwise/`

## 本機預覽

直接用瀏覽器打開 `index.html` 即可。

## 備註

- 字型從 Google Fonts 載入（Huninn、Noto Sans TC），離線時會自動改用系統中文字型。
- 想加入共好小學堂的其他課程，可以在同一個 repository 裡為每堂課建立資料夾，例如 `/lesson-02/index.html`。
