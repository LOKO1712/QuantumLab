// ══ NAV.JS ══
const PAGE_TITLES = {
  calc: 'Calculadora',
  quantum: 'Núm. Cuánticos',
  learn: 'Aprendizaje',
  quiz: 'Evaluación',
};

function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`.nav-btn[data-page="${page}"]`).classList.add('active');
  document.getElementById('page-title').textContent = PAGE_TITLES[page];
}
