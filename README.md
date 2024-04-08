# Tincar

Tincar is a project that I made to simulate a legitimate business that addresses some of the shortcomings I saw on car shopping websites. While you can't use this to buy a car or contact a dealer, its moreso meant to be a tool for car enthusiasts on the market who have an idea of what they want in a car but don't know what's out there that would meet those requirements. Let's say for example someone is in the market and they know they want a sedan from 2007 - 2010 that has a V6 engine and is rear wheel drive. The average car buyer might not think about these things but someone who's excited about cars would, this project is meant to simulate a business that would cater to this niche segment of the used car market. 

<br>
This README goes into the technical aspects of Tincar and some of it's features. To get the full picture and see Tincar for yourself, please visit: https://tincar-c64x.onrender.com/

<br>

## Technology Used
REACT | NODEJS | MONGODB

### Table of Contents
1. Technology <br>
1a. Architecture <br>
Components <br>
1b. Frontend <br>
1c. Backend <br>
1d. Database <br>
2. Features Overview <br>
2a. Home Page <br>
2b. Find A Car Page <br>
2c. Careers Page <br>
2d. Blog Page 

### 1. Technology
**1a. Architecture** <br>
This project follows a component-based architecture, consisting of reusable components and eliminating redundancy thanks to the power of React. The backend follows a traditional monolithic architecture. The backend and frontend exist in the same codebase and the application is deployed as a web service. 

### Components
**1b. Frontend:** The frontend implements the UI using React and renders the website on the client side as a single page application. All pages except the homepage are dynamically populated as content is fetched from the database, especially if a user is logged in. This website also uses an external API: CarQuery, which is a JSON based API with a large vehicle database (find it here: https://www.carqueryapi.com/). 
<br>

**1c. Backend:** The backend is written in NodeJS and the entry point is main.js. The code here establishes a connection to the MongoDB database and establishes various API endpoints for GET and POST operations. These operations give Tincar various bits of functionality: creating user accounts, logging in and authenticating users, reading and writing to user profiles, saving cars for users, deleting saved cars, getting saved cars, & saving blog posts. These endpoints can be found in routes/users.js. The main.js file also establishes a connection between the client and the stripe API for payment processing. This is a commonly used payment processing API, well-known users of stripe are Amazon, Google, Lyft, DoorDash, and many more (find it here: https://docs.stripe.com/development/get-started). 

**1d. Database:** This website uses MongoDB, a non relational database (find it here: https://www.mongodb.com/). For this website the database has 2 collections: users & blog. The users collection stores the users username, securely encrypted password, and a list of cars they have saved. The blog collection consists of documents with key value pairs that contain fields of blog post attributes that map to the blog schema found in models/models.js. 

### 2. Features Overview
Most of Tincars pages exist to simulate a real business. All pages have fully functioning parts and can be seen as a template for something a real business would do. An example of this is the careers page which allows users to explore job postings and filter jobs, the same applies to the blog page. Both of these pages pull data from the backend to populate the UI and use filtering logic that is made more efficient thanks to React hooks. The blog page has a bit more complexity since it supports searching posts by title and sorting posts by date. 
<br>

The most complexity exists in the Finder component which fetches data from the CarQuery API using a URL that is dynamically changed depending on which filters the user chose, it then filters those results through a few functions that might or might not be called depending on again, which filters the user chose. Car pricing is also handled within this component, car pricing considers factors like segment, depreciation rate for the segment, car type, brand, and average market value. Users can also get financing details once their search results are shown. They choose a downpayment, interest rate, and term, and they can see how much they would pay month to month. From here they can also save cars, and if they're logged into an account it would write that to the database. Users can also switch to another tool that uses the CarQuery API to get more extensive vehicle details. 

<br> 

## Thank you 
Thank you for taking the time to learn about Tincar. I would love to hear suggestions for this website if you have any, whether they be from a UX perspective or from a technology perspective. Please feel free to connect with me on LinkedIn:

https://www.linkedin.com/in/alex-valero-3416b52a1/