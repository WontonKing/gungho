'use strict';
const list = document.getElementById('lesson-list');

/* ===== 1. 建立課程卡片（與原本相同，只是先收集起來，不直接放進畫面） ===== */
const cards = [];
(window.SCHOOL_TOPICS || []).forEach((topic, index) => {
  const url = String(topic.url || '');
  if (!/^\/(?!\/)/.test(url) && !/^https:\/\//i.test(url)) return;
  const card = document.createElement('a'); card.className = 'lesson'; card.href = url;
  const top = document.createElement('div'); top.className = 'lesson-top';
  const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = topic.category || '小知識';
  const number = document.createElement('span'); number.className = 'lesson-number'; number.textContent = 'LESSON ' + String(index + 1).padStart(2, '0');
  top.append(tag, number);
  const title = document.createElement('h3'); title.textContent = topic.title;
  const description = document.createElement('p'); description.textContent = topic.description;
  const action = document.createElement('span'); action.className = 'lesson-cta'; action.textContent = '進入小學堂';
  card.append(top, title, description, action);

  // 【新增】記住原始順序與日期，供排序使用
  // 每堂課都有日期時，編號依日期決定（最早的是 LESSON 01）
if (cards.length && cards.every(c => !isNaN(c.date))) {
  cards.slice()
    .sort((a, b) => (a.date - b.date) || (a.index - b.index))
    .forEach((c, i) => { c.number.textContent = 'LESSON ' + String(i + 1).padStart(2, '0'); });
}
  cards.push({ card, index, number, date: Date.parse(topic.date || '') });
});

/* ===== 2. 【新增】排序功能 ===== */
const STORAGE_KEY = 'ks-lesson-sort';
const sortButtons = document.querySelectorAll('.sort-toggle button');
let sortMode = 'newest';
try { sortMode = localStorage.getItem(STORAGE_KEY) || 'newest'; } catch (e) {}

function renderLessons() {
  // 每堂課都有 date 就依日期排；否則依 config.js 順序（舊的在前、新的在後）
  const allDated = cards.length > 0 && cards.every(c => !isNaN(c.date));
  const dir = sortMode === 'newest' ? -1 : 1;
  const sorted = cards.slice().sort((a, b) => {
    const diff = allDated ? a.date - b.date : a.index - b.index;
    return (diff || a.index - b.index) * dir;
  });
  list.replaceChildren(...sorted.map(c => c.card));

  sortButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.sort === sortMode)));
}

sortButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sortMode = btn.dataset.sort;
    try { localStorage.setItem(STORAGE_KEY, sortMode); } catch (e) {}
    renderLessons();
  });
});

renderLessons();
