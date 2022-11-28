const express = require('express');
const { readFromFile, readAndAppend } = require('')
const uuid = require('../helpers/uuid');

const db = express.Router();

db.get('/', (req, res) => {
    console.info(`${req.method} request received to view notes`);

    readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = db;