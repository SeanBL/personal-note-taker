const express = require('express');

const db = express.Router();

db.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
    );
});