FullStyle

FullStyle is a web application designed for style developers to create a social platform where they can share their style codes, knowledge, and inspiration with others. Users can create profiles, post their style codes, comment on other users' posts, and add posts to their favorites.

Project Description

This repository contains the frontend code for the FullStyle application, built using React.js. The backend code (Express API) can be found in a separate repository at the FullStyle GitHub organization.

Instructions to Run the Application

To run this application on your local machine, follow these steps:

Clone this repository to your local machine using the following command:


git clone https://github.com/FullStyle-app/fullstyle-app-frontend.git

Navigate to the project directory:

cd fullstyle-frontend

Install the dependencies by running:

npm install

Install Font Awesome by running:

npm install --save @fortawesome/fontawesome-free

Create a .env file in the root directory of the project and add any required environment variables. Refer to the documentation or .env.example file for details on which environment variables are needed.

Import the SyntaxHighlighter component by adding the following lines to your code:


import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


Once the dependencies are installed and environment variables are set, you can run the application using:

npm start


The application should now be running on your local machine. You can access it in your web browser at http://localhost:3000.

Demo

You can view the final version of the FullStyle application on here:
https://fullstyle.netlify.app/

For the backend code and other related repositories, please visit the FullStyle GitHub organization:
https://github.com/FullStyle-app

STAY STYLISH! <3