import express from "express";
import fs from "fs";
import * as serverFunctions from "./public/js/serverFunctions.js";
import * as clientFunctions from "./public/js/clientFunctions.js";

const app = express();
const port = 3000;

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use("/public", express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);

  //check if the data file for this year exists
  //if  it doesnt create it
  serverFunctions.checkData();
});

app.get("/", (req, res) => {
  const data = fs.readFileSync("./data/2025data.json");
  var calendarData = JSON.parse(data);

  //get the current month for calendar generation
  var currMonth = new Date().getMonth();
  //currMonth = monthNames[currMonth];
  console.log("current Month is: " + currMonth);

  res.render("main.ejs", {
    calendarData: calendarData,
    dayLayout: serverFunctions.generateDayLayout(currMonth),
    currMonth: currMonth,
    clientFunctions: clientFunctions,
  });
});

process.on("SIGINT", () => {
  console.log(`Server closed at ${port}`);
});
