# 腦軸探險地圖（腦軸大探險）

一個獨立單元，包含：

- `index.html`：**探險基地**（八條腦軸總覽地圖）。每條腦軸都有「深入探險」按鈕，另有一區八張「深入探險」卡片。
- 八個分頁，各自一個資料夾：

| 資料夾 | 單元 |
|---|---|
| `GUTBRAINMAP/` | 吃對食物，腸道也能顧大腦？（腸腦軸與飲食） |
| `HEARTMAP/` | 心肺顧得好，大腦更年輕？（心肺腦軸） |
| `MUSCLEMAP/` | 練肌肉，也在練大腦？（肌腦軸） |
| `KIDNEYMAP/` | 腎臟累了，大腦也會霧霧的？（腎腦軸） |
| `ORALMAP/` | 嚼一嚼，大腦也在動？（口腔腦軸） |
| `GUTEYEMAP/` | 腸道細菌，也會影響眼睛？（腸眼軸） |
| `FOOTMAP/` | 腳底，是大腦的觸控板？（足底腦軸） |
| `BONEMAP/` | 骨頭也會跟大腦說話？（骨腦軸） |

分頁頁首顯示「腦軸大探險」，「← 返回探險基地」連回 `../index.html`。所有連結都是相對路徑，放在任何資料夾都能用，本機雙擊 `index.html` 也能逐頁瀏覽。

## 放進小學堂網站（建議）

1. 把整個資料夾改名為 `BRAINAXIS`，複製到網站倉庫的 `KS/` 底下 → 網址 `https://www.gungho.idv.tw/KS/BRAINAXIS/`。
   - 想用別的名稱也可以；分頁裡的 canonical／og:url 寫的是 `/KS/BRAINAXIS/<分頁>/`，改名時用「全部取代」把 `KS/BRAINAXIS/` 換掉即可。
2. 小學堂首頁 `config.js` 只要加一張卡片（見下方），八個分頁不必各自上架。
3. `git add .`、`git commit -m "Add KS/BRAINAXIS"`、`git push`。

```js
,{ title: '腦軸探險地圖', description: '八條腦軸探險地圖：點人體圖認識腸、心肺、肌肉、腎、口腔、眼、足底、骨骼如何和大腦雙向溝通，再深入八個單元，附中醫經絡穴位、小測驗與動手做工具。', category: '大腦保健', url: '/KS/BRAINAXIS/', date: '2026-10-14' }
```

若先前已把八個分頁各自上架在 `/KS/ORALMAP/` 等位置，可以把那八張卡片從 `config.js` 移除，避免重複。

## 另開新倉庫

把資料夾內容上傳到新倉庫 `main` 分支 → Settings → Pages → Deploy from a branch → `main` / `(root)`。`選用_Actions/pages.yml` 若要使用，請自行移到 `.github/workflows/`。

## 聲明

本網站為一般健康教育用途，不能取代個人化醫療診斷與治療。插圖為原創 SVG。中醫經典引文出自《黃帝內經》《難經》（維基文庫），穴位定位依 WHO 西太平洋區標準。
