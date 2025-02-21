TODO: 
- Update how directories are accessed using __dirname so the project can function no matter what directories come before the project directories






Hold:
- Should move the GenerateDayLayout to a client side function since its primary goal is generating the values in order to render the calendar visually to the client. It doesnt handle any backend information except the calendar data JSON
    - That data seems to just relate to grabbing the start and end dates for each month as well as the month name itself

    NOTE: Holding this since GenerateDayLayout is called on the server only once when the page is initially opened