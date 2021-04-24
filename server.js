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
app.use(express.static('public'));


//going to try this with a seperate rout folder, as I am having problems with th links for api/notes as I had it written

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);



//sets our datebase up
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
