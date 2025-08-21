export default (year, month) => {
  const result = [];
  
  const firstWeekDayAtMonth = new Date(year, month, 1).getDay();

  // если текщий месяц начинается не с воскресения, то пушим последние дни предидущего месяца
  if (firstWeekDayAtMonth !== 0) {
    const maxDaysInPrevMonth = new Date(year, month, 0).getDate();
    let localMonth = month - 1;
    let localYear = year;

    if (localMonth < 0) {
      localMonth = 11;
      localYear -= 1;
    }

    for (let i = 0; i < firstWeekDayAtMonth; i++) {
      result.push({
        day: maxDaysInPrevMonth - firstWeekDayAtMonth + i + 1,
        month: localMonth,
        year: localYear,
      });
    }
  }

  const maxDaysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  
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