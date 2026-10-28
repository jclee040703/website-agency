const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); } });
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { navigation.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id)); } }); }, { rootMargin:'-18% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));
const comparison = document.querySelector('#comparison');
const range = document.querySelector('#comparison-range');
function setSplit(value) { range.value = value; comparison.style.setProperty('--split', value + '%'); range.setAttribute('aria-valuetext', '시공 전 ' + value + '%, 시공 후 ' + (100 - value) + '%'); }
range.addEventListener('input', () => setSplit(Number(range.value)));
document.querySelectorAll('[data-split]').forEach(button => button.addEventListener('click', () => setSplit(Number(button.dataset.split))));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('input[name=service]').forEach(input => { input.checked = input.value === button.dataset.service; }); document.querySelector('#form-error').hidden = true; document.querySelector('#quote').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); }));
const quoteDialog = document.querySelector('#quote-dialog');
document.querySelector('#quote-form').addEventListener('submit', event => { event.preventDefault(); const selected = Array.from(document.querySelectorAll('input[name=service]:checked')).map(input => input.value); const error = document.querySelector('#form-error'); if (!selected.length) { error.hidden = false; document.querySelector('input[name=service]').focus(); return; } error.hidden = true; document.querySelector('#summary-car').textContent = document.querySelector('#car').value.trim(); document.querySelector('#summary-services').textContent = selected.join(' · '); document.querySelector('#summary-message').textContent = document.querySelector('#message').value.trim() || '상담하면서 함께 정하고 싶어요.'; quoteDialog.showModal(); });
document.querySelectorAll('input[name=service]').forEach(input => input.addEventListener('change', () => { if (document.querySelector('input[name=service]:checked')) document.querySelector('#form-error').hidden = true; }));
document.querySelector('#credits-open').addEventListener('click', () => document.querySelector('#credits-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close())); dialog.addEventListener('click', event => { const box = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close(); }); });
