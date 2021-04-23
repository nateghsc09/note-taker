//set up express and the link
const express = require('express');
const path = require('path');
//going to need to use fs and maybe datebase
const fs = require("fs");


//sets express
const app = express();
//port
var PORT = process.env.PORT || 3001;

//formating data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//link to public folder for files
app.use(express.static('public'));




app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

app.post('api/notes', (req, res) => {
    //setting up adding new notes
   
        const newNote = req.body;

               // Sets max notes
               let highestId = 99;  
               // sets up our notes list
               for (let i = 0; i < database.length; i++) {
                   let individualNote = database[i];
       
                   if (individualNote.id > highestId) {
                       // keeps the highes id on top
                       highestId = individualNote.id;
                   }
               }
               // adds 1 to the id of each new note, keeping them seperate
               newNote.id = highestId + 1;
               // pushes it to the database
               database.push(newNote)
       
               // rewirtes our db.json file
               fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
       
                   if (err) {
                       return console.log(err);
                   }
                   console.log("Your note was saved!");
               });
               // shows the most recent note
               res.json(newNote);
           });
           //sets our datebase up
           app.listen(PORT, function () {
            console.log("App listening on PORT " + PORT);
        });
