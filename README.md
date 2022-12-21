# Afternoon Zoologist
 
This app is a functional prototype of my text heavy RPG game.
 
I was inspired to create this game while I worked as an assistant teacher.  My students were often caught playing idle games such as CookieClicker or Idle BrickBreaker.  I wanted to create something educational that would work similarly to these popular idle games.
I drew my inspiration from table top board games, as well as text adventures I played growing up.  These games helped me to develop my reading skills when I was younger and I wanted to create something similar for my students who were falling behind with their reading abilities. 
 
In Afternoon Zoologist you are able to move around and explore the world I created with descriptions, events, quests, animals and more, all of which is completely text oriented.  The animals depicted are all extinct or endangered animals with depictions of what they used to look like and the environments they inhabited.  You will be able to Tame these animals and bring them along with you on your journey.  Leveling up can be done manually or you will be able to start an auto battle and let the game run while you get some real work done!

### Updates
 
This is still very much a work in progress.
I have a lot of features planned as well as the story and map descriptions.
 
I am currently prioritizing functionality and bug fixes over the text aspect of the game. Updates, images, gifs, and eventually hosting will come as I continue working on this project!

## Getting Started

This project should run in your chosen IDE

### Prerequisites

[Node.js](https://nodejs.org/en/)

### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type: `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7. Create a `.env` file at the root of the project and paste this line into the file:
`SERVER_SESSION_SECRET=superDuperSecret`
8. Create a database named `afternoonZoologist` in PostgresSQL If you would like to name your database something else, you will need to change `afternoonZoologist` to the name of your new database name in `server/modules/pool.js`
9. The queries in the database.sql file are set up to create all the necessary tables that you need, as well as a dummy data table to test the app. Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the dummy data.
10. Run `npm run server` in your VS Code terminal
11. Open a second terminal and run `npm run client`

## Usage

Once everything is installed and running it should open in your default browser - if not, navigate to `http://localhost:3000/#/`.

## Contact me:
Eric.w.Prouty@gmail.com