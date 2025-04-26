
const tests = {
  adequacy: {
    questions: [
      "Как вы обычно реагируете на конфликтные ситуации?",
      "Что для вас важнее — справедливость или личная выгода?",
      "Способны ли вы признать свою ошибку перед другими?",
      "Насколько важно для вас следовать установленным правилам?",
      "Как вы относитесь к командной работе?"
    ],
    result: function(score) {
      if (score <= 8) return "Низкая адекватность. Требуется серьёзная работа над собой.";
      if (score <= 12) return "Средний уровень адекватности. Иногда требуется контроль за эмоциями.";
      return "Высокая адекватность. Хорошая саморегуляция.";
    }
  },
  depression: {
    questions: [
      "Как часто вы чувствуете усталость без видимой причины?",
      "Насколько часто у вас плохое настроение?",
      "Вы ощущаете потерю интереса к любимым делам?",
      "Вы часто испытываете чувство вины или бесполезности?",
      "Как часто вы чувствуете себя одиноким?"
    ],
    result: function(score) {
      if (score <= 8) return "Высокая вероятность депрессивного состояния. Требуется помощь специалиста.";
      if (score <= 12) return "Возможны начальные признаки депрессивных состояний.";
      return "Нет признаков депрессии. Эмоционально устойчивы.";
    }
  }
};

let currentTest = null;
let totalScore = 0;

function startTest(testName) {
  currentTest = tests[testName];
  document.querySelector(".test-selection").classList.add("hidden");
  document.getElementById("testForm").classList.remove("hidden");
  renderQuestions();
}

function renderQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = "";
  currentTest.questions.forEach((question, index) => {
    const div = document.createElement("div");
    div.innerHTML = \`
      <p>\${index + 1}. \${question}</p>
      <label><input type="radio" name="q\${index}" value="1" required> Очень редко</label>
      <label><input type="radio" name="q\${index}" value="2"> Иногда</label>
      <label><input type="radio" name="q\${index}" value="3"> Часто</label>
      <label><input type="radio" name="q\${index}" value="4"> Постоянно</label>
    \`;
    container.appendChild(div);
  });

  document.getElementById("testForm").onsubmit = function(e) {
    e.preventDefault();
    calculateScore();
  };
}

function calculateScore() {
  totalScore = 0;
  for (let i = 0; i < currentTest.questions.length; i++) {
    const answer = document.querySelector(\`input[name="q\${i}"]:checked\`);
    if (answer) totalScore += parseInt(answer.value);
  }
  document.getElementById("testForm").classList.add("hidden");
  document.getElementById("resultSection").classList.remove("hidden");
}

function finalizeResult() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const examiner = document.getElementById("examiner").value;
  const baseResult = currentTest.result(totalScore);

  const resultText = \`
    Имя: \${firstName}<br>
    Фамилия: \${lastName}<br>
    Проводивший тест: \${examiner}<br>
    Баллы: \${totalScore}<br>
    Вывод: \${baseResult}
  \`;

  document.getElementById("resultText").innerHTML = resultText;
}

function editResult() {
  const editable = prompt("Введите исправленный текст:");
  if (editable !== null) {
    document.getElementById("resultText").innerHTML = editable.replace(/\n/g, "<br>");
  }
}
