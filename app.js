if (process.env.MODE === "DEV") {
    const path = require("path");
    require('dotenv').config({ path: path.join(__dirname, ".env") })
}


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const experienceRouter = require('./routes/experience');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/experience', experienceRouter);

module.exports = app;
