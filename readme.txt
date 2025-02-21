TODO: 
- Update how directories are accessed using __dirname so the project can function no matter what directories come before the project directories

- Cannot use fs module on any functions that are accessed by the front end. That means that Calendar data for structuring the year needs to be loaded into an object and accessible without reading from the file system

- Instead of trying to stream in a file or make an API call to get information about formatting the calendar maybe I should gather the data needed dynamically by using a similar method to how i aquire the data for the JSON creation in the first place.
    - This might be faster than trying to load a file or make an API call each time and may actually allow for (almost) infinite year scrolling in both directions





Hold:
- Should move the GenerateDayLayout to a client side function since its primary goal is generating the values in order to render the calendar visually to the client. It doesnt handle any backend information except the calendar data JSON
    - That data seems to just relate to grabbing the start and end dates for each month as well as the month name itself

    NOTE: Holding this since GenerateDayLayout is called on the server only once when the page is initially opened