
export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const calendarStart = 2020;
export const calendarEnd = new Date().getFullYear() + 10;
export const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export var calendarData;
export var yearIndex; 
export var monthIndex;
export var currentDay;

//tests
export function printVariables() {
  console.log("year index: " + yearIndex);
  console.log("current Month: " + monthIndex);
  console.log("current day: " + currentDay);
  console.log(calendarData);
}


//Initializations
export function initializeClientSideVariables(data, year, month, day) {
  calendarData = data;
  yearIndex = year;
  monthIndex = month;
  currentDay = day;
}

//Event Handlers
export function monthClickHelper(event) {
  console.log("inside monthClickHelper");
  var button = event.target.getAttribute('class');
  console.log("button: " + button);
  changeMonth(button);
}

//Getters

//setters

//Functions
export function changeMonth(button) {
  if (button === "month-select-left") {
    monthIndex--;
    console.log(monthIndex);
  } else if (button === "month-select-right") {
    monthIndex++;
    console.log(monthIndex);
  }
  
  console.log("Inside changeMonth: ");
  console.log("yearIndex: " + yearIndex);
  console.log("monthIndex: " + monthIndex);

  //Update Month Title
  document.querySelector(".month-title").textContent = monthNames[monthIndex];

  //update Calendar Days
  updateCalendarDays(calendarData, yearIndex, monthIndex);
}

export function updateCalendarDays(calendarData, yearIndex, monthIndex) {
  const dayContainer = document.querySelector(".calendar-day-container");
  dayContainer.innerHTML = "";
  var dayLayout = generateDayLayout(calendarData, yearIndex, monthIndex)
  //load up the days from the previous month
    for (var i = 0; i < dayLayout[0]; i++) {
      var prevDays = numDays[monthIndex - 1] - (dayLayout[0] - 1);
      const newDiv = document.createElement("div");
      const newp = document.createElement("p");
      newp.classList.add('day-num-alt');
      newp.textContent = prevDays + i;
      newDiv.classList.add('day-box-prev-month');
      newDiv.appendChild(newp);
      dayContainer.appendChild(newDiv);
    }
  //load up the days from the current month
  for (var i = 0; i < dayLayout[1]; i++) {
    var currDays = numDays[monthIndex] - (dayLayout[1] - 1);
    const newDiv = document.createElement("div");
    const newp = document.createElement("p");
    newp.classList.add('day-num-curr');
    newp.textContent = currDays + i;
    newDiv.classList.add('day-box-curr-month');
    newDiv.appendChild(newp);
    dayContainer.appendChild(newDiv);
  }
  //load up the days for next month
  for (var i = 0; i < dayLayout[2]; i++) {
    var nextDays = 1;
    const newDiv = document.createElement("div");
    const newp = document.createElement("p");
    newp.classList.add('day-num-alt');
    newp.textContent = nextDays + i;
    newDiv.classList.add('day-box-next-month');
    newDiv.appendChild(newp);
    dayContainer.appendChild(newDiv);
  }
}


export function generateDayLayout(calendarData, yearIndex, monthIndex) {
  var totalSlots = 42;
  var daysPrevMonth;
  var dayLayout = []; //format: prevMonth, currMonth, nextMonth

  //get the amount of days needed to show from the previous month
  for (var i = 0; i < dayNames.length; i++) {
    if (
      dayNames[i] === calendarData[yearIndex].month[monthIndex].startDate
    ) {
      daysPrevMonth = i;
    }
  }
  dayLayout[0] = daysPrevMonth;

  //get current number of days in the month
  dayLayout[1] = calendarData[yearIndex].month[monthIndex].numDays;

  //get amount of days needed to show from the next month
  dayLayout[2] = totalSlots - dayLayout[0] - dayLayout[1];
  console.log(dayLayout); //DEBUG STATEMENT

  return dayLayout;
}

