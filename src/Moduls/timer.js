import returnDate from './returnDate'; // Вывод даты через двоиточие

/**
 * Таймер, при включении начинает шаманить над всеми полями
 * - Добавляет время в самом таймере,
 * - Отнимает время в "Осталось на сегодня", если уже 0 то добавляет это время в "Дополнительное время"
 * - Добавляет время в "Общее время кода"
 * - Так же если есть "Штраф" то сначала гасит его до 0 и только потом начинает добавлять время в "Доп. время"
 * Так же это все стразу сохраняет в локал стору, каждой итерацией интервала
 * И меняет кнопку, если запустить таймер то кнопка поменяться на "Pause to Rest", а если пауза то "Time to Code"
 */
export default function (event) {
  this.state.startTimer = (!this.state.startTimer) ? true : false;

  if (this.state.startTimer) {
    event.target.innerText = 'Pause to Rest';
    const addTimer = setInterval(() => {
      if (!this.state.startTimer) {
        clearInterval(addTimer);
      }
      else {
        const totalLeftTime = this.state.totalLeftTime;
        const leftTime = this.state.leftTime;
        const passedTime = this.state.passedTime + 1;
        const penaltyTime = this.state.penaltyTime;
        const extraTime = this.state.extraTime;
        const totalTime = this.state.totalTime + 1;
        const time = this.state.time;
        const dataBase = JSON.parse(localStorage.getItem('TimeToCode')).date;
        dataBase[returnDate()] = passedTime;

        localStorage.setItem('TimeToCode', JSON.stringify({
          penaltyTime: (leftTime === 0) ? (penaltyTime > 0) ? penaltyTime - 1 : 0 : penaltyTime,
          extraTime: (penaltyTime === 0 && leftTime === 0) ? extraTime + 1: extraTime,
          totalTime: totalTime,
          date: dataBase
        }));

        this.setState({
          penaltyTime: (leftTime === 0) ? (penaltyTime > 0) ? penaltyTime - 1 : 0 : penaltyTime,
          extraTime: (penaltyTime === 0 && leftTime === 0) ? extraTime + 1: extraTime,
          totalTime: totalTime,
          passedTime: passedTime,
          leftTime: (totalLeftTime - passedTime > 0) ? totalLeftTime - passedTime : 0,
          time: time + 1
        });
      }
    }, 1);
  }
  else {
    event.target.innerText = 'Time to Code';
  }
}