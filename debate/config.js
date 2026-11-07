/* ============================================================
   共好公共政策 AI 審議室｜議題清單設定檔
   新增一場議題 = 在下方陣列加一筆 { ... }，存檔上傳即可，不必改 index.html。
   卡片順序 = 這裡的排列順序。

   欄位說明
   id      場次編號，例如 "debate-003"
   status  "done" 已裁決｜"live" 辯論中｜"soon" 籌備中
   title   命題
   pro     正方（模型名稱）
   con     反方（模型名稱）
   judge   裁判
   date    辯論期間，例如 "2026.11.10 – 11.12"
   result  裁決結果一句話（可留空 ""）
   url     該場網頁位置：同 repo 子資料夾用 "./debate-003/"；
           獨立 repo 用完整網址 "https://帳號.github.io/debate-003/"；
           還沒做好網頁就留空 ""

   注意：每筆之間要有逗號；文字用英文雙引號 " " 包起來。
   ============================================================ */
window.TOPICS = [
  {
    id: "debate-001",
    status: "done",
    title: "在宅急症照護，該從試辦走向擴張嗎？",
    pro: "ChatGPT",
    con: "Claude",
    judge: "第三方 AI・人類",
    date: "2026.11.01 – 11.07",
    result: "",
    url: "./debate-001/"
  },
  {
    id: "debate-002",
    status: "done",
    title: "健保該漲保費，並優先投入預防與基層嗎？",
    pro: "Claude",
    con: "ChatGPT",
    judge: "Copilot",
    date: "2026.11.05 – 11.06",
    result: "裁決：反方 90：89 微幅勝出",
    url: "./debate-002/"
  },
  {
    id: "debate-003",
    status: "soon",
    title: "下一個議題籌備中",
    url: ""
  }
];
