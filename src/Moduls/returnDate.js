/**
 * Выврд дады строкой через двоиточие
 * @param newDate если undefined то выведет сегодняшнюю дату, если нет то получает дату в параметром
 * @returns {string} выводит готовую страку
 */
export default function (newDate) {
  const date = (newDate === undefined) ? new Date() : newDate;
  const year = date.getFullYear();
  const month = (String(date.getMonth() + 1).length === 1) ? `0${String(date.getMonth() + 1)}` : date.getMonth() + 1;
  const day = date.getDate();

  return `${day}.${month}.${year}`;
}