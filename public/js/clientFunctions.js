// import * as serverFunctions from 'serverFunctions.js'

export function testLog() {
  console.log("Client Functions are successfully linked");
}


export function changeMonth(month, button) {
    //generateDayLayout(month)

    
    if (button === 'month-select-left') {
      //monthIncrement = -1;
    }
    else if (button === 'month-select-right') {
      //monthIncrement = 1;
    }

    console.log("Button clicked: " + button);
    console.log("Month: " + month);
}
