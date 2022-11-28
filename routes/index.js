const express = require('express');

const htmlRouter = require('./htmlRoute');
const apiRounter = require('./apiRoute');

const app = express();

app.use('/html', htmlRouter);
app.use('./api', apiRounter);

module.exports = app;