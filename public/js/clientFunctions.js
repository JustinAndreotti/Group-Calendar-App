const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
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
const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function testLog() {
  console.log("Client Functions are successfully linked");
}

export function changeMonth(month, button) {
  var monthIndex = monthNames.indexOf(month);
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
