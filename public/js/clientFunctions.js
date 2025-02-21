//Project Files
import * as data from '../../data/data.js'


export function testLog() {
  console.log("Client Functions are successfully linked");
}

export function changeMonth(month, button) {
  var monthIndex = data.monthNames.indexOf(month);
  if (button === "month-select-left") {
    monthIndex = monthIndex - 1;
  } else if (button === "month-select-right") {
    monthIndex = monthIndex + 1;
  }

  //Update Month Title
  document.querySelector('.month-title').textContent = monthNames[monthIndex];

  //update Calendar Days
  updateCalendarDays(monthIndex);
}

export function updateCalendarDays(month) {
  const dayContainer = document.querySelector(".calendar-day-container");
  dayContainer.innerHTML = "";

}
