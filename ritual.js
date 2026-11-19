'use strict';

const ORDER_BUMP_ENABLED = false;

const ritualCards = {
  P: {
    title: 'A Porta Entreaberta',
    light: 'Você acredita nas pessoas e dá chance.',
    shadow: 'Acredita mais no que prometem do que no que fazem.',
    question: 'O que mudou, de fato, desde a última vez?',
    art: '<path d="M49 131V50h55v81M55 126V57l33 10v64zM98 108l28 23H89" fill="#dfbb72" fill-opacity=".15"/><path d="M44 132h89m-56-32h2"/><path d="M116 33a15 15 0 1 0 16 20 14 14 0 0 1-16-20z" fill="#dfbb72"/>',
  },
  S: {
    title: 'A Casa Silenciosa',
    light: 'Você valoriza companhia e vínculo.',
    shadow: 'Confunde o medo do silêncio com amor.',
    question: 'O que eu faria nesse horário se {ele} não existisse?',
    art: '<path d="M47 108V72a30 30 0 0 1 60 0v36z" fill="#dfbb72" fill-opacity=".22"/><path d="M77 43v65M48 78h58m-67 31h79m-48 10h21v7a9 9 0 0 1-9 9h-3a9 9 0 0 1-9-9zm22 2h4a4 4 0 0 1 0 8h-5m-28 7h39"/><circle cx="118" cy="42" r="12" fill="#dfbb72"/>',
  },
  C: {
    title: 'A Balança',
    light: 'Você olha para dentro e assume responsabilidade.',
    shadow: 'Assume também o que nunca foi seu.',
    question: 'De quem é essa culpa, de verdade?',
    art: '<path d="M80 51v81m-22 0h44M39 64l81 20m-78-19-16 36h32L42 65m76 19-17 34h34z"/><path d="M26 101q16 15 32 0m43 17q17 16 34 0"/><path d="m104 117 6-9 7 3 6-8 8 14z" fill="#dfbb72" fill-opacity=".45"/><circle cx="80" cy="74" r="4" fill="#dfbb72"/>',
  },
  H: {
    title: 'O Fio',
    light: 'Você constrói rotina e constância.',
    shadow: 'Toma o hábito por saudade.',
    question: 'Sinto falta da pessoa ou do hábito?',
    art: '<circle cx="79" cy="76" r="32"/><circle cx="79" cy="76" r="27"/><path d="M79 54v22l13 9m-13-34v4m25 21h-4m-21 25v-4m-25-21h4m22 32c-30 10-16 28 11 20 13-4 27-21 40-13 11 8-8 21-27 21"/><path d="M74 42v-7h10v7"/>',
  },
};
const ritualBack = '<path d="M80 45 110 82 80 119 50 82zM80 57l20 25-20 25-20-25z"/><path d="M80 68a15 15 0 1 0 14 22 15 15 0 0 1-14-22z" fill="#dfbb72"/>';
const phaseCopy = [
  ['Lua nova', 'Tempo de começar. Decida uma coisa pequena e cumpra.'],
  ['Lua crescente', 'Tempo de plantar. Monte sua rotina com calma.'],
  ['Quarto crescente', 'Tempo de agir. Mantenha o que decidiu, mesmo com dúvida.'],
  ['Gibosa crescente', 'Tempo de ajustar. Veja o que está funcionando.'],
  ['Lua cheia', 'Tempo de soltar. Escreva o que pesa e deixe no papel.'],
  ['Gibosa minguante', 'Tempo de agradecer. Reconheça o que você já atravessou.'],
  ['Quarto minguante', 'Tempo de limpar. Tire do caminho o que te puxa de volta.'],
  ['Lua minguante', 'Tempo de descansar. Fechar também é um passo.'],
];
const dayMs = 86_400_000;
const synodicMonth = 29.530588853;
const newMoonEpoch = Date.UTC(2000, 0, 6, 18, 14);
const saoPaulo = 'America/Sao_Paulo';
const localClock = new Intl.DateTimeFormat('en-CA', {
  timeZone: saoPaulo, year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', hourCycle: 'h23',
});
const blockDate = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' });

