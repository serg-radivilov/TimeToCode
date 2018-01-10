import returnDate from '../returnDate'; // Вывод даты через двоиточие

const initialState = {
  totalLeftTime: 21600, // Время в секундах "Осталось на сегодня" default: 6 часов
  penaltyTime: 0, // Штрафное время
  extraTime: 0, // Дополнительное время
  totalTime: 0, // Всего время кода
  passedTime: 0, // Время на таймере (зависит от количества времени кода в этот день)
  leftTime: 0 // Осталось на сегодня
};
const getLocalStorage = localStorage.getItem('TimeToCode');
const setLocalStorage = {
  penaltyTime: 0,
  extraTime: 0,
  totalTime: 0,
  date: {[returnDate()]: initialState.passedTime} // База данных с временем кода на каждый день
};

// Тут лютый трындец (мне впадлу структуризировать тут все =) да да я ленивая жопа =) )
// 1 условие это если первое посещение странички, то создает базу данных в локал сторе
if (getLocalStorage === null || getLocalStorage === undefined) {
  localStorage.setItem('TimeToCode', JSON.stringify(setLocalStorage));
}
// Вообщем проверяет преведущие дни, если плотно провтыкать то накиет кучу штрафов, но
// если было дополнительное время то спишет с него на штраф и остаток выведет в "Штрафное время"
else if (JSON.parse(getLocalStorage).date[returnDate()] === undefined) {
  const dataBase = JSON.parse(localStorage.getItem('TimeToCode')).date;
  const checkDateBase = new Date();

  for (let i = 1; i < 720; i++) {
    checkDateBase.setDate(checkDateBase.getDate() - 1);

    if (dataBase[returnDate(checkDateBase)] !== undefined) {
      const localExtraTime = JSON.parse(getLocalStorage).extraTime;
      const localPenaltyTime = JSON.parse(getLocalStorage).penaltyTime;
      const penaltyTime = initialState.totalLeftTime * i - dataBase[returnDate(checkDateBase)];
      const checkPenaltyTime = (penaltyTime > 0) ? penaltyTime + localPenaltyTime : 0;
      const returnExtraTime = (localExtraTime > checkPenaltyTime) ? localExtraTime - checkPenaltyTime : 0;
      const returnPenaltyTime = (localExtraTime > checkPenaltyTime) ? 0 : checkPenaltyTime - localExtraTime;

      initialState.penaltyTime = returnPenaltyTime;
      initialState.extraTime = returnExtraTime;
      initialState.totalTime = JSON.parse(localStorage.getItem('TimeToCode')).totalTime;

      setLocalStorage.penaltyTime = returnPenaltyTime;
      setLocalStorage.extraTime = returnExtraTime;
      setLocalStorage.totalTime = JSON.parse(localStorage.getItem('TimeToCode')).totalTime;
      dataBase[returnDate()] = initialState.passedTime;
      setLocalStorage.date = dataBase;

      localStorage.setItem('TimeToCode', JSON.stringify(setLocalStorage));

      break;
    }
  }
}
// Если взод в тот же день, то просто получает данные из локал сторы
else {
  initialState.penaltyTime = JSON.parse(getLocalStorage).penaltyTime;
  initialState.extraTime = JSON.parse(getLocalStorage).extraTime;
  initialState.totalTime = JSON.parse(localStorage.getItem('TimeToCode')).totalTime;
  initialState.passedTime = JSON.parse(getLocalStorage).date[returnDate()];
}

// Вычисляет оставшиеся время кода на сегодня
initialState.leftTime = (initialState.totalLeftTime - initialState.passedTime > 0) ?
  initialState.totalLeftTime - initialState.passedTime : 0;

// Redux
export default function appData(state = initialState, actions) {
  if (actions.type === 'GET_DATA') return state = actions.appData;

  return state;
}