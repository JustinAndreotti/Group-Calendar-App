import fs from "fs";

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

export function deleteFile() {
  const dateToday = new Date();
  const currentYear = dateToday.getFullYear().toString();
  fs.rm(`./data/${currentYear}data.json`);
}

export function checkData() {
  const dateToday = new Date();
  const currentYear = dateToday.getFullYear().toString();

  //check if the JSON for the current year exists
  if (fs.existsSync(`./data/${currentYear}data.json`)) {
    //Put the object into calendar data storage
    console.log("JSON for current year is located... Loading");
  } else {
    //If it doesn't exist, create it
    createJsonForYear(currentYear);
  }
}

export function createJsonForYear(currentYear) {
  function Month(monthName, start, end, numDays) {
    this.monthName = monthName;
    this.numDays = numDays;
    this.startDate = start;
    this.endDate = end;
  }

  //Create the file
  fs.writeFile(`./data/${currentYear}data.json`, "", (err) => {
    if (err) {
      console.error(`An Error Occured: `, err);
    } else {
      console.log(`File: ${currentYear}data.json created successfully`);
    }
  });

  //Create the year object and populate it with data for the given year
  var year = {};
  year.key = currentYear;
  year.dayStart = dayNames[new Date(currentYear, 0, 1).getDay()];
  year.dayEnd = dayNames[new Date(currentYear, 0, 31).getDay()];
  year.month = [];

  for (var i = 0; i < 12; i++) {
    //get start and end date for month "i"
    var startDate = dayNames[new Date(currentYear, i, 1).getDay()];
    var endDate = dayNames[new Date(currentYear, i, numDays[i]).getDay()];
    var newMonth = new Month(monthNames[i], startDate, endDate, numDays[i]);
    year.month.push(newMonth);
  }

  //convert the Data to a JSON format and save it
  var saveData = JSON.stringify(year);
  console.log(saveData);
  fs.writeFile(`./data/${currentYear}data.json`, saveData, () => {});
}

export function generateDayLayout(currMonth) {
  var calendarData = JSON.parse(fs.readFileSync("./data/2025data.json"));
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

export function getCalendarData(year) {
  // turn the JSON for the input year into an object
  var calendarData = JSON.parse(`../data/${year}data.json`);
  console.log(calendarData);

}