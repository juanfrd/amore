// Add the public checkout URL when the PDF and price are ready.
const checkoutUrl = '';

const questions = [
  {
    title: 'Después de una pelea, ¿qué suele hacerte volver?',
    options: [
      'Me promete que las cosas van a cambiar.',
      'Me angustia pensar que la relación se termine.',
      'Termino sintiendo que todo fue culpa mía.',
    ],
  },
  {
    title: '¿Qué te pesa más cuando piensas en tomar distancia?',
    options: [
      'La idea de irme justo cuando todo podría mejorar.',
      'Echar de menos la compañía y la rutina.',
      'Sentir que le estoy fallando.',
    ],
  },
  {
    title: 'Cuando intentas poner un límite, ¿qué suele pasar?',
    options: [
      'Lo dejo pasar si la otra persona vuelve a acercarse.',
      'Me cuesta mantenerlo cuando llevamos tiempo sin hablar.',
      'Acabo disculpándome por haberlo puesto.',
    ],
  },
  {
    title: '¿Qué recuerdo aparece cuando dudas de alejarte?',
    options: [
      'Los buenos momentos y lo que podríamos recuperar.',
      'Lo que sentía al saber que tenía a alguien cerca.',
      'Las veces en las que pensé que podía haber hecho más.',
    ],
  },
  {
    title: '¿Qué te gustaría aclarar primero?',
    options: [
      'Cómo distinguir un cambio real de una promesa.',
      'Cómo sostenerme cuando me siento sin compañía.',
      'Cómo respetar mis límites sin cargar con toda la culpa.',
    ],
  },
];

const results = [
  {
    title: 'La esperanza de que cambie',
    summary: 'Tus respuestas sugieren que las reconciliaciones y las promesas pueden pesar mucho cuando decides si volver a intentarlo.',
    step: 'Piensa en una promesa que hayas escuchado más de una vez. Pregúntate qué cambió en los hechos y cuánto duró ese cambio.',
  },
  {
    title: 'El miedo a perder la conexión',
    summary: 'Tus respuestas sugieren que imaginar la distancia, el silencio o un cambio de rutina puede hacerte más difícil sostener tu decisión.',
    step: 'Piensa en alguien de confianza con quien puedas hablar cuando extrañes la relación. Elige también una actividad sencilla para ese momento.',
  },
  {
    title: 'La culpa al poner límites',
    summary: 'Tus respuestas sugieren que, cuando intentas cuidar tus límites, podrías acabar asumiendo más responsabilidad de la que te corresponde.',
    step: 'Recuerda un límite que quisiste poner y pregúntate qué estabas intentando cuidar. Si escribirlo te resulta seguro, ponlo en una frase breve.',
  },
];

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
      <p class="step">Pregunta ${current + 1} de ${questions.length}</p>
      <progress aria-label="Preguntas respondidas" value="${current}" max="${questions.length}"></progress>
      <h1 id="title" tabindex="-1">${question.title}</h1>
      <div class="options">
        ${question.options.map((option, index) => `
          <button class="option${answers[current] === index ? ' selected' : ''}" data-answer="${index}" type="button">${option}</button>
        `).join('')}
      </div>
      <button class="back" data-back type="button">← Volver</button>
    `;
  } else {
    const scores = results.map((_, index) => answers.filter(answer => answer === index).length);
    const highest = Math.max(...scores);
    const pattern = [...answers].reverse().find(answer => scores[answer] === highest);
    const result = results[pattern];

    screen.className = 'result';
    screen.innerHTML = `
      <p class="step">Tu resultado</p>
      <h1 id="title" tabindex="-1">${result.title}</h1>
      <p>${result.summary}</p>
      <p><strong>Un primer paso.</strong> ${result.step}</p>
      <div class="offer">
        <h2>Tu mapa para salir del ciclo</h2>
        <p>Una guía en PDF con ejercicios para reconocer qué te hace volver y ordenar tus próximos pasos.</p>
        <button class="primary" data-offer aria-expanded="false" aria-controls="offer-status" type="button">Quiero descubrir mi mapa <span aria-hidden="true">↗</span></button>
        <p class="note" id="offer-status" role="status" hidden></p>
      </div>
      <button class="back" data-back type="button">← Revisar mi última respuesta</button>
      <button class="back" data-restart type="button">Empezar de nuevo</button>
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
      status.textContent = 'El PDF estará disponible próximamente.';
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
      answers[current] = Number(button.dataset.answer);
    }
    current += 1;
  }
  render();
});
