const form = document.getElementById('testForm');
const modal = document.getElementById('nameModal');
const resultDiv = document.getElementById('result');
const generateBtn = document.getElementById('generateBtn');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  modal.style.display = 'flex';
});

generateBtn.addEventListener('click', function() {
  const yourName = document.getElementById('yourName').value.trim();
  const prisonerName = document.getElementById('prisonerName').value.trim();

  if (yourName && prisonerName) {
    modal.style.display = 'none';
    form.style.display = 'none';
    resultDiv.classList.remove('hidden');

    resultDiv.innerHTML = `
      <h2>Результат теста</h2>
      <p><strong>Психолог:</strong> ${yourName}</p>
      <p><strong>Имя заключённого:</strong> ${prisonerName}</p>
      <p><strong>Описание:</strong> Тест на стабильность и депрессию от GPT.</p>
      <div class="report">
        <h3>Медицинское заключение:</h3>
        <p>У заключённого выявлены признаки нарушенного режима сна и питания, однако в целом психоэмоциональное состояние стабильное и позитивное. Жалоб на бессонницу и тревожность нет.</p>
        <h3>Врачебное заключение:</h3>
        <p>Психоэмоциональное состояние — удовлетворительное. Признаков тяжёлых депрессивных расстройств нет. Рекомендовано профилактическое наблюдение.</p>
      </div>
    `;
  }
});
