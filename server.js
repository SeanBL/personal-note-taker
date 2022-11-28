const express = require('express');
const path = require('path');
const app = require('./routes/index');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('./api', api);

app.use(express.static('public'));

app.get('/', (reg, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)    
);