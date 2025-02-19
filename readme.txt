TODO: 
- Should move the GenerateDayLayout to a client side function since its primary goal is generating the values in order to render the calendar visually to the client. It doesnt handle any backend information except the calendar data JSON
    - That data seems to just relate to grabbing the start and end dates for each month as well as the month name itself

- I should make it so that the yeardata.JSON is something that contains the data for formatting the actual day-boxes on the Calendar client side. 

- So I should Get rid of the event array in the yeardata.JSON and make the events relate to a separate file that is just an object containing events for a particular user. 