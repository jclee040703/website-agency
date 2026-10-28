const fontSamples = [
 ['body', '400 16px Pretendard', '상담 내용 미리보기'],
 ['display', '400 80px "Cormorant Garamond"', 'Made to be'],
 ['italic', 'italic 400 80px "Cormorant Garamond"', 'yours.'],
 ['korean', '500 32px "Noto Serif KR"', '컬러 랩핑 외장 튜닝 맞춤 커스텀']
];
Promise.all(fontSamples.map(async ([name, font, text]) => {
  try {
    const faces = await document.fonts.load(font, text);
    return [name, faces.length > 0 && faces.every(face => face.status === 'loaded')];
  } catch { return [name, false]; }
})).then(results => {
  document.body.dataset.fontsLoaded = JSON.stringify(Object.fromEntries(results));
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('.header-quote').addEventListener('click', closeMenu);
matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('input[name=service]').forEach(input => { input.checked = input.value === button.dataset.service; });
  document.querySelector('#form-error').hidden = true;
  document.querySelector('#quote').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}));
const photoDialog = document.querySelector('#photo-dialog');
function showPhoto(side) {
  document.querySelectorAll('[data-large-photo]').forEach(photo => { photo.hidden = photo.dataset.largePhoto !== side; });
  document.querySelectorAll('[data-photo-view]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.photoView === side)); });
}
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  showPhoto(button.dataset.photo);
  photoDialog.showModal();
}));
document.querySelectorAll('[data-photo-view]').forEach(button => button.addEventListener('click', () => showPhoto(button.dataset.photoView)));
const quoteDialog = document.querySelector('#quote-dialog');
const carInput = document.querySelector('#car');
carInput.addEventListener('input', () => carInput.setCustomValidity(''));
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const selected = Array.from(document.querySelectorAll('input[name=service]:checked')).map(input => input.value);
  const error = document.querySelector('#form-error');
  if (!selected.length) { error.hidden = false; document.querySelector('input[name=service]').focus(); return; }
  error.hidden = true;
  const car = carInput.value.trim();
  if (!car) { carInput.setCustomValidity('차량 모델을 입력해주세요.'); carInput.reportValidity(); return; }
  document.querySelector('#summary-car').textContent = car;
  document.querySelector('#summary-services').textContent = selected.join(' · ');
  document.querySelector('#summary-message').textContent = document.querySelector('#message').value.trim() || '상담하면서 함께 정하고 싶어요.';
  quoteDialog.showModal();
});
document.querySelectorAll('input[name=service]').forEach(input => input.addEventListener('change', () => {
  if (document.querySelector('input[name=service]:checked')) document.querySelector('#form-error').hidden = true;
}));
document.querySelector('#credits-open').addEventListener('click', () => document.querySelector('#credits-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
});
