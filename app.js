'use strict';

const screen = document.querySelector('#screen');
const intro = screen.innerHTML;
const analysisSteps = [
  'Lendo suas respostas…',
  'Juntando as peças…',
  'Montando seu resultado…',
];
const steps = [...intake, ...questions.slice(0, 3), { key: 'phrase' }, ...questions.slice(3), { key: 'goal' }];
const totalQuestions = steps.length;
let position = -1;
let activeScreen = 'inicio';
let choices = [];
let responses = [];
let preferredPronouns = pronouns[2];
let duration;
let contact;
let phrase = '';
let showSupport = false;
let checkoutStarted = false;
let feedbackTimer;
let currentRitual;
let offerObserver;
const feedbackDuration = 2000;

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

function personalize(text) {
  return text.replace(/\{(ele|Ele|dele)\}/g, (_, key) => preferredPronouns[key]);
}

function renderQuestion() {
  position += 1;
  const progress = 15 + Math.round(85 * position / totalQuestions);
  const step = steps[position];
  const header = `
    <p class="step">Pergunta ${position + 1} de ${totalQuestions}</p>
    <progress aria-label="Progresso do quiz" value="${progress}" max="100"></progress>
  `;

  if (step.key === 'phrase') {
    show('frase_opcional', 'question', `
      ${header}
      <h1 id="title" tabindex="-1">${personalize('Se você resumisse em uma frase o que {ele} mais dizia depois das brigas, qual seria?')}</h1>
      <form id="phrase-form">
        <label class="step" for="phrase">Resposta opcional · Até 100 caracteres</label>
        <textarea id="phrase" maxlength="100" rows="3"></textarea>
        <button type="submit" class="primary">Continuar</button>
        <button type="button" class="back" data-skip-phrase>Pular</button>
      </form>
    `);
  } else {
    const title = step.title ?? 'O que você mais precisa entender agora?';
    if (step.options) {
      choices = step.options.map(label => ({ label }));
    } else if (step.answers) {
      choices = randomPair(Object.keys(step.answers)).map(profile => ({
        ...pick(step.answers[profile]), profile, art: profile,
      }));
    } else {
      choices = randomPair(goals);
    }

    show('pergunta_' + (position + 1), 'question', `
      ${header}
      <h1 id="title" tabindex="-1">${personalize(title)}</h1>
      <div class="options ${step.options ? 'intake' : 'cards'}">
        ${choices.map((choice, index) => `
          <button class="option ${choice.art ? 'art-' + choice.art : ''}" data-answer="${index}" type="button">
            ${choice.art ? '<span class="option-art" aria-hidden="true"></span>' : ''}
            <span>${personalize(choice.label)}</span>
          </button>
        `).join('')}
      </div>
    `);
  }
  track('visualizacao');
}

function finishFeedback() {
  window.clearTimeout(feedbackTimer);
  feedbackTimer = undefined;
  renderQuestion();
}

