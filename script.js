const tests = {
  adequacy: {
    questions: [
      "Как вы реагируете на конфликтные ситуации?",
      "Что для вас важнее?",
      "Можете ли признать свою ошибку?",
      "Насколько важно соблюдать правила?",
      "Как относитесь к командной работе?"
    ],
    answers: [
      ["Спокойно", "Агрессивно", "Избегаю", "Провоцирую"],
      ["Справедливость", "Выгода", "Зависит от ситуации", "Не важно"],
      ["Да", "Нет", "Иногда", "Скрываю"],
      ["Очень важно", "Иногда важно", "Неважно", "Пренебрегаю"],
      ["Положительно", "Нейтрально", "Негативно", "Избегаю"]
    ],
    results: [
      { min: 5, max: 8, text: "Низкая адекватность. Требуется работа над собой." },
      { min: 9, max: 12, text: "Средний уровень. Иногда требуется контроль за эмоциями." },
      { min: 13, max: 15, text: "Высокая адекватность. Хорошая саморегуляция." }
    ]
  },
  depression: {
    questions: [
      "Как часто чувствуете усталость?",
      "Радуют ли вас мелочи?",
      "Есть ли проблемы со сном?",
      "Часто ли чувствуете вину?",
      "Как настроение в течение дня?"
    ],
    answers: [
      ["Редко", "Иногда", "Часто", "Постоянно"],
      ["Да", "Иногда", "Редко", "Вообще нет"],
      ["Нет", "Иногда", "Часто", "Постоянные проблемы"],
      ["Нет", "Иногда", "Часто", "Постоянно"],
      ["Хорошее", "Среднее", "Плохое", "Очень плохое"]
    ],
    results: [
      { min: 5, max: 8, text: "Высокая вероятность депрессии. Нужна помощь специалиста." },
      { min: 9, max: 12, text: "Есть признаки депрессии. Нужно обратить внимание." },
      { min: 13, max: 15, text: "Нет признаков депрессии. Эмоционально устойчивы." }
    ]
  }
};

let currentTest = null;
let score = 0;

function startTest(testName) {
  currentTest = tests[testName];
  score = 0;
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('test').classList.remove('hidden');

  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';

  currentTest.questions.forEach((q, idx) => {
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `<p>${q}</p>`;

    currentTest.answers[idx].forEach((ans, i) => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${idx}" value="${i + 1}" required> ${ans}
        </label><br>
      `;
    });

    questionsDiv.appendChild(div);
  });

  document.getElementById('testForm').onsubmit = function(e) {
    e.preventDefault();
    calculateResult();
  };
}

function calculateResult() {
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
  for (const r of currentTest.results) {
    if (score >= r.min && score <= r.max) {
      resultText = r.text;
      break;
    }
  }

  document.getElementById('score').innerText = `Вы набрали ${score} баллов. ${resultText}`;
  document.getElementById('customResult').value = resultText;
}

function editResult() {
  const edited = document.getElementById('customResult').value;
  document.getElementById('score').innerText = `Вы набрали ${score} баллов. ${edited}`;
}

function resetTest() {
  document.getElementById('result').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
}
