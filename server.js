import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

app.listen(port, ()=> {
    console.log(`Server running on port ${port}.`);

    //check if the data file for this year exists
    //if  it doesnt create it
    checkData();
    
})

app.get('/', (req,res) => {
    const data = fs.readFileSync('./data/2025data.json')
    var calendarData =  JSON.parse(data);
    //res.send("Server Online");
    res.render('main.ejs', {calendarData: calendarData});
    console.log(calendarData)
    console.log('\n');
    console.log(calendarData.month[0].startDate);
    console.log('\n');
    console.log(JSON.stringify(calendarData.month[1]));
    
})

process.on('SIGINT', () => {
    console.log(`Server closed at ${port}`);
    deleteFile(); //TEMP
})







//////////////////////////////////
//Functions
/////////////////////////////////

function deleteFile() {
    const dateToday = new Date();
    const currentYear = dateToday.getFullYear().toString();
    fs.rm(`./data/${currentYear}data.json`)
}


function checkData() {
    const dateToday = new Date();
    const currentYear = dateToday.getFullYear().toString();

    //check if the JSON for the current year exists
    if (fs.existsSync(`./data/${currentYear}data.json`)) {
        //Put the object into calendar data storage
        console.log('JSON for current year is located... Loading');
    } 
    else {
        //If it doesn't exist, create it
        createJsonForYear(currentYear,);

    }
}

function createJsonForYear(currentYear) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function Month(monthName, start, end, numDays) {
        this.monthName = monthName;
        this.numDays = numDays;
        this.startDate = start;
        this.endDate = end;
        this.events = [];
    }

    //Create the file
    fs.writeFile(`./data/${currentYear}data.json`, '', (err) => {
        if (err) {
            console.error(`An Error Occured: `, err);
        } 
        else {
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
