'use strict';

// Preencha com os dados reais da oferta antes de ativar o checkout.
const offer = { checkoutUrl: '', price: 'R$ 60', guarantee: 'Garantia de 7 dias' };

const pronouns = [
  { ele: 'ele', Ele: 'Ele', dele: 'dele' },
  { ele: 'ela', Ele: 'Ela', dele: 'dela' },
  { ele: 'a pessoa', Ele: 'A pessoa', dele: 'da pessoa' },
];

const intake = [
  { key: 'pronoun', title: 'A relação foi com...', options: ['Um homem', 'Uma mulher', 'Prefiro não dizer'] },
  { key: 'age', title: 'Qual é a sua faixa etária?', options: ['18–24', '25–34', '35+'] },
  { key: 'duration', title: 'Quanto tempo vocês ficaram juntos?', options: ['Menos de 1 ano', '1 a 3 anos', 'Mais de 3 anos'] },
  { key: 'contact', title: 'Vocês ainda têm contato?', options: ['Sim, todo dia', 'De vez em quando', 'Não, estamos sem contato'] },
  { key: 'fear', title: 'Em algum momento você sentiu medo nessa relação?', options: ['Sim', 'Não', 'Prefiro não responder'] },
];

const questions = [
  {
    "title": "Depois de uma briga feia, o que te faz querer voltar?",
    "answers": {
      "P": [
        {
          "label": "{Ele} chorou, pediu perdão e eu amoleci",
          "reaction": "O choro costuma chegar rápido depois da briga. E a decisão que parecia firme de noite amolece de manhã."
        },
        {
          "label": "{Ele} jura que dessa vez vai ser diferente",
          "reaction": "'Dessa vez' é a frase mais ouvida por quem vive esse ciclo. Vale anotar quantas vezes ela já apareceu."
        }
      ],
      "S": [
        {
          "label": "Não aguento a casa em silêncio",
          "reaction": "O silêncio de depois da briga pesa mais do que a briga. Muita gente volta por ele, e não pela pessoa."
        },
        {
          "label": "Fico pensando que não vou ter mais ninguém",
          "reaction": "Esse pensamento aparece mais forte de madrugada. De dia, ele costuma perder força."
        }
      ],
      "C": [
        {
          "label": "Começo a achar que eu exagerei",
          "reaction": "Duvidar de si logo depois da briga é mais comum do que parece, e quase nunca é sinal de que você errou."
        },
        {
          "label": "Lembro das vezes em que eu também errei",
          "reaction": "Todo mundo erra. Errar uma vez não explica repetir o mesmo ciclo dez."
        }
      ],
      "H": [
        {
          "label": "Sinto falta de conversar com {ele} todo dia",
          "reaction": "Conversar todo dia vira costume, e costume dói quando para. Isso não prova que a relação era boa."
        },
        {
          "label": "Sinto falta da nossa rotina",
          "reaction": "A rotina é a primeira coisa que falta e a última que a gente admite."
        }
      ]
    }
  },
  {
    "title": "O que mais pesa na hora de se afastar?",
    "answers": {
      "P": [
        {
          "label": "Lembro de como era no começo",
          "reaction": "O começo é real. Só que ele não prova que o resto vai melhorar."
        },
        {
          "label": "Acho que {ele} pode mudar se eu esperar mais um pouco",
          "reaction": "Esperar mudança dá a sensação de estar fazendo algo. Mas quem muda não precisa pedir que você espere."
        }
      ],
      "S": [
        {
          "label": "Não sei como é a vida sem {ele} por perto",
          "reaction": "Faz sentido ter medo do que não se conhece. Se afastar é aprender isso aos poucos, não de uma vez."
        },
        {
          "label": "Medo de ninguém mais me querer",
          "reaction": "Esse medo parece uma sentença, mas não é um fato."
        }
      ],
      "C": [
        {
          "label": "Parece que estou machucando {ele}",
          "reaction": "Se afastar de quem machuca pode doer em quem fica. Isso não torna a decisão errada."
        },
        {
          "label": "Tenho medo do que vão falar de mim",
          "reaction": "O que falam raramente inclui o que aconteceu dentro de casa."
        }
      ],
      "H": [
        {
          "label": "Perder tudo o que a gente construiu",
          "reaction": "Nada do que você viveu some. Mas o que vocês construíram não é motivo suficiente para continuar."
        },
        {
          "label": "Os amigos e planos que temos em comum",
          "reaction": "É uma das partes mais chatas de resolver, e dá para organizar por etapas."
        }
      ]
    }
  },
  {
    "title": "O que passa por você quando vê as redes ou a foto {dele}?",
    "answers": {
      "P": [
        {
          "label": "Procuro sinal de que {ele} mudou",
          "reaction": "Procurar sinal é um jeito de manter a porta aberta. Só que rede social mostra o que a pessoa quer mostrar."
        },
        {
          "label": "Fico imaginando se {ele} está sofrendo igual",
          "reaction": "Quem sofre muito costuma achar que o outro sofre igual. Nem sempre é o caso."
        }
      ],
      "S": [
        {
          "label": "Bate uma solidão que dói no corpo",
          "reaction": "Isso é real e acontece com muita gente. A intensidade costuma baixar com os dias."
        },
        {
          "label": "Penso que ninguém vai me olhar do mesmo jeito",
          "reaction": "Esse jeito de olhar também vinha com dor. Existem outros."
        }
      ],
      "C": [
        {
          "label": "Me pergunto se eu errei mais do que {ele}",
          "reaction": "Contar quem errou mais é um jeito de continuar dentro da briga. Dá para analisar sem se condenar."
        },
        {
          "label": "Lembro de tudo o que eu fiz de errado",
          "reaction": "Lembrar só dos seus erros é um filtro, não a história completa."
        }
      ],
      "H": [
        {
          "label": "Sinto falta do nosso dia a dia",
          "reaction": "O dia a dia é o que mais falta. Dá para reconstruir o seu sem {ele}."
        },
        {
          "label": "Lembro dos lugares onde a gente ia",
          "reaction": "Os lugares guardam a lembrança. Mudar de trajeto por um tempo ajuda mais do que parece."
        }
      ]
    }
  },
  {
    "title": "Quando vocês ficam sem se falar, o que passa pela sua cabeça?",
    "answers": {
      "P": [
        {
          "label": "Talvez ainda dê para consertar",
          "reaction": "Consertar exige dois. Vale perguntar quem tem feito esse trabalho até agora."
        },
        {
          "label": "E se dessa vez {ele} mudou de verdade?",
          "reaction": "É a pergunta mais perigosa e a mais comum. A resposta está no que {ele} faz por semanas, não numa conversa."
        }
      ],
      "S": [
        {
          "label": "A casa fica vazia demais",
          "reaction": "Não é só a casa: é o horário em que ela fica vazia. Descobrir qual é esse horário ajuda."
        },
        {
          "label": "Será que vou conhecer alguém de novo?",
          "reaction": "É uma pergunta do futuro tentando ocupar o presente. Uma coisa de cada vez."
        }
      ],
      "C": [
        {
          "label": "Se eu me calasse, a briga não aconteceria",
          "reaction": "Se calar para ter paz faz o peso da relação ficar só com você."
        },
        {
          "label": "Será que errei ao terminar?",
          "reaction": "Terminar uma relação que machuca não é erro. Dói, mas não é erro."
        }
      ],
      "H": [
        {
          "label": "Estranho não ter com quem falar no fim do dia",
          "reaction": "O fim do dia é o horário mais difícil. Combinar algo fixo com outra pessoa nesse horário ajuda."
        },
        {
          "label": "Pego o celular sem perceber pra ver se {ele} escreveu",
          "reaction": "Isso é um hábito, não um sentimento. Hábitos mudam com repetição."
        }
      ]
    }
  },
  {
    "title": "O que mais te faz duvidar da sua decisão?",
    "answers": {
      "P": [
        {
          "label": "Os gestos de carinho que vêm depois da briga",
          "reaction": "Carinho depois da briga faz parte do ciclo. Ele não anula o que veio antes."
        },
        {
          "label": "Gente dizendo que {ele} mudou",
          "reaction": "Quem vê de fora vê um pedaço. Quem viveu sabe o resto."
        }
      ],
      "S": [
        {
          "label": "Sentir falta de ter alguém por perto",
          "reaction": "Companhia é uma necessidade real. Ela pode vir de outras pessoas, e não só {dele}."
        },
        {
          "label": "Medo de recomeçar do zero",
          "reaction": "Você não recomeça do zero. Leva com você tudo o que aprendeu."
        }
      ],
      "C": [
        {
          "label": "Pensar que tudo foi culpa minha",
          "reaction": "Quando 'tudo' é culpa de uma pessoa só, geralmente alguém ajudou a pensar assim."
        },
        {
          "label": "Sentir que abandonei {ele} quando mais precisava",
          "reaction": "Ir embora de um lugar que te machuca não é abandono."
        }
      ],
      "H": [
        {
          "label": "O costume de falar todo dia",
          "reaction": "É um hábito que dá para trocar por outro, aos poucos."
        },
        {
          "label": "Datas, músicas e lugares que me lembram {ele}",
          "reaction": "Esses gatilhos perdem força com o tempo. Saber quais são já ajuda a se preparar."
        }
      ]
    }
  }
];

