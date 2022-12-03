const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3001;
const app = express();
const userNotes = path.resolve(__dirname, "db", "db.json");
const existingNotesString = fs.readFileSync(userNotes, "utf8");
const existingNotes = JSON.parse(existingNotesString);

// This middleware let's the api know 
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    
    console.log(existingNotes);
    res.json(existingNotes);
    res.end();
});

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

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)    
);