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

export const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const calendarStart = 2020;
export const calendarEnd = new Date().getFullYear() + 10;

export function Month(monthName, start, end, numDays) {
    this.monthName = monthName;
    this.numDays = numDays;
    this.startDate = start;
    this.endDate = end;
  }

export function Year(key, start, end) {
  this.key = key;
  this.startDate = start;
  this.endDate = end;
  this.month = [];
}