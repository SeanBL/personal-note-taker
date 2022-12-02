// const { json } = require('express');
// const express = require('express');
// const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// const uuid = require('../helpers/uuid');
// const db = express.Router();

// db.get('/api/notes', (req, res) => {
//     console.info(`GET /api/db`);
//     fs.readFile('../db/db.json', (err, data) => {
//         if (err) throw err;
//         res.send(json.parse(data));
//     })
//     res.status(200).json(reviews);
// });

// db.post('/api/notes', (req, res) => {
//     console.info(`${req.method} request received to add a review`);

//     const { title, text } = req.body;

//     if(req.body) {
//         const newNote = {
//             title,
//             text,
//             note_id: uuid(),
//         };

//         readAndAppend(newNote, '../db/db.json');
//         res.json(`Note added successfully`);
//     } else {
//         res.error('Error in adding tip');
//     }
// });

// module.exports = db;