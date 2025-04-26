const tests = {
  adequacy: {
    name: "Тест на адекватность",
    questions: [
      "Как вы обычно реагируете на конфликтные ситуации?",
      "Что для вас важнее — справедливость или личная выгода?",
      "Способны ли вы признать свою ошибку перед другими?",
      "Насколько важно для вас следовать установленным правилам?",
      "Как вы относитесь к командной работе?"
    ],
    answers: [
      ["Спокойно", "Агрессивно", "Избегаю", "Провоцирую"],
      ["Справедливость", "Личная выгода", "Зависит от ситуации", "Ничего не важно"],
      ["Да", "Нет", "Затрудняюсь", "Скрываю"],
      ["Очень важно", "Малозначимо", "Зависит от ситуации", "Не важно"],
      ["Положительно", "Нейтрально", "Негативно", "Избегаю"]
    ],
    results: [
      { min: 5, max: 8, text: "Низкая адекватность. Требуется серьезная работа над собой." },
      { min: 9, max: 12, text: "Средний уровень адекватности. Иногда требуется контроль за эмоциями." },
      { min: 13, max: 15, text: "Высокая адекватность. Хорошая саморегуляция." }
    ]
  },
  depression: {
    name: "Тест на уровень депрессии",
    questions: [
      "Как часто вы чувствуете усталость без причины?",
      "Трудно ли вам радоваться тому, что радовало раньше?",
      "Есть ли у вас нарушения сна?",
      "Часто ли вы испытываете чувство вины или никчемности?",
      "Как вы оцениваете свое настроение в течение дня?"
    ],
    answers: [
      ["Очень редко", "Иногда", "Часто", "Постоянно"],
      ["Нет", "Иногда", "Часто", "Постоянно"],
      ["Нет", "Иногда", "Часто", "Постоянно"],
      ["Нет", "Иногда", "Часто", "Постоянно"],
      ["Хорошее", "Среднее", "Плохое", "Очень плохое"]
    ],
    results: [
      { min: 5, max: 8, text: "Высокая вероятность депрессивного состояния. Требуется помощь специалистов." },
      { min: 9, max: 12, text: "Возможны начальные признаки депрессивных состояний." },
      { min: 13, max: 15, text: "Нет признаков депрессии. Эмоционально устойчивы." }
    ]
  }
};

let currentTest = null;
let score = 0;

function startTest(testKey) {
  currentTest = tests[testKey];
  document.getElementById('test-selection').classList.add('hidden');
  document.getElementById('test').classList.remove('hidden');

  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = "";

  currentTest.questions.forEach((question, index) => {
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `<p>${index + 1}. ${question}</p>`;

    currentTest.answers[index].forEach((answer, idx) => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${idx + 1}" required> ${answer}
        </label><br>
      `;
    });

    questionsDiv.appendChild(div);
  });

  document.getElementById('testForm').onsubmit = function(event) {
    event.preventDefault();
    calculateResult();
  };
}

function calculateResult() {
  score = 0;
  for (let i = 0; i < currentTest.questions.length; i++) {
    const radios = document.getElementsByName(`q${i}`);
    for (const radio of radios) {
      if (radio.checked) {
        score += parseInt(radio.value);
      }
    }
  }
  showResult();
}

function showResult() {
  document.getElementById('test').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  let resultText = "";
  for (const res of currentTest.results) {
    if (score >= res.min && score <= res.max) {
      resultText = res.text;
      break;
    }
  }

  document.getElementById('score').innerText = `Вы набрали ${score} баллов. ${resultText}`;
  document.getElementById('customResult').value = resultText;
}

function editResult() {
  const editedText = document.getElementById('customResult').value;
  document.getElementById('score').innerText = `Вы набрали ${score} баллов. ${editedText}`;
}

function resetTest() {
  document.getElementById('result').classList.add('hidden');
  document.getElementById('test-selection').classList.remove('hidden');
}
