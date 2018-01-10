/**
 * Переводит секунды для таймера в минуты и часы черед двоиточие
 * @param time само время в секундах
 * @returns {string} выводит готовую страку
 */
export default function (time) {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor((time - (hours * 60 * 60)) / 60);
  const seconds = time - ((hours * 60 * 60) + (minutes * 60));

  const fixedHours = (String(hours).length === 1) ? `0${hours}` : hours;
  const fixedMinutes = (String(minutes).length === 1) ? `0${minutes}` : minutes;
  const fixedSeconds = (String(seconds).length === 1) ? `0${seconds}` : seconds;

  return `${fixedHours}:${fixedMinutes}:${fixedSeconds}`
}