function moonPhase(instant) {
  const days = (instant - newMoonEpoch) / dayMs;
  const age = ((days % synodicMonth) + synodicMonth) % synodicMonth;
  const cycle = age / synodicMonth;
  const [name, line] = phaseCopy[Math.floor(cycle * 8 + 0.5) % 8];
  return { name, line, waxing: cycle < 0.5, illumination: (1 - Math.cos(2 * Math.PI * cycle)) / 2 };
}

function saoPauloParts(instant) {
  return Object.fromEntries(localClock.formatToParts(instant).map(({ type, value }) => [type, Number(value)]));
}

function ritualCalendar(now) {
  const { year, month, day } = saoPauloParts(now);
  const date = Date.UTC(year, month - 1, day);
  const today = moonPhase(now);
  const weeks = [0, 7, 14, 21].map((offset, index) => {
    const start = date + offset * dayMs;
    const end = date + [6, 13, 20, 29][index] * dayMs;
    const utcNoon = start + dayMs / 2;
    const localNoon = utcNoon + (12 - saoPauloParts(utcNoon).hour) * 3_600_000;
    return {
      label: 'Semana ' + (index + 1),
      days: 'Dias ' + (offset + 1) + '–' + [7, 14, 21, 30][index],
      dates: blockDate.format(start) + ' a ' + blockDate.format(end),
      phase: offset ? moonPhase(localNoon) : today,
    };
  });
  return { today, weeks };
}

function cardArt(art) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" aria-hidden="true">
    <rect width="160" height="200" rx="10" fill="#131e36"/>
    <g fill="none" stroke="#dfbb72" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="144" height="184" rx="7"/>
      <rect x="13" y="13" width="134" height="174" rx="5" opacity=".45"/>
      <path d="M31 37v10m-5-5h10m94 90v12m-6-6h12m-94 14v8m-4-4h8"/>
      <circle cx="28" cy="65" r="1"/><circle cx="130" cy="72" r="1"/><circle cx="116" cy="155" r="1"/>
      ${art}
      <path d="M67 173h26m-13-5 5 5-5 5-5-5z"/>
    </g>
  </svg>`;
}

function moonArt(phase) {
  const radius = 35;
  const terminator = radius * Math.abs(1 - 2 * phase.illumination);
  const middle = terminator < 0.01 ? 'L44 9' : `A${terminator} 35 0 0 ${phase.illumination > 0.5 ? 1 : 0} 44 9`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" aria-hidden="true">
    <circle cx="44" cy="44" r="35" fill="#25334d"/>
    <path d="M44 9 A35 35 0 0 1 44 79 ${middle}Z" fill="#efd198"${phase.waxing ? '' : ' transform="translate(88 0) scale(-1 1)"'}/>
    <circle cx="44" cy="44" r="35" fill="none" stroke="#dfbb72" stroke-width="1"/>
  </svg>`;
}

