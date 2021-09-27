# Book-Search-Engine

a MERN stack book search engine

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## DESCRIPTION

A book search engine app that allows a user to search for new books to read and save books they wish to purchase. The app was built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server and Google Books API.

This was a refactor of a Google Books API search engine built with a RESTful API to be a GraphQL API built with Apollo Server.

## TABLE OF CONTENTS

- [DESCRIPTION](#description)
- [DEVELOPMENT CRITERIA](#development-criteria)
- [INSTALLATION](#installation)
- [USAGE](#usage)
- [LICENSE](#license)
- [CONTRIBUTING](#contributing)
- [TESTS](#tests)
- [TECHNOLOGIES USED](#technologies-used)
- [LINKS](#links)
- [QUESTIONS](#questions)

## DEVELOPMENT CRITERIA

The following acceptance criteria was used to guide the development of this project:

- [x] AS AN avid reader
- [x] I WANT to search for new books to read
- [x] SO THAT I can keep a list of books to purchase

- [x] GIVEN a book search engine
- [x] WHEN I load the search engine
- [x] THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
- [x] WHEN I click on the Search for Books menu option
- [x] THEN I am presented with an input field to search for books and a submit button
- [x] WHEN I am not logged in and enter a search term in the input field and click the submit button
- [x] THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
- [x] WHEN I click on the Login/Signup menu option
- [x] THEN a modal appears on the screen with a toggle between the option to log in or sign up
- [x] WHEN the toggle is set to Signup
- [x] THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
- [x] WHEN the toggle is set to Login
- [x] THEN I am presented with two inputs for an email address and a password and login button
- [x] WHEN I enter a valid email address and create a password and click on the signup button
- [x] THEN my user account is created and I am logged in to the site
- [x] WHEN I enter my account’s email address and password and click on the login button
- [x] THEN I the modal closes and I am logged in to the site
- [x] WHEN I am logged in to the site
- [x] THEN the menu options change to Search for Books, an option to see my saved books, and Logout
- [x] WHEN I am logged in and enter a search term in the input field and click the submit button
- [x] THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
- [x] WHEN I click on the Save button on a book
- [x] THEN that book’s information is saved to my account
- [x] WHEN I click on the option to see my saved books
- [x] THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
- [x] WHEN I click on the Remove button on a book
- [x] THEN that book is deleted from my saved books list
- [x] WHEN I click on the Logout button
- [x] THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button

## INSTALLATION

1. Fork the [repository](https://github.com/merewall/Book-Search-Engine) from [GitHub](https://github.com/) to your profile.
2. Clone the repository down to your local machine in command-line using: `git clone`.
3. Node.js is required to run this application. Click [here](#installing-nodejs) for instructions on installing Node.js.
4. Install the required dependices to your cloned directory in command-line using: `npm install`

   ###### Installing Nodejs

   1. Check if you already have Node.js in command-line by typing `node`.
   2. If you have Node.js on your machine, a message similar to `Welcome to Node.js` will appear.
   3. If you do not have Node.js, an error message will appear and you need to download it.
   4. To download Node.js, click [here](https://nodejs.org/en/download/).
   5. After download and installation is complete, restart your command-line terminal and redo step 1 to confirm a successful installation.
   6. After Node.js is on your local machine, return to the [installation](#installation) instructions for this project's application above.

## USAGE

_If cloned down to your computer..._

1. Navigate to the directory of the application in your terminal using `cd`, if not already there.
2. If you haven't already, be sure you followed all [installation](#installation) instructions to install node, express, mongoose, morgan, nodemon, lite-server, and compression dependencies.
3. Initialize the application in CLI using: `npm run deploy`.
4. Go to https://localhost:3000 to visit application

_If accessing deployed Heroku application..._

1. Open the book search app.
2. Type a search term to see several search results, each featuring a book’s title, author(s), description, image, and a link to that book on the Google Books site.
3. To login or signup, click the Login/Signup button in the navbar.
4. To signup, enter a username, email and password.
5. To login, enter your email and password.
6. To save a book to your profile, search for books, and click on "Save this book!".
7. To view your saved books, click on "View Your Books" in the navbar, where you will see your saved books, each featuring a book's title, author(s), description, image, and a link to that book on the Google Books site.
8. To logout, click on Logout in th navbar.

_Book Search Engine Homepage:_

<img src="https://github.com/merewall/Book-Search-Engine/blob/main/client/public/homepage.PNG" alt="desktop view of book search homepage" width="500px" height="350px">

_Saved Books:_

<img src="https://github.com/merewall/Book-Search-Engine/blob/main/client/public/saved-books.PNG" alt="saved books page of logged-in user" width="500px" height="350px">

_Login/Signup:_

<img src="https://github.com/merewall/Book-Search-Engine/blob/main/client/public/login-signup.PNG" alt="login and signup form" width="500px" height="300px">

## LICENSE

This application is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## CONTRIBUTING

If you'd like to contribute to the project, please create a pull request on a new branch of the [repository](https://github.com/merewall/Book-Search-Engine) for review.

## TESTS

No current tests for this application.

## TECHNOLOGIES USED

- [x] HTML
- [x] CSS
- [x] JavaScript
- [x] [Node.js](https://nodejs.org/en/)
- [x] [express](https://www.npmjs.com/package/express)
- [x] [mongoose](https://www.npmjs.com/package/mongoose)
- [x] [apollo-server-express](https://www.npmjs.com/package/apollo-server-express)
- [x] [@apollo/client](https://www.npmjs.com/package/@apollo/client)
- [x] [nodemon](https://www.npmjs.com/package/nodemon)
- [x] [bcrypt](https://www.npmjs.com/package/bcrypt)
- [x] [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [x] [graphql](https://www.npmjs.com/package/graphql)
- [x] [REACT](https://www.npmjs.com/package/react)
- [x] [bootstrap](https://www.npmjs.com/package/bootstrap)
- [x] [jwt-decode](https://www.npmjs.com/package/jwt-decode)

## LINKS

- The [repository](https://github.com/merewall/Book-Search-Engine) for this application.
- The [deployed application](https://tranquil-forest-95949.herokuapp.com/).

## QUESTIONS

For any questions, please check out my GitHub profile or send me an email:

- GitHub: [merewall](https://github.com/merewall)
- Email: [mlwall@alumni.princeton.edu](mailto:mlwall@alumni.princeton.edu)
