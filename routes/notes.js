// const express = require('express');
// const path = require('path');
// const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// const uuid = require('../helpers/uuid');

// const notes = express.Router();

// notes.get('/notes', (req, res) => {
//     console.info(`${req.method} request received to view notes`);
//     res.sendFile(path.join(__dirname, '../public/notes.html'));
//     readFromFile('../db/db.json').then((existingNotes) => res.json(JSON.parse(existingNotes)));
// });

// notes.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });



// module.exports = notes; 