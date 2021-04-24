//set up express and the link
const express = require('express');
const path = require('path');
//going to need to use fs to write and uuid for random number
const fs = require("fs");
const uuid = require('uuid');



//sets express
const app = express();
//port
var PORT = process.env.PORT || 3001;

//formating data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());





app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));

app.get("/api/notes", (req, res) => {
    // Read the db.json file and return all saved notes as JSON
    //Reads the json file async
    let dbFile = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
    //Parsing the file is necesary to displayed it like a JSON object array
    let dbFileJSON = JSON.parse(dbFile);
    //Return the json db file to the user
    return res.json(dbFileJSON);

});


 // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  //req is request and res is response 
  //arrow functions vs reg functions, arrow doesn't do any execution 
  //this points to sepcific reference in regular
  // functions and arrow functions will point it to the global 
  app.post("/api/notes", (req, res) => {

    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    // Add unique id to each note
    let newNote = req.body;

    //Reads the JSON file asynchronous
    let dbFile = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");

    //Turn object into JSON format to work it out 
    let dbFileJSON = JSON.parse(dbFile);

    //Call function to generate new ID
    newNote.id = uuid.v4();

    //pushs the new note to the notes array
    dbFileJSON.push(newNote);
    console.log(dbFileJSON)
    //Overrides the jsondb file with the new note pushed
    //Stringify the JSON array is necesary to write the file with the JSON like object string representation, otherwise we might write a bunch of [Object][Object]
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(dbFileJSON), "utf8");

    //returns the new note added to the user
    return res.json(newNote);

  });
  //gets input from html from user
  //takes in an id of a note and sending it back 
  //to the front end to appear on html, sending it back to fetch request
  //this route is written by me, and it has to match the fetch route
  //you have to go to this url, (/api/notes/:id) and get this data
  app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    let db = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
    db = db.filter(currentNote => {
      return currentNote.id != noteId;
    });
    for (currentNote of db) {
      currentNote.id = newId.toString();
      newId++;
    }
   //chooses where to write the data, db.json, and stringify it so that the data will go through
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db));
    res.json(db);
  });

           //sets our datebase up
           app.listen(PORT, function () {
            console.log("App listening on PORT " + PORT);
        });
