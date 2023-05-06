# Nord Finance Task

This application has a feature to show Star Wars People in a table with pagination, searching, and sorting support. You can have a live demo [here](https://majestic-sherbet-0b7696.netlify.app/)

## Features

1. Show the list of people from https://swapi.dev/api/people/ in a table.
2. The table is paginated, with 10 records on a single page.
3. The table is sortable and searchable.
4. Each entry includes all the attributes from the API response.
5. Each entry also has an icon, as follows:

- If a droid, show the Font Awesome Android icon.
- If a human, show the Font Awesome user circle icon.
- If any other species, showing the Font Awesome question mark,

6. Showing an error state if the API is down
7. Search (by name)
8. Sorting (for the name column)
9. Showing an empty state if there are no results from the search API
10. Showing cards containing counts for total results, total droid, and total human (the same way for all types of species)

## Tech Stack

1. HTML & CSS
2. React.JS
3. Swr: To fetch data with caching (here I can also use React query, but it has a large bundle size compared to SWR. Since I need to only cache the API data, I use SWR).
4. Jest
5. React tesing library
6. Eslint: To manage the code quality

## Code Coverage

Total code coverage with unit testing: 93%

## Requirements to run the application on local

1. In the machine, you must have installed Node Package Manager (npm).

## How to run application on local

In the project directory,

1. Run `npm install` script.
2. Run `npm start` script. It runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to run test cases on local

In the project directory,

1. Run `npm run test` script.

## Extra

1. To show loading, error, and 'no data found' states with an icon, I created a `useLoader` hook. We can use this hook in the entire application.
2. To detect outside click from the element, I created a `useOutsideClickListener` hook.
3. As of now, I created a table using HTML and CSS (as written in the task requirement), but we can also use a table from `react-table` or any design component library or framework like `Material UI`
