'use strict';

const cycleStages = ['Briga', 'Afastamento', 'Saudade', 'Promessa', 'Volta'];
// Atualize as páginas quando o PDF completo estiver diagramado.
const resultDetails = {
  P: {
    stage: 'Promessa', page: 12, name: 'Camila',
    story: "Camila guardou, num álbum do celular chamado ‘Promessas’, as mensagens que ele mandava depois de cada briga. ‘Dessa vez eu mudo.’ ‘Juro que acabou.’ Uma vez ele apareceu às duas da manhã na porta do prédio dela, com flores de posto de gasolina, chorando. Ela contou: foram onze vezes. Na décima segunda, ela abriu o álbum e leu tudo em ordem, de cima para baixo. As mensagens eram quase iguais. Mudava só a data. Ela não bloqueou ele naquele dia. Fez uma coisa menor, e foi essa coisa menor que quebrou o ciclo. A pergunta de uma linha que ela passou a se fazer antes de responder qualquer mensagem dele está na página {page}.",
  },
  S: {
    stage: 'Saudade', page: 15, name: 'Larissa',
    story: "O pior horário da Larissa era domingo, às oito da noite. Durante a semana ela aguentava. No domingo, o apartamento ficava tão quieto que ela deixava a TV ligada em qualquer canal, só para ouvir uma voz. Voltou com ele três vezes, e nas três ela mandou a primeira mensagem num domingo. Foi uma amiga que viu o padrão: ‘Você não volta pra ele. Você volta pro domingo.’ Larissa ficou calada, porque era verdade. Dali em diante ela parou de tentar não sentir falta e começou a cuidar daquele horário. O que ela colocou no domingo às oito não foi nada complicado. Está na página {page}.",
  },
  C: {
    stage: 'Briga', page: 9, name: 'Bianca',
    story: "Bianca tinha um arquivo no bloco de notas chamado ‘O que eu fiz de errado’. Três páginas. Quando ele dizia ‘você sempre exagera’, ela não discutia: anotava. Quando terminou com ele, a primeira mensagem dela foi um pedido de desculpas, por ter terminado. Um dia ela abriu o arquivo e percebeu que não havia nenhuma linha sobre ele. Nenhuma. Criou um segundo arquivo, do lado. O que ela escreveu ali, e a regra que passou a seguir quando a culpa aparece, estão na página {page}.",
  },
  H: {
    stage: 'Afastamento', page: 18, name: 'Renata',
    story: "Durante quatro anos, todo dia às 7h40 chegava um ‘bom dia’ no WhatsApp da Renata. Depois do término, às 7h40 ela ainda pegava o celular sem perceber e ficava olhando a tela. Passou semanas achando que sentia falta dele. Até que ele mandou um bom dia, e ela não sentiu alívio. Sentiu cansaço. Ela não sentia falta dele: sentia falta de alguém dizendo bom dia. Isso mudou o que ela precisava resolver. O que ela passou a fazer às 7h40 a partir daquele dia está na página {page}.",
  },
};