function renderFeedback(choice) {
  const index = responses.length - 1;
  const scene = feedbackSequence[index];
  show('feedback_' + (index + 1), 'feedback', `
    <svg class="feedback-art" viewBox="0 0 210 165" aria-hidden="true" focusable="false">
      ${feedbackScenes[scene]}
    </svg>
    <h1 id="title" tabindex="-1">${personalize(choice.reaction)}</h1>
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
    profile, responses.filter(response => response.profile === profile).length,
  ]));
  const answerOrder = new Set(responses.map(response => response.profile));
  // Para o segundo perfil sem votos, use a primeira alternativa exibida.
  responses.forEach(response => answerOrder.add(response.alternative));
  const [profile, secondary] = [...answerOrder].sort((a, b) => counts[b] - counts[a]);
  const result = profiles[profile];
  const showSafety = showSupport;
  showSupport = false;
  const [first, second, , , fifth] = responses;

  const details = resultDetails[profile];
  const card = ritualCards[profile];
  currentRitual = { card: { ...card, question: personalize(card.question) }, ...ritualCalendar(Date.now()) };
  const cta = `<button class="primary" data-offer type="button">Quero o guia completo — ${offer.price}</button>`;
  show('resultado', 'result', `
    <p class="step">Seu resultado</p>
    <h1 id="title" tabindex="-1">${result.title}</h1>
    <p>${result.summary}</p>
    <section class="result-card" aria-labelledby="reflection-title">
      <h2 id="reflection-title">O que você me contou</h2>
      <p>Você disse que volta quando “${personalize(first.label)}”. Que o que mais pesa é “${personalize(second.label)}”. E que o que mais te faz duvidar é “${personalize(fifth.label)}”.</p>
      <p>${durationCopy[duration]}</p>
      <p>${contactCopy[contact]}</p>
      <h3>Como seu perfil se mistura</h3>
      <p>${profileMix[profile + '+' + secondary]}</p>
    </section>
    ${phrase ? `
      <section class="result-card" aria-labelledby="phrase-title">
        <h2 id="phrase-title">Você escreveu</h2>
        <p>“<span id="phrase-result"></span>”. Guarde essa frase: no capítulo “${result.title}” você vai usá-la num exercício.</p>
      </section>
    ` : ''}
    <section class="result-card" aria-labelledby="goal-title">
      <h2 id="goal-title">Seu objetivo</h2>
      <p>Você quer entender: “${personalize(goal.label)}”. Seu guia começa por aí: capítulo “${goal.chapter}”.</p>
    </section>
    ${renderRitual(currentRitual)}

    <section class="cycle-map result-card" aria-labelledby="cycle-title">
      <h2 id="cycle-title">Seu mapa do ciclo</h2>
      <ol class="cycle-stages">
        ${cycleStages.map(stage => `<li${stage === details.stage ? ' class="cycle-current" aria-current="step"' : ''}>${stage}</li>`).join('')}
      </ol>
      <div class="cycle-return" aria-hidden="true"></div>
      <p>Você costuma voltar aqui. <strong>${details.stage}</strong></p>
    </section>

    <section class="result-card story" aria-labelledby="story-title">
      <p class="step">História inspirada em situações reais. Nome alterado.</p>
      <h2 id="story-title">A história de ${details.name}</h2>
      <p>${personalize(details.story).replace('{page}', details.page)}</p>
      <a href="#oferta">Ver como ela saiu →</a>
    </section>

    <section class="result-card preview" aria-labelledby="preview-title">
      <h2 id="preview-title">Por dentro do guia</h2>
      <div class="preview-layout">
        <div class="guide-cover">
          <span>amore.</span>
          <strong>Seu mapa para sair do ciclo</strong>
          <span>Um plano de 30 dias</span>
        </div>
        <div>
          <h3>Índice</h3>
          <ul class="guide-index">
            ${Object.entries(resultDetails).sort(([, first], [, second]) => first.page - second.page).map(([key, chapter]) => key === profile
              ? `<li class="chapter-current"><span aria-hidden="true">🔒</span> Seu capítulo: ${result.title} (pág. ${details.page})</li>`
              : `<li class="chapter-locked"><span aria-hidden="true">${profiles[key].title} · ${chapter.page}</span><span class="sr-only">Capítulo bloqueado</span></li>`
            ).join('')}
          </ul>
        </div>
      </div>
      <a href="checklist-sinais-de-alerta.pdf" download>Baixar a amostra grátis (PDF) ↓</a>
      <p class="step">Checklist de sinais de alerta · 1 página</p>
    </section>

    ${showSafety ? `
      <aside class="support" aria-labelledby="support-title">
        <h2 id="support-title">Sua segurança vem primeiro</h2>
        <p>Se você sentiu medo nessa relação e precisa de apoio, o <a href="tel:180">Ligue 180</a> oferece orientação gratuita no Brasil. Em caso de perigo imediato, ligue <a href="tel:190">190</a>.</p>
      </aside>
    ` : ''}

    <section id="oferta" class="offer result-card" aria-labelledby="offer-title" tabindex="-1">
      <h2 id="offer-title">O que vem no guia</h2>
      <ul class="guide-includes">
        <li>Guia digital com cerca de 28 páginas</li>
        <li>Plano de 30 dias para sair do ciclo</li>
        <li>Mensagens prontas para quando a pessoa te procura</li>
        <li>Modelos e exercícios para imprimir</li>
      </ul>
      ${ORDER_BUMP_ENABLED ? `
        <label class="order-bump"><input type="checkbox" id="lunar-order-bump"> Adicionar Calendário Lunar de 30 dias por WhatsApp — R$ 19</label>
      ` : ''}
      ${cta}
      <p class="note">${offer.guarantee}</p>
      <p class="note" id="offer-status" role="status"></p>
    </section>
    <button class="back" data-restart type="button">Refazer o quiz</button>
    <div class="sticky-offer">${cta}</div>
  `);
  if (phrase) document.querySelector('#phrase-result').textContent = phrase;
  phrase = '';
  responses = [];
  choices = [];
  preferredPronouns = pronouns[2];
  duration = undefined;
  contact = undefined;
  track('resultado', { perfil: profile, perfil_secundario: secondary, meta: goal.id });
  offerObserver?.disconnect();
  offerObserver = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    track('scroll_cta');
    observer.disconnect();
  }, { rootMargin: '0px 0px -86px 0px' });
  offerObserver.observe(document.querySelector('#oferta [data-offer]'));
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

  if (button.hasAttribute('data-skip-phrase')) {
    track('avanco');
    renderQuestion();
    return;
  }

  if (button.hasAttribute('data-answer')) {
    const index = Number(button.dataset.answer);
    const choice = choices[index];
    const step = steps[position];
    track('avanco');
    if (step.key === 'pronoun') preferredPronouns = pronouns[index];
    if (step.key === 'duration') duration = index;
    if (step.key === 'contact') contact = index;
    if (step.key === 'fear') showSupport = index === 0;
    if (step.answers) {
      responses.push({ ...choice, alternative: choices[1 - index].profile });
      renderFeedback(choice);
    } else if (step.key === 'goal') {
      renderAnalysis(choice);
    } else {
      renderQuestion();
    }
    return;
  }

  if (button.dataset.ritual) {
    const action = button.dataset.ritual;
    track(action);
    if (action === 'virar_carta') {
      document.querySelector('.ritual-card').classList.add('revealed');
      const copy = document.querySelector('#ritual-card-copy');
      copy.hidden = false;
      button.hidden = true;
      copy.querySelector('h3').focus({ preventScroll: true });
    } else {
      const status = document.querySelector('.ritual-status');
      saveRitualImage(currentRitual, action === 'salvar_carta').then(() => {
        status.textContent = 'Sua imagem está pronta para compartilhar.';
      }).catch(() => {
        status.textContent = 'Não foi possível salvar a imagem. Tente novamente.';
      });
    }
    return;
  }

  if (button.hasAttribute('data-offer')) {
    track('clique_cta');
    if (offer.checkoutUrl) {
      checkoutStarted = true;
      window.location.assign(offer.checkoutUrl);
    } else {
      const status = document.querySelector('#offer-status');
      status.textContent = 'O checkout estará disponível em breve.';
      if (button.closest('.sticky-offer')) document.querySelector('#oferta').focus();
    }
    return;
  }

  if (button.hasAttribute('data-restart')) {
    offerObserver?.disconnect();
    currentRitual = undefined;
    position = -1;
    choices = [];
    checkoutStarted = false;
    show('inicio', '', intro);
  }
});

screen.addEventListener('submit', event => {
  if (event.target.id !== 'phrase-form') return;
  event.preventDefault();
  phrase = document.querySelector('#phrase').value.slice(0, 100).trim();
  track('avanco');
  renderQuestion();
});

window.addEventListener('pagehide', () => {
  if (position >= 0 && !checkoutStarted) track('abandono');
});
