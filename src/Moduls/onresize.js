/**
 *  Функция автоматической динамики странички в зависимости от размера рабочей области окна
 */
export default function (refs) {
  const minSize = (window.innerHeight < window.innerWidth / 1.5) ? window.innerHeight : window.innerWidth / 1.5;
  const fixedMinSize = (minSize > 300) ? minSize : 300;

  refs.mainContainer.style.height = window.innerHeight + 'px';
  refs.mainContainer.querySelector('.timer').style.width = fixedMinSize / 0.73 + 'px';
  refs.mainContainer.querySelector('.timer').style.fontSize = fixedMinSize / 2.5 + 'px';
  refs.mainContainer.querySelector('.today-date').style.fontSize = fixedMinSize / 16 + 'px';
  refs.mainContainer.querySelector('.btn-timer').style.width = fixedMinSize / 2.5 + 'px';
  refs.mainContainer.querySelector('.btn-timer').style.height = fixedMinSize / 12 + 'px';
  refs.mainContainer.querySelector('.btn-timer').style.fontSize = fixedMinSize / 26 + 'px';
  refs.mainContainer.querySelectorAll('.container')[1].style.bottom = fixedMinSize / 50 + 'px';

  for (let element of refs.mainContainer.querySelectorAll('.number-container')) {
    element.style.width = refs.mainContainer.querySelector('.timer').clientWidth / 3 + 'px';
  }

  for (let element of refs.mainContainer.querySelectorAll('.text-info')) {
    element.style.fontSize = fixedMinSize / 30 + 'px';
  }

  for (let element of refs.mainContainer.querySelectorAll('.number-time')) {
    element.style.fontSize = fixedMinSize / 18 + 'px';
  }
}