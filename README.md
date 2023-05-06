# Nord Finance Task

This application has a feature to show Star Wars People in a table with pagination, searching and sorting support. You can have a live demo [here](https://majestic-sherbet-0b7696.netlify.app/)

## Features

1. Show the list people from https://swapi.dev/api/people/ in a table
2. The table is paginated with 10 records in a single page
3. The table is sortable and searchable
4. Each entry includes all the attributes from the API response
5. Each entry also have an icon as follwing

- If a droid, showing the Font Awesome Android icon
- If a human, showing the Font Awesome user circle icon
- If any other species, showing the Font Awesome question mark

6. Showing error state if the API is down
7. Search (by name)
8. Sorting (for name column)
9. Showing empty state if there's no results from the search API
10. Showing cards containing counts for total results, total droid, total human (same way for all types of species)

## Tech Stack

1. HTML & CSS
2. React.JS
3. Swr: To fetch data with caching (Here I can also use React query but It has a large bundle size with compare to SWR, Since I need to only caching the API data therefor I use SWR)
4. Jest
5. React tesing library

## Code Coverage

Total code coverage with unit testing: 93%

## Requirements to run application on local

1. In Machine, must have installed Node Package Manager(npm)

## How to run application on local

In project directory,

1. Run `npm install` script
2. Run `npm start` script, It runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to run test cases on local

In project directory,

1. Run `npm run test` script
