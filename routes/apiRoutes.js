  
// LOAD DATA
// sets up our required data

const fs = require("fs");
const path = require('path');
const uuid = require('uuid');

// ROUTING

module.exports = (app) => {
  // we need to set up our GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

  app.get("/api/notes", (req, res) => {
    
    let dbFile = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
   
    let dbFileJSON = JSON.parse(dbFile);
   
    return res.json(dbFileJSON);

  });

  //`POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into `npm` packages that could do this for you).

  app.post("/api/notes", (req, res) => {

    //sets up our ability to take in a new note
    let newNote = req.body;

    
    let dbFile = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");

    
    let dbFileJSON = JSON.parse(dbFile);

    //random id
    newNote.id = uuid.v4();

    //new note goes into the array
    dbFileJSON.push(newNote);
    console.log(dbFileJSON)
    //new array with our addded not and all other notes put together
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(dbFileJSON), "utf8");

    //returns our new note
    return res.json(newNote);

  });
 

//ability to delete 
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
   // stringify data to join it to our db.json
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db));
    res.json(db);
  });
};