const goals = [
  { id: 'mudanca', label: "Como saber se {ele} mudou de verdade", chapter: 'Mudança na prática', art: 'P' },
  { id: 'limites', label: "Como dizer não sem sentir culpa", chapter: 'Limites sem culpa', art: 'C' },
  { id: 'saudade', label: "Como parar de sentir falta o tempo todo", chapter: 'Reconstruindo sua rotina', art: 'H' },
  { id: 'ciclo', label: "Como não cair no mesmo ciclo de novo", chapter: 'Como interromper o ciclo', art: 'C' },
  { id: 'volta', label: "Por que eu volto mesmo sabendo que vou sofrer", chapter: 'O que faz você voltar', art: 'P' },
  { id: 'solidao', label: "Como lidar com a solidão depois do fim", chapter: 'Um plano para lidar com a solidão', art: 'S' },
  { id: 'contato', label: "O que fazer quando {ele} me procura", chapter: 'O que fazer quando a pessoa procura você', art: 'C' },
  { id: 'autoestima', label: "Como voltar a gostar de mim", chapter: 'Reconstruindo sua autoestima', art: 'S' },
  { id: 'conserto', label: "Como saber se ainda tem conserto", chapter: 'Como avaliar se a relação pode mudar', art: 'P' },
  { id: 'escolhas', label: "Como escolher melhor da próxima vez", chapter: 'O que buscar na próxima relação', art: 'H' },
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

const durationCopy = [
  "Menos de um ano juntos parece pouco, mas o ciclo já te marcou.",
  "Entre um e três anos, o ciclo costuma já estar bem instalado.",
  "Depois de mais de três anos, é natural que seja difícil desligar."
];

const contactCopy = [
  "Vocês ainda se falam todo dia, e isso mantém o ciclo vivo.",
  "O contato de vez em quando mantém a porta entreaberta.",
  "Estar sem contato é o passo mais difícil, e você já está nele."
];

const profileMix = {
  "P+S": "A esperança e o medo de ficar sem ninguém se alimentam: quanto mais falta faz alguém, mais você quer acreditar na promessa.",
  "P+C": "Você acredita na mudança e ainda se culpa pela briga: isso te faz dar mais uma chance mesmo quando não deveria.",
  "P+H": "A promessa vem junto com a rotina conhecida, e juntas parecem uma boa razão para voltar.",
  "S+P": "O medo do vazio vem primeiro, e a esperança aparece para justificar a volta.",
  "S+C": "A solidão pesa e a culpa fala mais alto: juntas, fazem o fim parecer um erro seu.",
  "S+H": "O que falta é companhia e rotina ao mesmo tempo. Dá para trocar uma e a outra aos poucos.",
  "C+P": "A culpa te prende e a esperança diz que dá para consertar. Você tenta compensar algo que nunca foi só seu.",
  "C+S": "Você carrega culpa e tem medo de ficar sem ninguém. São duas coisas pesadas ao mesmo tempo.",
  "C+H": "A culpa e o costume trabalham juntos: um diz que você deve ficar, o outro faz isso parecer natural.",
  "H+P": "O costume faz a volta parecer normal, e a promessa dá o empurrão final.",
  "H+S": "A rotina some e o vazio aparece. O que dói é a ausência do hábito mais do que da pessoa.",
  "H+C": "Sentir falta da rotina e se culpar pelo fim aparecem juntos com frequência, mas são coisas separadas."
};
