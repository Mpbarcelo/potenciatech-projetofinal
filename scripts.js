const carouselImages = document.querySelectorAll('.carrosel .carousel-img');
let currentlySelected = 0;
let slideInterval;

function showImage(index) {
    carouselImages.forEach(img => {
        img.style.display = 'none';
    });
    carouselImages[index].style.display = 'block';
}

function nextImage() {
    currentlySelected++;
    if (currentlySelected >= carouselImages.length) {
        currentlySelected = 0;
    }
    showImage(currentlySelected);
}

function prevImage() {
    currentlySelected--;
    if (currentlySelected < 0) {
        currentlySelected = carouselImages.length - 1;
    }
    showImage(currentlySelected);
}

function startSlide() {
    slideInterval = setInterval(nextImage, 2000); // Troca de imagem a cada 3 segundos (3000 milissegundos)
}

function stopSlide() {
    clearInterval(slideInterval);
}

showImage(currentlySelected);
startSlide();

const nextButton = document.querySelector('.carrosel .next');
if (nextButton) {
    nextButton.addEventListener('click', () => {
        nextImage();
        stopSlide();
        startSlide();
    });
}

const prevButton = document.querySelector('.carrosel .prev');
if (prevButton) {
    prevButton.addEventListener('click', () => {
        prevImage();
        stopSlide();
        startSlide();
    });
}

//quiz

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultadoContainer = document.getElementById('resultado');

const perguntas = [
  {
    pergunta: "Em qual estado brasileiro Zilda Arns nasceu?",
    respostas: {
      a: "Rio de Janeiro",
      b: "Santa Catarina",
      c: "São Paulo"
    },
    respostaCorreta: "b"
  },
  {
    pergunta: "Qual foi a organização fundada por Zilda Arns para promover a saúde infantil?",
    respostas: {
      a: "UNICEF",
      b: "Pastoral da Criança",
      c: "Médicos Sem Fronteiras"
    },
    respostaCorreta: "b"
  },
  // Adicione mais perguntas conforme necessário
];

function criarQuiz() {
  const output = [];

  perguntas.forEach((perguntaAtual, numeroPergunta) => {
    const respostas = [];
    for (letra in perguntaAtual.respostas) {
      respostas.push(
        `<label>
          <input type="radio" name="pergunta${numeroPergunta}" value="${letra}">
          ${letra}: ${perguntaAtual.respostas[letra]}
        </label>`
      );
    }

    output.push(
      `<div class="pergunta">${perguntaAtual.pergunta}</div>
      <div class="respostas">${respostas.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function mostrarResultado() {
  const respostas = quizContainer.querySelectorAll('.respostas');
  let acertos = 0;

  perguntas.forEach((perguntaAtual, numeroPergunta) => {
    const respostaSelecionada = `input[name=pergunta${numeroPergunta}]:checked`;
    const resposta = (respostas[numeroPergunta].querySelector(respostaSelecionada) || {}).value;

    if (resposta === perguntaAtual.respostaCorreta) {
      acertos++;
    }
  });

  resultadoContainer.innerHTML = `Você acertou ${acertos} de ${perguntas.length} perguntas!`;
}

submitButton.addEventListener('click', mostrarResultado);

criarQuiz();

