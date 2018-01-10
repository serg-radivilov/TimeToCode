import React, {Component} from 'react';
import {connect} from 'react-redux';

import onResize from './onresize'; // Донамика странички
import returnDate from './returnDate'; // Вывод даты через двоиточие
import returnTime from './returnTime'; // Вывод числа на таймере по формулам в функции
import timer from './timer'; // Сам таймер
import './style/index.css';

class App extends Component {
  constructor(props, state) {
    super(props, state);

    const appData = this.props.appData;

    this.state = {
      startTimer: false, // Состояние таймера
      time: 0, // Число на таймере в секундах
      totalLeftTime: appData.totalLeftTime,
      penaltyTime: appData.penaltyTime,
      extraTime: appData.extraTime,
      totalTime: appData.totalTime,
      passedTime: appData.passedTime,
      leftTime: appData.leftTime,
    }
  }

  componentDidMount() {
    // Динамическое отображение странички
    onResize(this.refs);
    window.addEventListener('resize', () => onResize(this.refs))
  }

  render() {
    return (
      <div className="main-container" ref="mainContainer">

        <div className="app-container">
          <div className="container">
            <div className="number-container">
              <div className="text-info">Штрафное время</div>
              <div className="number-time">{returnTime(this.state.penaltyTime)}</div>
            </div>
            <div className="today-date">{returnDate(new Date())}</div>
            <div className="number-container">
              <div className="text-info">Дополнительное время</div>
              <div className="number-time">{returnTime(this.state.extraTime)}</div>
            </div>
          </div>

          <div className="timer">{returnTime(this.state.passedTime)}</div>

          <div className="container">
            <div className="number-container">
              <div className="number-time">{returnTime(this.state.totalTime)}</div>
              <div className="text-info">Общее время кода</div>
            </div>
            <button className="btn-timer" onClick={timer.bind(this)}>Time to Code</button>
            <div className="number-container">
              <div className="number-time">{returnTime(this.state.leftTime)}</div>
              <div className="text-info">Осталось на сегодня</div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  state => ({
    appData: state.appData
  })
)(App)