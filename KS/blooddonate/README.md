# 捐血小學堂：捐血者的健康假象

健康捐血者效應（Healthy Donor Effect, HDE）與北歐 SCANDAT 輸血流行病學研究大綱。網頁內每項論點都附文獻編號，15 篇參考文獻皆經 PubMed 核實，並附 DOI 連結。

## 檔案結構

```
.
├── index.html            主頁面
├── .nojekyll             讓 GitHub Pages 跳過 Jekyll 處理
├── README.md
└── assets/
    ├── css/style.css     樣式（固定亮色系）
    ├── js/forest.js      第三章森林圖（以 SVG 繪製）
    └── favicon.svg       分頁圖示
```

純靜態網站，不需要建置步驟。字型由 Google Fonts 載入，其他資源都在專案內。

## 部署到 GitHub Pages

1. 在 GitHub 建立新的 repository，例如 `blood-donor-hde`。
2. 解壓縮後，把資料夾內**所有檔案**（包含隱藏檔 `.nojekyll`）上傳到 repository 根目錄：
   - 網頁操作：repository 頁面 → **Add file** → **Upload files**，拖入檔案後 Commit。
   - 或用指令：
     ```bash
     cd hde-site
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<你的帳號>/blood-donor-hde.git
     git push -u origin main
     ```
3. 進入 repository → **Settings** → **Pages**。
4. **Source** 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 **Save**。
5. 約 1～2 分鐘後，網站會出現在 `https://<你的帳號>.github.io/blood-donor-hde/`。

## 本機預覽

直接雙擊 `index.html` 即可開啟。也可以在資料夾內執行：

```bash
python3 -m http.server 8000
```

再開啟 http://localhost:8000。

## 待補文獻

以下論點目前在網頁上以虛線標籤標示「待補」，補上出處後可直接修改 `index.html`：

- 散發型庫賈氏病（sCJD）不經輸血傳播
- 捐血者產次對受血者存活的影響
- 推翻心血管鐵假說的「後續系統性回顧」
- 陝西研究中女性 D50–D89 的 AIRR 4.294（需以全文核對）

## 資料來源

書目資料與摘要數值取自 PubMed（2026 年 10 月核實）。
