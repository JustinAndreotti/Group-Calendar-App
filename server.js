//project files
import * as serverFunctions from "./public/js/serverFunctions.js";
import * as data from "./data/data.js";

//modules and packages
import express from "express";
import fs from "fs";

const app = express();
const port = 3000;
var calendarData = serverFunctions.initializeCalendarData();

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use("/public", express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

app.get("/", (req, res) => {
  //get the current month and day for initial calendar generation
  var currDate = new Date();
  var currMonth = currDate.getMonth();
  var currDay = currDate.getDay();
  var currYear = currDate.getFullYear();
  //send over the calendarData, currentMonth, currentDay, and dayLayout for initial calendar generation
  res.render("main.ejs", {
    calendarData: calendarData,
    dayLayout: serverFunctions.generateDayLayout(
      calendarData,
      serverFunctions.getCurrentYearIndex(currYear),
      currMonth
    ),
    currMonth: currMonth,
    currDay: currDay,
    currYearIndex: serverFunctions.getCurrentYearIndex(currYear),
  });
});

process.on("SIGINT", () => {
  console.log(`Server closed at ${port}`);
});
