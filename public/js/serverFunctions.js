//Project Files
import * as data from "../../data/data.js";

//Modules and packages
import fs from "fs";

export function initializeCalendarData() {
  var calendarData = [];
  for (var i = data.calendarStart; i < data.calendarEnd + 1; i++) {
    //create a year object
    var key = i;
    var dayStart = data.dayNames[new Date(i, 0, 1).getDay()];
    var dayEnd = data.dayNames[new Date(i, 11, 31).getDay()];
    var year = new data.Year(key, dayStart, dayEnd);

    //populate the year object with its months
    for (var j = 0; j < data.monthNames.length; j++) {
      //TODO: Check for leap year on every February
      var startDate = data.dayNames[new Date(i, j, 1).getDay()];
      var endDate = data.dayNames[new Date(i, j, data.numDays[j]).getDay()];
      var newMonth = new data.Month(
        data.monthNames[j],
        startDate,
        endDate,
        data.numDays[j]
      );
      year.month.push(newMonth);
    }
    calendarData.push(year);
  }
  return calendarData;
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Returns the index of the year passed in with index 0 being 2020
export function getCurrentYearIndex(year) {
  return year - data.calendarStart;
}

export function generateDayLayout(calendarData, yearIndex, currMonth) {
  var totalSlots = 42;
  var daysPrevMonth;
  var dayLayout = []; //format: prevMonth, currMonth, nextMonth

  //get the amount of days needed to show from the previous month
  for (var i = 0; i < data.dayNames.length; i++) {
    if (
      data.dayNames[i] === calendarData[yearIndex].month[currMonth].startDate
    ) {
      daysPrevMonth = i;
    }
  }
  dayLayout[0] = daysPrevMonth;

  //get current number of days in the month
  dayLayout[1] = calendarData[yearIndex].month[currMonth].numDays;

  //get amount of days needed to show from the next month
  dayLayout[2] = totalSlots - dayLayout[0] - dayLayout[1];
  console.log(dayLayout); //DEBUG STATEMENT

  return dayLayout;
}

export function eDayLayout(calendarData, currMonth) {
  var totalSlots = 42;
  var daysPrevMonth = 0;
  var dayLayout = []; //format: prevMonth, currMonth, nextMonth

  //get amount of days needed to show from the previous month
  for (var i = 0; i < dayNames.length; i++) {
    if (dayNames[i] === calendarData.month[currMonth].startDate) {
      daysPrevMonth = i;
    }
  }
  dayLayout[0] = daysPrevMonth;
  console.log("days shown from previous month: " + daysPrevMonth);
  console.log(dayNames.length);

  //get current month number of days
  dayLayout[1] = calendarData.month[currMonth].numDays;

  //get amount of days needed to show from the next month
  dayLayout[2] =
    totalSlots - daysPrevMonth - calendarData.month[currMonth].numDays;

  //return array
  return dayLayout;
}
