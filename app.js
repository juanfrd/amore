'use strict';

const screen = document.querySelector('#screen');
const intro = screen.innerHTML;
const analysisSteps = [
  'Analisando suas respostas…',
  'Identificando seu padrão…',
  'Montando seu plano personalizado…',
];
const totalQuestions = intake.length + questions.length + 1;
const goalIndex = totalQuestions - 1;
let position = -1;
let activeScreen = 'inicio';
let choices = [];
let votes = [];
let showSupport = false;
let checkoutStarted = false;
let feedbackTimer;
const feedbackDuration = 7000;

// Eventos anônimos disponíveis para uma integração de analytics.
// Nenhuma resposta individual, identificador ou dado de contato é incluído.
const analytics = window.dataLayer ??= [];
function track(event, detail = {}) {
  analytics.push({ event: 'amore_' + event, tela: activeScreen, ...detail });
}

function show(id, className, markup) {
  activeScreen = id;
  screen.className = className;
  screen.innerHTML = markup;
  document.querySelector('#title').focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomPair(items) {
  const first = pick(items);
  return [first, pick(items.filter(item => item !== first))];
}

function renderQuestion() {
  position += 1;
  const progress = 15 + Math.round(85 * position / totalQuestions);
  const initial = intake[position];
  const question = questions[position - intake.length];
  let title;

  if (initial) {
    title = initial.title;
    choices = initial.options.map(label => ({ label }));
  } else if (question) {
    title = question.title;
    choices = randomPair(Object.keys(question.answers)).map(profile => ({
      label: pick(question.answers[profile]), profile, art: profile,
    }));
  } else {
    title = 'O que você mais quer entender agora?';
    choices = randomPair(goals);
  }

  show('pergunta_' + (position + 1), 'question', `
    <p class="step">Pergunta ${position + 1} de ${totalQuestions}</p>
    <progress aria-label="Progresso do quiz" value="${progress}" max="100"></progress>
    <h1 id="title" tabindex="-1">${title}</h1>
    <div class="options ${initial ? 'intake' : 'cards'}">
      ${choices.map((choice, index) => `
        <button class="option ${choice.art ? 'art-' + choice.art : ''}" data-answer="${index}" type="button">
          ${choice.art ? '<span class="option-art" aria-hidden="true"></span>' : ''}
          <span>${choice.label}</span>
        </button>
      `).join('')}
    </div>
  `);
  track('visualizacao');
}

function finishFeedback() {
  window.clearTimeout(feedbackTimer);
  feedbackTimer = undefined;
  renderQuestion();
}

function renderFeedback(question) {
  const index = position - intake.length;
  const scene = feedbackSequence[index];
  show('feedback_' + (index + 1), 'feedback', `
    <svg class="feedback-art" viewBox="0 0 210 165" aria-hidden="true" focusable="false">
      ${feedbackScenes[scene]}
    </svg>
    <h1 id="title" tabindex="-1">${question.feedback}</h1>
    <button class="primary" data-continue type="button">Continuar <span aria-hidden="true">→</span></button>
  `);
  track('visualizacao');
  feedbackTimer = window.setTimeout(finishFeedback, feedbackDuration);
}

function renderAnalysis(goal) {
  show('analise', 'analysis', `
    <h1 id="title" tabindex="-1">Seu resultado está a caminho</h1>
    <progress aria-label="Progresso da análise" value="1" max="3"></progress>
    <ol class="analysis-list" aria-live="polite">
      ${analysisSteps.map((step, index) => `<li ${index ? 'hidden' : ''}>${step}</li>`).join('')}
    </ol>
  `);
  track('visualizacao');
  const progress = screen.querySelector('progress');
  const steps = screen.querySelectorAll('li');
  [1, 2].forEach(index => {
    window.setTimeout(() => {
      steps[index].hidden = false;
      progress.value = index + 1;
    }, index * 1400);
  });
  window.setTimeout(() => renderResult(goal), 4500);
}

function renderResult(goal) {
  const counts = Object.fromEntries(Object.keys(profiles).map(profile => [
    profile, votes.filter(vote => vote === profile).length,
  ]));
  const highest = Math.max(...Object.values(counts));
  const profile = votes.find(vote => counts[vote] === highest);
  const result = profiles[profile];
  const showSafety = showSupport;
  showSupport = false;
  votes = [];

  const cta = `<button class="primary" data-offer type="button">Quero meu plano de 30 dias <span aria-hidden="true">↗</span></button>`;
  const offerDetails = [offer.price, offer.guarantee].filter(Boolean).join(' · ');
  show('resultado', 'result', `
    <p class="step">Seu resultado</p>
    <h1 id="title" tabindex="-1">${result.title}</h1>
    <p>${result.summary}</p>
    ${showSafety ? `
      <aside class="support" aria-labelledby="support-title">
        <h2 id="support-title">Sua segurança vem primeiro</h2>
        <p>Se você sentiu medo nessa relação e precisa de apoio, o <a href="tel:180">Ligue 180</a> oferece orientação gratuita no Brasil. Em caso de perigo imediato, ligue <a href="tel:190">190</a>.</p>
      </aside>
    ` : ''}
    <section class="offer" aria-labelledby="offer-title">
      <h2 id="offer-title">Seu plano para sair do ciclo</h2>
      <p>${result.hook}</p>
      ${cta}
      ${offerDetails ? `<p class="note">${offerDetails}</p>` : ''}
      <div class="chapter">
        <p class="step">Capítulo recomendado para sua meta</p>
        <h3>${goal.chapter}</h3>
        <p>Para ajudar você a explorar: ${goal.label.toLowerCase()}.</p>
      </div>
      ${cta}
      <p class="note" id="offer-status" role="status"></p>
    </section>
    <button class="back" data-restart type="button">Refazer o quiz</button>
  `);
  track('resultado', { perfil: profile, meta: goal.id });
}

screen.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.id === 'start') {
    track('inicio');
    renderQuestion();
    return;
  }

  if (button.hasAttribute('data-continue')) {
    finishFeedback();
    return;
  }

  if (button.hasAttribute('data-answer')) {
    const choice = choices[Number(button.dataset.answer)];
    const question = questions[position - intake.length];
    track('avanco');
    if (position === intake.length - 1) showSupport = choice.label === 'Sim';
    if (question) {
      votes.push(choice.profile);
      renderFeedback(question);
    } else if (position === goalIndex) {
      renderAnalysis(choice);
    } else {
      renderQuestion();
    }
    return;
  }

  if (button.hasAttribute('data-offer')) {
    track('clique_cta');
    if (offer.checkoutUrl) {
      checkoutStarted = true;
      window.location.assign(offer.checkoutUrl);
    } else {
      document.querySelector('#offer-status').textContent = 'O checkout estará disponível em breve.';
    }
    return;
  }

  if (button.hasAttribute('data-restart')) {
    position = -1;
    choices = [];
    checkoutStarted = false;
    show('inicio', '', intro);
  }
});

window.addEventListener('pagehide', () => {
  if (position >= 0 && !checkoutStarted) track('abandono');
});
