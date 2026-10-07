'use strict';
const list = document.getElementById('lesson-list');
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
  card.append(top, title, description, action); list.append(card);
});
