document.fonts.load('600 16px Pretendard', '당신의 차에 맞춘 변화').then(faces => {
  document.body.dataset.fontLoaded = String(faces.length > 0 && faces.every(face => face.status === 'loaded'));
}).catch(() => { document.body.dataset.fontLoaded = 'false'; });
const concepts = {
  studio: {name:'A · 스튜디오', color:'#f3f4f4', description:'A · 회백색과 버건디 / 선명한 고딕 / 넓은 사진과 균형 잡힌 3열'},
  atelier: {name:'B · 아틀리에', color:'#f1eee8', description:'B · 아이보리와 브론즈 / 가는 제목과 세리프 로고 / 좌우 편집형 배치'},
  precision: {name:'C · 프리시전', color:'#edf1f3', description:'C · 쿨그레이와 블루 / 단정한 고딕 / 정렬선이 분명한 분할 구성'},
  gallery: {name:'D · 갤러리', color:'#f7f7f5', description:'D · 화이트와 딥그린 / 가벼운 글자 / 중앙 정렬과 여백이 있는 사진 구성'}
};
function setConcept(key, updateUrl = false) {
  if (!Object.hasOwn(concepts, key)) key = 'studio';
  document.body.dataset.concept = key;
  document.title = 'NEO TUNING — ' + concepts[key].name;
  document.querySelector('meta[name=theme-color]').content = concepts[key].color;
  document.querySelector('#concept-description').textContent = concepts[key].description;
  document.querySelectorAll('[data-concept-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.conceptChoice === key)));
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('concept', key);
    url.hash = '';
    history.replaceState(null, '', url);
    window.scrollTo({top:0, behavior:'instant'});
    closeMenu();
  }
}
setConcept(new URLSearchParams(location.search).get('concept') || document.body.dataset.concept);
document.querySelectorAll('[data-concept-choice]').forEach(button => button.addEventListener('click', () => setConcept(button.dataset.conceptChoice, true)));
const reviewBar = document.querySelector('.review-bar');
const reviewShow = document.querySelector('#review-show');
document.querySelector('#review-hide').addEventListener('click', () => { reviewBar.hidden = true; reviewShow.hidden = false; reviewShow.focus({preventScroll:true}); });
reviewShow.addEventListener('click', () => { reviewBar.hidden = false; reviewShow.hidden = true; document.querySelector('[data-concept-choice][aria-pressed=true]').focus({preventScroll:true}); });
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
