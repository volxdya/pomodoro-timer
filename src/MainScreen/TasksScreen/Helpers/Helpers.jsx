import './Helpers.css';
export function Helpers() {
  return (
    <>
      <h2 className="mx-3 mb-3">Ура! Теперь можно начать работать:</h2>
      <ul>
        <li className="helperPomodoro">
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className="helperPomodoro">Запустите таймер («помидор»)</li>
        <li className="helperPomodoro">
          Работайте пока «помидор» не прозвонит
        </li>
        <li className="helperPomodoro">
          Сделайте короткий перерыв (3-5 минут)
        </li>
        <li className="helperPomodoro">
          Продолжайте работать «помидор» за «помидором», пока задача не будут
          выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>
    </>
  );
}
