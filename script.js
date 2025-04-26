const form = document.getElementById('testForm');
const modal = document.getElementById('nameModal');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  modal.style.display = 'flex';
});

function generateResult() {
  const yourName = document.getElementById('yourName').value.trim();
  const prisonerName = document.getElementById('prisonerName').value.trim();

  if (yourName && prisonerName) {
    modal.style.display = 'none';
    form.style.display = 'none';
    resultDiv.classList.remove('hidden');

    resultDiv.innerHTML = `
      <h2>Результат теста</h2>
      <p><strong>1.</strong> &lt;@${yourName}&gt;</p>
      <p><strong>2.</strong> ${prisonerName}</p>
      <p><strong>3.</strong> Тест на стабильность и депрессию от GPT</p>

      <h3>Медицинское заключение:</h3>
      <p>У заключённого выявлены признаки нарушенного режима сна и питания, однако в целом психоэмоциональное состояние стабильное и позитивное. Жалоб на бессонницу и тревожность нет. Контроль за режимом питания и дня частичный. Мотивация к изменению образа жизни снижена. Показаний к экстренному вмешательству нет, однако рекомендуется наблюдение и профилактическая работа по стабилизации режима.</p>

      <h3>Врачебное заключение:</h3>
      <p>Психоэмоциональное состояние — удовлетворительное. Признаки тяжёлых депрессивных расстройств отсутствуют. Имеются отдельные элементы нарушений саморегуляции сна и питания. Снижение мотивационной активности связано с социальной дезадаптацией. Заключённому рекомендованы профилактические консультации и составление индивидуального плана корректировки режима дня.</p>
    `;
  }
}
