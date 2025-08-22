const getMaxDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate()
}

const getFirstWeekDayInMonth = (year, month) => {
  return new Date(year, month, 1).getDay()
}

export default (year, month) => {
  const result = [];

  const firstWeekDayInMonth = getFirstWeekDayInMonth(year, month);

  // если текщий месяц начинается не с воскресения, то пушим последние дни предыдущего месяца
  if (firstWeekDayInMonth !== 0) {
    const maxDaysInPrevMonth = getMaxDaysInMonth(year, month);
    let localMonth = month - 1;
    let localYear = year;

    if (localMonth < 0) {
      localMonth = 11;
      localYear -= 1;
    }

    for (let i = 0; i < firstWeekDayInMonth; i++) {
      result.push({
        day: maxDaysInPrevMonth - firstWeekDayInMonth + i + 1,
        month: localMonth,
        year: localYear,
      });
    }
  }

  const maxDaysInCurrentMonth = getMaxDaysInMonth(year, month + 1);

  for (let i = 0; i < maxDaysInCurrentMonth; i++) {
    result.push({
      day: i + 1,
      month: month,
      year,
    });
  }

  // если текущий месяц заканчивается не субботой, то пушим первые дни следующего месяца
  const daysLength = result.length;

  if (daysLength % 7) {
    let localMonth = month + 1;
    let localYear = year;

    if (localMonth > 11) {
      localMonth = 0;
      localYear += 1;
    }

    for (let i = 0; i < 7 - (daysLength % 7); i++) {
      result.push({
        day: i + 1,
        month: localMonth,
        year: localYear,
      });
    }
  }

  return result;
};