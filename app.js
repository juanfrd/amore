// Preencha com o link público do checkout quando o PDF estiver à venda.
const checkoutUrl = '';

const questions = [
  {
    title: 'Depois de uma briga, o que mais faz você querer voltar?',
    options: [
      { pattern: 'hope', label: 'A promessa de mudança' },
      { pattern: 'connection', label: 'A saudade da companhia' },
    ],
  },
  {
    title: 'O que mais pesa quando você pensa em se afastar?',
    options: [
      { pattern: 'connection', label: 'Ficar sem aquela companhia' },
      { pattern: 'guilt', label: 'Sentir que estou magoando a outra pessoa' },
    ],
  },
  {
    title: 'O que faz você repensar um limite que colocou?',
    options: [
      { pattern: 'guilt', label: 'Pensar que fui longe demais' },
      { pattern: 'hope', label: 'Achar que agora vai ser diferente' },
    ],
  },
  {
    title: 'Quando vocês ficam sem se falar, o que passa pela sua cabeça?',
    options: [
      { pattern: 'hope', label: 'Talvez ainda dê para mudar' },
      { pattern: 'connection', label: 'Sinto falta da nossa rotina' },
    ],
  },
  {
    title: 'O que torna mais difícil manter sua decisão?',
    options: [
      { pattern: 'guilt', label: 'Pensar que tudo foi culpa minha' },
      { pattern: 'connection', label: 'Sentir falta de ter alguém por perto' },
    ],
  },
  {
    title: 'O que você mais quer entender agora?',
    options: [
      { pattern: 'hope', label: 'Como reconhecer uma mudança de verdade' },
      { pattern: 'guilt', label: 'Como colocar limites sem tanta culpa' },
    ],
  },
];

const results = {
  hope: {
    title: 'A esperança de que a relação mude',
    summary: 'Pelas suas respostas, as promessas e os momentos de reconciliação parecem pesar quando você pensa em tentar de novo.',
    step: 'Lembre de uma promessa que você já ouviu mais de uma vez. O que mudou na prática? Por quanto tempo?',
  },
  connection: {
    title: 'A saudade da conexão',
    summary: 'Pelas suas respostas, sentir falta da companhia e da rotina de vocês pode tornar mais difícil manter a distância.',
    step: 'Pense em alguém de confiança com quem você pode conversar quando bater a saudade.',
  },
  guilt: {
    title: 'A culpa ao colocar limites',
    summary: 'Pelas suas respostas, você pode acabar assumindo mais responsabilidade do que cabe a você quando tenta colocar um limite.',
    step: 'Lembre de um limite que você tentou colocar. O que você queria proteger naquele momento?',
  },
};

const screen = document.querySelector('#screen');
const intro = screen.innerHTML;
const answers = [];
let current = -1;

function render() {
  screen.className = '';
  if (current < 0) {
    screen.innerHTML = intro;
  } else if (current < questions.length) {
    const question = questions[current];
    screen.className = 'question';
    screen.innerHTML = `
      <p class="step">Pergunta ${current + 1} de ${questions.length}</p>
      <progress aria-label="Perguntas respondidas" value="${current}" max="${questions.length}"></progress>
      <h1 id="title" tabindex="-1">${question.title}</h1>
      <div class="options">
        ${question.options.map(({ pattern, label }) => `
          <button class="option ${pattern}${answers[current] === pattern ? ' selected' : ''}" data-answer="${pattern}" type="button">
            <span class="option-art" aria-hidden="true"></span>
            <span>${label}</span>
          </button>
        `).join('')}
      </div>
      <button class="back" data-back type="button">← Voltar</button>
    `;
  } else {
    const scores = Object.fromEntries(Object.keys(results).map(pattern => [
      pattern, answers.filter(answer => answer === pattern).length,
    ]));
    const highest = Math.max(...Object.values(scores));
    const pattern = [...answers].reverse().find(answer => scores[answer] === highest);
    const result = results[pattern];

    screen.className = 'result';
    screen.innerHTML = `
      <p class="step">Seu resultado</p>
      <h1 id="title" tabindex="-1">${result.title}</h1>
      <p>${result.summary}</p>
      <p><strong>Um primeiro passo.</strong> ${result.step}</p>
      <div class="offer">
        <h2>Seu mapa para sair do ciclo</h2>
        <p>Um guia em PDF com exercícios para entender o que faz você voltar e planejar seus próximos passos.</p>
        <button class="primary" data-offer aria-expanded="false" aria-controls="offer-status" type="button">Quero descobrir meu mapa <span aria-hidden="true">↗</span></button>
        <p class="note" id="offer-status" role="status" hidden></p>
      </div>
      <button class="back" data-back type="button">← Rever minha última resposta</button>
      <button class="back" data-restart type="button">Recomeçar</button>
    `;
  }
  document.querySelector('#title').focus();
}

screen.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.hasAttribute('data-offer')) {
    if (checkoutUrl) {
      window.location.assign(checkoutUrl);
    } else {
      const status = document.querySelector('#offer-status');
      status.hidden = false;
      status.textContent = 'O PDF estará disponível em breve.';
      button.setAttribute('aria-expanded', 'true');
    }
    return;
  }

  if (button.hasAttribute('data-restart')) {
    answers.length = 0;
    current = -1;
  } else if (button.hasAttribute('data-back')) {
    current -= 1;
  } else {
    if (button.hasAttribute('data-answer')) {
      answers[current] = button.dataset.answer;
    }
    current += 1;
  }
  render();
});