function renderRitual({ card, today, weeks }) {
  return `
    <p class="ritual-bridge">Toda travessia tem um tempo. Veja o seu.</p>
    <section class="ritual" aria-labelledby="ritual-title">
      <h2 id="ritual-title">Seu ritual de 30 dias</h2>
      <p>Um apoio simbólico para acompanhar sua travessia. Não é previsão.</p>

      <details class="ritual-step" open>
        <summary>1. Virar a carta</summary>
        <div class="ritual-card">
          <div class="ritual-card-turn">
            <div class="ritual-card-back">${cardArt(ritualBack)}</div>
            <div class="ritual-card-front">${cardArt(card.art)}</div>
          </div>
        </div>
        <button class="ritual-action" data-ritual="virar_carta" aria-controls="ritual-card-copy" type="button">Virar minha carta</button>
        <div id="ritual-card-copy" hidden>
          <h3 tabindex="-1">${card.title}</h3>
          <p><strong>Luz:</strong> ${card.light}</p>
          <p><strong>Sombra:</strong> ${card.shadow}</p>
          <p><strong>Pergunta da carta:</strong> ${card.question}</p>
          <button class="ritual-action" data-ritual="salvar_carta" type="button">Salvar minha carta</button>
        </div>
      </details>

      <details class="ritual-step">
        <summary>2. Sua lua de hoje</summary>
        <div class="ritual-today">${moonArt(today)}</div>
        <h3>${today.name}</h3>
        <p>${today.line}</p>
      </details>

      <details class="ritual-step">
        <summary>3. Seu mapa de 30 dias</summary>
        <p>Seu plano começa hoje. As luas marcam momentos de revisão.</p>
        <ol class="ritual-calendar">
          ${weeks.map(({ label, days, dates, phase }) => `
            <li>
              ${moonArt(phase)}
              <h3>${label}</h3>
              <p class="ritual-dates">${days}<br><time>${dates}</time></p>
              <p><strong>${phase.name}</strong></p>
              <p>${phase.line}</p>
            </li>
          `).join('')}
        </ol>
        <button class="ritual-action" data-ritual="salvar_mapa" type="button">Salvar meu mapa</button>
      </details>

      <p class="ritual-disclaimer">Ritual simbólico, sem previsão nem aconselhamento. Para apoio emocional profissional, procure um psicólogo.</p>
      <p class="ritual-status" role="status"></p>
    </section>
  `;
}

function vectorImage(svg) {
  const image = new Image();
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  return image.decode().then(() => image);
}

async function saveRitualImage(ritual, isCard) {
  const width = 960;
  const height = isCard ? 1200 : 1120;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = '#131e36';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = '#dfbb72';
  context.lineWidth = 2;
  context.strokeRect(28, 28, width - 56, height - 56);

  function write(text, x, y, maxWidth, font, color = '#f8ebcd') {
    context.font = font;
    context.fillStyle = color;
    const lineHeight = Math.round(parseInt(font.match(/\d+px/)[0], 10) * 1.28);
    let line = '';
    for (const word of text.split(' ')) {
      const next = line ? line + ' ' + word : word;
      if (line && context.measureText(next).width > maxWidth) {
        context.fillText(line, x, y);
        y += lineHeight;
        line = word;
      } else {
        line = next;
      }
    }
    context.fillText(line, x, y);
    return y + lineHeight;
  }

  write('amore.', 70, 79, 820, '29px Georgia', '#dfbb72');
  if (isCard) {
    const { card } = ritual;
    context.drawImage(await vectorImage(cardArt(card.art)), 255, 118, 450, 562);
    write(card.title, 74, 761, 812, '56px Georgia');
    const nextLine = write('Luz: ' + card.light, 74, 840, 812, '32px sans-serif');
    write('Sombra: ' + card.shadow, 74, nextLine + 28, 812, '32px sans-serif');
  } else {
    write('Seu mapa de 30 dias', 70, 157, 820, '58px Georgia');
    write('Comece hoje. As luas marcam momentos de revisão.', 70, 216, 820, '28px sans-serif');
    for (const [index, week] of ritual.weeks.entries()) {
      const x = 70 + (index % 2) * 422;
      const y = 260 + Math.floor(index / 2) * 370;
      context.strokeRect(x, y, 398, 348);
      context.drawImage(await vectorImage(moonArt(week.phase)), x + 22, y + 18, 76, 76);
      write(week.label + ' · ' + week.days, x + 22, y + 130, 350, '30px Georgia');
      write(week.dates, x + 22, y + 174, 350, '25px sans-serif');
      write(week.phase.name, x + 22, y + 225, 350, '28px Georgia', '#dfbb72');
      write(week.phase.line, x + 22, y + 263, 350, '23px sans-serif');
    }
    write('Ritual simbólico, sem previsão.', 70, 1053, 820, '25px sans-serif');
  }

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = isCard ? 'amore-minha-carta.png' : 'amore-meu-mapa-de-30-dias.png';
  link.click();
}
