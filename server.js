const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


const userNotes = path.resolve(__dirname, "db", "db.json");

app.get('/api/notes', (req, res) => {
    const existingNotesString = fs.readFileSync(userNotes, "utf8");
    const existingNotes = JSON.parse(existingNotesString);
    
    
    res.json(existingNotes);
    res.end();
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;

    const existingNotesString = fs.readFileSync(userNotes, "utf8");
    const existingNotes = JSON.parse(existingNotesString);
    console.log(existingNotes);

    existingNotes.push({
        title,
        text,
        noteId: uuid(),
    });

    fs.writeFileSync(userNotes, JSON.stringify(existingNotes, null, 4));
    res.end();
});

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)    
);