// This variable imports the express framework.
const express = require('express');

// This imports the path module.
const path = require('path');

// This imports the file system to read and write files.
const fs = require('fs');

// This variable imports the uuid.js file which generates a random id.
const uuid = require('./helpers/uuid');

// This variable provides a port number for which the app can listen to.
const PORT = process.env.PORT || 3001;

// This creates a new app using express as a function.
const app = express();

// This creates a path to the user notes in the db.json file.
const userNotes = path.resolve(__dirname, "db", "db.json");

// This grabs the existing notes.
const existingNotesString = fs.readFileSync(userNotes, "utf8");

// This changes the notes to an object. 
const existingNotes = JSON.parse(existingNotesString);

// This middleware let's express know to process the incoming data as a JSON body.  
app.use(express.json());

// This middleware allows the server to access the public folder.
app.use(express.static('public'));

// This method returns the notes page to the client.
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This method uses a callback function to return the existing notes stored in the db.json file to the client. 
app.get('/api/notes', (req, res) => {
    
    console.log(existingNotes);
    res.json(existingNotes);
    res.end();
});

/*This defines the api by using a post method. 
The method has two arguments. The first argument is the api path, and the second is 
a callback function. This post method allows data to be added to the */
app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    console.log(existingNotes);

    existingNotes.push({
        title,
        text,
        id: uuid(),
    });

    fs.writeFileSync(userNotes, JSON.stringify(existingNotes, null, 4));
    res.end();
});

/* This method deletes any notes added to the db.json file. A for loop is used to
to cycle through all the notes. The note matching with the requested note to be deleted
is removed from the array, and the updated array is written back to the db.json file.*/
app.delete('/api/notes/:id', (req, res) => {
    const params = req.params.id;
    console.log(params);

    for (var i = 0; i < existingNotes.length; i++) {
        if (existingNotes[i].id === params) {
            existingNotes.splice(i, 1);
        }
    }
    console.log(userNotes);

    fs.writeFileSync(userNotes, JSON.stringify(existingNotes, null, 4));
    res.end();

});

// This method returns the home page to the client. 
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//This function allows the app to listen for connections.
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)    
);