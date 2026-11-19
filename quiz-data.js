'use strict';

// Preencha com os dados reais da oferta antes de ativar o checkout.
const offer = { checkoutUrl: '', price: 'R$ 60', guarantee: 'Garantia de 7 dias' };

const intake = [
  { title: 'Qual é a sua faixa etária?', options: ['18–24', '25–34', '35+'] },
  { title: 'Quanto tempo vocês ficaram juntos?', options: ['Menos de 1 ano', '1 a 3 anos', 'Mais de 3 anos'] },
  { title: 'Vocês ainda têm contato?', options: ['Sim, todos os dias', 'De vez em quando', 'Não, estamos sem contato'] },
  { title: 'Em algum momento você sentiu medo nessa relação?', options: ['Sim', 'Não', 'Prefiro não responder'] },
];

const questions = [
  {
    title: 'Depois de uma briga, o que mais faz você querer voltar?',
    answers: {
      P: ['A promessa de que vai mudar', 'Os pedidos de desculpa e os gestos de carinho depois'],
      S: ['O medo de ficar sem ninguém', 'O silêncio de casa sem a pessoa'],
      C: ['Achar que exagerei na briga', 'Ouvir que eu também tive culpa'],
      H: ['A saudade da companhia', 'Sentir falta da nossa rotina'],
    },
    feedback: 'Isso é mais comum do que parece. E tem uma explicação.',
  },
  {
    title: 'O que mais pesa quando você pensa em se afastar?',
    answers: {
      P: ['A esperança de que dessa vez seja diferente', 'Lembrar dos bons momentos do começo'],
      S: ['Ficar sem aquela companhia', 'Não saber como é viver sem ninguém por perto'],
      C: ['Sentir que estou magoando a outra pessoa', 'Medo de parecer que fiz algo errado'],
      H: ['Perder a rotina que construímos', 'Os amigos e planos que temos em comum'],
    },
    feedback: 'Muita gente se sente exatamente assim. Você tem com quem contar.',
  },
  {
    title: 'O que você sente quando vê as redes ou as fotos da pessoa?',
    answers: {
      P: ['Procuro sinais de que ela mudou', 'Penso que talvez agora seja diferente'],
      S: ['Uma solidão enorme', 'Medo de que ninguém mais me queira'],
      C: ['Me pergunto se fui além da conta', 'Lembro de tudo o que fiz de errado'],
      H: ['Sinto falta do nosso dia a dia', 'Lembro dos lugares e hábitos que tínhamos juntos'],
    },
    feedback: 'Já estamos começando a ver um padrão nas suas respostas…',
  },
  {
    title: 'Quando vocês ficam sem se falar, o que passa pela sua cabeça?',
    answers: {
      P: ['Talvez ainda dê para mudar', 'E se dessa vez for diferente?'],
      S: ['A casa fica vazia demais', 'Será que alguém vai me querer de novo?'],
      C: ['Será que exagerei?', 'Eu devia ter evitado a briga'],
      H: ['Sinto falta da nossa rotina', 'Estranho não ter com quem falar no fim do dia'],
    },
    feedback: 'Essa resposta ajuda a entender o que torna tão difícil se afastar.',
  },
  {
    title: 'O que torna mais difícil manter sua decisão?',
    answers: {
      P: ['Acreditar nas promessas de mudança', 'Ver pequenos gestos de carinho depois da briga'],
      S: ['Sentir falta de ter alguém por perto', 'Medo de recomeçar do zero'],
      C: ['Pensar que tudo foi culpa minha', 'A culpa por ter deixado a pessoa'],
      H: ['O costume de falar todos os dias', 'Os lugares e momentos que me lembram a pessoa'],
    },
    feedback: 'Última pergunta! Seu perfil está quase pronto.',
  },
];

const goals = [
  { id: 'mudanca', label: 'Como reconhecer uma mudança de verdade', chapter: 'Mudança na prática', art: 'P' },
  { id: 'limites', label: 'Como colocar limites sem tanta culpa', chapter: 'Limites sem culpa', art: 'C' },
  { id: 'saudade', label: 'Como parar de sentir falta o tempo todo', chapter: 'Reconstruindo sua rotina', art: 'H' },
  { id: 'ciclo', label: 'Como não cair no mesmo ciclo de novo', chapter: 'Como interromper o ciclo', art: 'C' },
  { id: 'volta', label: 'Por que eu volto mesmo sabendo que vou sofrer', chapter: 'O que faz você voltar', art: 'P' },
  { id: 'solidao', label: 'Como lidar com a solidão depois do término', chapter: 'Um plano para lidar com a solidão', art: 'S' },
  { id: 'contato', label: 'Como resistir quando a pessoa me procura', chapter: 'O que fazer quando a pessoa procura você', art: 'C' },
  { id: 'autoestima', label: 'Como recuperar minha autoestima', chapter: 'Reconstruindo sua autoestima', art: 'S' },
  { id: 'conserto', label: 'Como saber se a relação tem conserto', chapter: 'Como avaliar se a relação pode mudar', art: 'P' },
  { id: 'escolhas', label: 'Como escolher melhor da próxima vez', chapter: 'O que buscar na próxima relação', art: 'H' },
];

const profiles = {
  P: {
    title: 'O Ciclo da Esperança',
    summary: 'Você se apega à ideia de que a pessoa pode mudar. Cada promessa e cada gesto de carinho depois da briga reacende a esperança, e é isso que mantém o ciclo girando. Faz sentido querer acreditar no melhor da outra pessoa. Para decidir o que fazer, observe se as atitudes acompanham as promessas.',
    hook: 'No guia, você aprende a diferenciar uma mudança de verdade de uma promessa passageira.',
  },
  S: {
    title: 'O Medo do Vazio',
    summary: 'Talvez o medo de ficar sem companhia seja o que mais torna difícil se afastar. A solidão pesa tanto que voltar parece mais fácil do que enfrentar o silêncio. Esse medo é real, e dá para atravessar esse momento com apoio.',
    hook: 'No guia, você encontra um plano de 30 dias para lidar com a solidão e atravessar os momentos em que dá vontade de voltar.',
  },
  C: {
    title: 'O Peso da Culpa',
    summary: 'Você carrega a sensação de que tudo foi sua responsabilidade. Mesmo quando sofreu, acaba se perguntando se exagerou e se magoou a outra pessoa. Essa culpa pode fazer você recuar de limites que eram necessários.',
    hook: 'No guia, você aprende a colocar limites com menos culpa e a reconhecer o que está sob sua responsabilidade.',
  },
  H: {
    title: 'O Laço do Costume',
    summary: 'Talvez o que mais faça falta seja a rotina: as conversas diárias, os planos e a companhia. O hábito cria um laço forte, e por isso o silêncio pode parecer tão estranho.',
    hook: 'No guia, você aprende a reconstruir sua rotina e a lidar com a saudade no dia a dia.',
  },
};
