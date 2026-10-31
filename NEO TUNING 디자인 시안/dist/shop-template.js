// 설정값은 HTML로 해석하지 않습니다.
(() => {
  const config = window.SHOP_CONFIG || {};
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const node = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  const webUrl = value => {
    try { const url = new URL(clean(value)); return url.protocol === 'https:' ? url.href : ''; }
    catch { return ''; }
  };
  const link = (label, href) => {
    const a = node('a', label + ' ↗', 'inline-link'); a.href = href;
    if (href.startsWith('https:')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  };
  const name = clean(config.name);
  document.querySelectorAll('.logo').forEach(el => {
    el.hidden = !name; el.textContent = name; el.setAttribute('aria-label', name + ' 홈');
  });
  document.title = name || '자동차 랩핑·튜닝';
  document.querySelector('meta[name="description"]').content = clean(config.introduction) || name;
  document.querySelector('.footer-meta > span').textContent = [new Date().getFullYear(), name].filter(Boolean).join(' ');
  const intro = document.querySelector('#shop-description');
  intro.textContent = clean(config.introduction); intro.hidden = !intro.textContent;
  const facts = document.querySelector('#shop-facts');
  const phone = clean(config.phone);
  const phoneDigits = phone.replace(/[^+0-9]/g, '');
  for (const [label, value] of [['전화', phone], ['주소', config.address], ['영업시간', config.hours], ['방문 안내', config.visitNote]]) {
    if (!clean(value)) continue;
    const row = node('div'); row.append(node('dt', label));
    const dd = node('dd');
    if (label === '전화' && /^\+?\d{7,15}$/.test(phoneDigits)) dd.append(link(phone, 'tel:' + phoneDigits));
    else dd.textContent = clean(value);
    row.append(dd); facts.append(row);
  }
  const channels = document.querySelector('#shop-channels');
  const map = webUrl(config.mapUrl);
  if (map) channels.append(link('지도에서 보기', map));
  for (const channel of Array.isArray(config.channels) ? config.channels : []) {
    if (!channel || !clean(channel.label) || !webUrl(channel.url)) continue;
    channels.append(link(clean(channel.label), webUrl(channel.url)));
  }
  const visible = !intro.hidden || facts.children.length > 0 || channels.children.length > 0;
  document.querySelector('#shop').hidden = !visible;
  document.querySelectorAll('[data-shop-nav]').forEach(el => { el.hidden = !visible; });
  const services = (Array.isArray(config.services) ? config.services : []).filter(s => s && clean(s.title));
  const grid = document.querySelector('.service-grid'); grid.replaceChildren();
  const options = document.querySelector('.service-options'); options.replaceChildren();
  for (const [i, service] of services.entries()) {
    const article = node('article', '', 'service-story');
    const heading = node('div', '', 'service-heading'); heading.append(node('h3', clean(service.title)));
    if (clean(service.caption)) heading.append(node('span', clean(service.caption)));
    article.append(heading);
    const src = clean(service.image);
    if (/^assets\/[^?#]+$/.test(src) || webUrl(src)) {
      const figure = node('figure'); const frame = node('div', '', 'service-image');
      const img = node('img'); img.src = src; img.alt = clean(service.alt) || service.title; img.loading = 'lazy';
      frame.append(img); figure.append(frame); article.append(figure);
    }
    const copy = node('div', '', 'service-copy');
    if (clean(service.description)) copy.append(node('p', clean(service.description)));
    const button = node('button', service.title + ' 상담 ↗', 'inline-link'); button.type = 'button'; button.dataset.service = service.title;
    copy.append(button); article.append(copy); grid.append(article);
    const label = node('label'); const input = node('input'); input.type = 'checkbox'; input.name = 'service'; input.value = service.title;
    label.append(input, node('span', service.title)); options.append(label);
  }
  const label = node('label'); const undecided = node('input'); undecided.type = 'checkbox'; undecided.name = 'service'; undecided.value = '상담 후 결정';
  label.append(undecided, node('span', '상담 후 결정')); options.append(label);
  document.querySelector('#services').hidden = services.length === 0;
  document.querySelectorAll('a[href="#services"]').forEach(el => { el.hidden = services.length === 0; });
  const galleryButton = document.querySelector('.work-intro [data-service]');
  galleryButton.dataset.service = services.find(s => /랩핑/.test(s.title))?.title || '상담 후 결정';
  galleryButton.textContent = '작업 상담하기 ↗';
})();
